"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Bot, FileText, RotateCcw, Search, User } from "lucide-react";
import { DemoButton, DemoFrame } from "./DemoFrame";

// Pre-written sample Q&A over fictional company documents
const QA = [
  {
    q: "How many days of annual leave do new employees get?",
    a: "According to the sample HR handbook, new employees receive 18 days of annual leave per year, accrued monthly. Leave requests should be submitted through the internal portal at least one week in advance.",
    sources: [
      { doc: "Sample HR Handbook.pdf", section: "Section 4.2 — Annual leave", passage: "Full-time employees are entitled to 18 days of annual leave per calendar year, accrued monthly from the date of joining." },
      { doc: "Sample Leave Process.docx", section: "Step 1 — Requesting leave", passage: "Requests should be raised through the internal portal no less than seven days before the first day of leave." },
    ],
  },
  {
    q: "What is the approval limit for travel expenses?",
    a: "The sample travel policy states that expenses up to ₹15,000 per trip can be approved by a team lead. Anything above that needs finance approval before booking.",
    sources: [{ doc: "Sample Travel Policy.pdf", section: "Section 2.1 — Approvals", passage: "Trips with total estimated expenses up to ₹15,000 may be approved by the team lead. Higher amounts require prior approval from Finance." }],
  },
  {
    q: "Who should I contact for a laptop replacement?",
    a: "The sample IT guide says laptop replacements are requested through an IT service ticket, and the IT support team reviews each request within two working days.",
    sources: [{ doc: "Sample IT Support Guide.pdf", section: "Hardware requests", passage: "Replacement devices are requested by raising a service ticket. Requests are reviewed by IT Support within two working days." }],
  },
];

type Msg = { role: "user" | "assistant"; text: string; qa?: number };

export function KnowledgeDemo({ autoPlay = false }: { autoPlay?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [searching, setSearching] = useState(false);
  const [openSource, setOpenSource] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const ask = (i: number) => {
    if (searching) return;
    setMessages((m) => [...m, { role: "user", text: QA[i].q }]);
    setSearching(true);
    timer.current = setTimeout(() => {
      setSearching(false);
      setMessages((m) => [...m, { role: "assistant", text: QA[i].a, qa: i }]);
    }, 1400);
  };

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(() => ask(0), 700);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, searching]);

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.text));

  return (
    <DemoFrame
      title="Enterprise Knowledge Assistant"
      actions={
        <>
          <span className="mr-1 text-xs text-subtle">Try a sample question:</span>
          {QA.map((item, i) => (
            <DemoButton key={i} onClick={() => ask(i)} disabled={searching || asked.has(item.q)}>
              <Search aria-hidden className="h-3.5 w-3.5" /> {item.q.length > 38 ? item.q.slice(0, 36) + "…" : item.q}
            </DemoButton>
          ))}
          <DemoButton
            onClick={() => {
              setMessages([]);
              setOpenSource(null);
            }}
          >
            <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
          </DemoButton>
        </>
      }
    >
      <div ref={listRef} className="h-80 space-y-3 overflow-y-auto pr-1" aria-live="polite">
        {messages.length === 0 && !searching && (
          <div className="grid h-full place-items-center text-center">
            <div>
              <BookOpen aria-hidden className="mx-auto h-8 w-8 text-accent-text" strokeWidth={1.5} />
              <p className="mt-3 text-sm font-semibold text-fg">Ask about the sample company documents</p>
              <p className="mt-1 text-xs text-subtle">Answers are pre-written for this demonstration and cite their sources.</p>
            </div>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${m.role === "user" ? "bg-bg-soft text-muted" : "bg-accent text-white"}`}>
                {m.role === "user" ? <User aria-hidden className="h-3.5 w-3.5" /> : <Bot aria-hidden className="h-3.5 w-3.5" />}
              </span>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-accent text-white" : "border border-line bg-bg-soft text-fg"}`}>
                {m.text}
                {m.qa !== undefined && (
                  <div className="mt-2.5 space-y-1.5">
                    {QA[m.qa].sources.map((s) => {
                      const key = `${idx}-${s.doc}`;
                      const open = openSource === key;
                      return (
                        <div key={key}>
                          <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpenSource(open ? null : key)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-bg-elev px-2 py-1 text-[0.68rem] font-semibold text-accent-text hover:border-accent-2"
                          >
                            <FileText aria-hidden className="h-3 w-3" /> {s.doc} · {s.section}
                          </button>
                          {open && (
                            <blockquote className="mt-1.5 rounded-md border-l-2 border-accent-2 bg-bg-elev px-2.5 py-1.5 text-[0.72rem] text-muted">
                              <mark className="bg-[#3d9bff]/20 text-fg">{s.passage}</mark>
                            </blockquote>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {searching && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-white">
              <Bot aria-hidden className="h-3.5 w-3.5" />
            </span>
            Searching sample documents
            <span className="inline-flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-2" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}
