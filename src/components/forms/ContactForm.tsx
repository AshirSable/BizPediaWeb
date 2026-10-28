"use client";

import { useId, useMemo, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, serviceOptions, timelineOptions } from "@/lib/contact-schema";
import { services } from "@/content/services";
import { contact } from "@/content/pages";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "success" | "error";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-fg">
        <span>
          {label}
          {!optional && <span aria-hidden className="ml-0.5 text-accent-text">*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-subtle">Optional</span>}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#ef4444]">
          <AlertCircle aria-hidden className="h-3.5 w-3.5" /> {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const params = useSearchParams();
  const preselected = useMemo(() => services.find((s) => s.slug === params.get("service"))?.name ?? "", [params]);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [descLen, setDescLen] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const validate = (data: Record<string, FormDataEntryValue>) => {
    const result = contactSchema.safeParse(data);
    if (result.success) return {};
    const out: Errors = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!out[key]) out[key] = issue.message;
    }
    return out;
  };

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    if (!target.name || !errors[target.name]) return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const next = validate(data);
    setErrors((prev) => ({ ...prev, [target.name]: next[target.name] }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        setDescLen(0);
        requestAnimationFrame(() => wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
        return;
      }
      if (json.fieldErrors) {
        const fe: Errors = {};
        for (const [k, v] of Object.entries(json.fieldErrors as Record<string, string[]>)) fe[k] = v?.[0];
        setErrors(fe);
      }
      setStatus("error");
      setMessage(json.error || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
    }
  };

  const describedBy = (name: string, hint?: boolean) => [errors[name] ? `${id(name)}-error` : null, hint && !errors[name] ? `${id(name)}-hint` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div ref={wrapRef} className="relative scroll-mt-28">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[32rem] flex-col items-center justify-center p-8 text-center"
            role="status"
          >
            <span className="relative grid h-20 w-20 place-items-center rounded-full bg-[linear-gradient(135deg,#1d4fff,#3d9bff)] text-white shadow-[0_0_50px_rgb(61_155_255/0.6)]">
              <CheckCircle2 aria-hidden className="h-9 w-9" />
            </span>
            <h3 className="mt-8 font-display text-2xl font-bold text-fg">Enquiry received</h3>
            <p className="mt-3 max-w-md leading-relaxed text-muted">{contact.confirmation}</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm font-semibold text-accent-text hover:underline">
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            noValidate
            onSubmit={onSubmit}
            onBlur={onBlur}
            className="space-y-5 p-6 sm:p-8"
            aria-describedby={`${uid}-helper`}
          >
            <p id={`${uid}-helper`} className="rounded-xl border border-line bg-bg-soft px-4 py-3 text-sm leading-relaxed text-muted">
              {contact.helper}
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={id("fullName")} label="Full Name" error={errors.fullName}>
                <input id={id("fullName")} name="fullName" autoComplete="name" className="field" aria-invalid={!!errors.fullName} aria-describedby={describedBy("fullName")} required />
              </Field>
              <Field id={id("companyName")} label="Company Name" error={errors.companyName}>
                <input id={id("companyName")} name="companyName" autoComplete="organization" className="field" aria-invalid={!!errors.companyName} aria-describedby={describedBy("companyName")} required />
              </Field>
              <Field id={id("email")} label="Business Email" error={errors.email}>
                <input id={id("email")} name="email" type="email" autoComplete="email" inputMode="email" className="field" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} required />
              </Field>
              <Field id={id("phone")} label="Phone Number" optional error={errors.phone}>
                <input id={id("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} />
              </Field>
            </div>

            <Field id={id("service")} label="Service You Need" error={errors.service}>
              <select id={id("service")} name="service" defaultValue={preselected} key={preselected} className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%237584a6%22 stroke-width=%222%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-10" aria-invalid={!!errors.service} aria-describedby={describedBy("service")} required>
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={id("description")} label="Project Description" error={errors.description}>
              <textarea
                id={id("description")}
                name="description"
                rows={5}
                maxLength={3000}
                className="field resize-y"
                aria-invalid={!!errors.description}
                aria-describedby={describedBy("description")}
                onChange={(e) => setDescLen(e.target.value.length)}
                required
              />
              <p className="mt-1 text-right text-[0.7rem] text-subtle" aria-hidden>
                {descLen} / 3000
              </p>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={id("timeline")} label="Expected Timeline" optional error={errors.timeline}>
                <select id={id("timeline")} name="timeline" defaultValue="" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%237584a6%22 stroke-width=%222%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-10">
                  <option value="">Select a timeline</option>
                  {timelineOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={id("budget")} label="Budget Range" optional error={errors.budget}>
                <input id={id("budget")} name="budget" className="field" placeholder="e.g. an approximate range" aria-invalid={!!errors.budget} aria-describedby={describedBy("budget")} />
              </Field>
            </div>

            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === "error" && message ? (
              <p role="alert" className="flex items-start gap-2 rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 px-4 py-3 text-sm text-fg">
                <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#ef4444]" /> {message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[linear-gradient(110deg,#1d4fff,#2b74ff_55%,#3d9bff)] px-6 py-4 font-semibold text-white shadow-[0_10px_30px_-10px_rgb(36_99_255/0.8)] transition-all hover:-translate-y-0.5 disabled:opacity-70 sm:w-auto"
            >
              {status === "submitting" ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Send aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              {status === "submitting" ? "Sending…" : contact.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
