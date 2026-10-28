import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/*
  Contact enquiry endpoint.
  Delivery options (configure in environment variables — see .env.example):
    - CONTACT_WEBHOOK_URL: POSTs the enquiry as JSON to a webhook you control
    - RESEND_API_KEY + CONTACT_TO_EMAIL (+ CONTACT_FROM_EMAIL): sends an email via Resend
    - CONTACT_DELIVERY=log: development only, prints the enquiry to the server console
  With none configured the endpoint validates input and returns 503 so the site
  never claims an enquiry was delivered when it was not.
*/

const recent = new Map<string, number[]>();
function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > limit;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const data = parsed.data;

  // Silently accept bot submissions caught by the honeypot
  if (data.website) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries from this connection. Please try again later." }, { status: 429 });
  }

  const enquiry = {
    fullName: data.fullName,
    companyName: data.companyName,
    email: data.email,
    phone: data.phone || null,
    service: data.service,
    description: data.description,
    timeline: data.timeline || null,
    budget: data.budget || null,
    submittedAt: new Date().toISOString(),
  };

  try {
    const { CONTACT_WEBHOOK_URL, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_DELIVERY } = process.env;

    if (CONTACT_WEBHOOK_URL) {
      const res = await fetch(CONTACT_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(enquiry) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }

    if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
      const lines = Object.entries(enquiry).map(([k, v]) => `${k}: ${v ?? "—"}`);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL || "Bizpedia Tech Website <onboarding@resend.dev>",
          to: [CONTACT_TO_EMAIL],
          reply_to: enquiry.email,
          subject: `New project enquiry — ${enquiry.companyName} (${enquiry.service})`,
          text: lines.join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }

    if (CONTACT_DELIVERY === "log" && process.env.NODE_ENV !== "production") {
      console.info("[contact] Development enquiry (not delivered anywhere):", enquiry);
      return NextResponse.json({ ok: true, dev: true });
    }

    return NextResponse.json(
      { ok: false, error: "Online enquiries are not connected yet. Please try again later.", code: "not_configured" },
      { status: 503 },
    );
  } catch (err) {
    console.error("[contact] Delivery failed:", err);
    return NextResponse.json({ ok: false, error: "We could not send your enquiry right now. Please try again shortly." }, { status: 502 });
  }
}
