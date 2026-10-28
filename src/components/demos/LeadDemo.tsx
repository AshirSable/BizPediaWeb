"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Inbox, RotateCcw, Sparkles, UserCheck } from "lucide-react";
import { DemoButton, DemoFrame } from "./DemoFrame";

// Fictional enquiries for the demonstration
const ENQUIRIES = [
  { from: "Priya (sample)", channel: "Website form", text: "We track orders in spreadsheets and want a simple system our warehouse team can use. Hoping to start within 3 months.", tags: ["Custom software", "Timeline: ~3 months", "Operations"], action: "Schedule a discovery call", owner: "Solutions team" },
  { from: "Daniel (sample)", channel: "WhatsApp", text: "Can you help us reply to common customer questions automatically and hand over complex ones to staff?", tags: ["AI automation", "Customer support", "Human handoff"], action: "Share automation questionnaire", owner: "Automation team" },
  { from: "Meera (sample)", channel: "Email", text: "Startup founder — need an MVP for a booking platform. Budget not decided yet.", tags: ["SaaS / MVP", "Early stage", "Budget: open"], action: "Book a product discovery session", owner: "Product team" },
];

type Card = { id: number; enquiry: number; stage: 0 | 1 | 2 };
const COLUMNS = ["New", "Details identified", "Routed"];

export function LeadDemo({ autoPlay = false }: { autoPlay?: boolean }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [next, setNext] = useState(0);
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const processNext = () => {
    if (busy || next >= ENQUIRIES.length) return;
    const id = Date.now();
    const enquiry = next;
    setBusy(true);
    setNext((n) => n + 1);
    setCards((c) => [...c, { id, enquiry, stage: 0 }]);
    timers.current.push(setTimeout(() => setCards((c) => c.map((k) => (k.id === id ? { ...k, stage: 1 } : k))), 1100));
    timers.current.push(
      setTimeout(() => {
        setCards((c) => c.map((k) => (k.id === id ? { ...k, stage: 2 } : k)));
        setBusy(false);
      }, 2400),
    );
  };

  useEffect(() => {
    const t = autoPlay ? setTimeout(processNext, 700) : undefined;
    const list = timers.current;
    return () => {
      if (t) clearTimeout(t);
      list.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  return (
    <DemoFrame
      title="AI Lead Management Workflow"
      actions={
        <>
          <DemoButton primary onClick={processNext} disabled={busy || next >= ENQUIRIES.length}>
            <Inbox aria-hidden className="h-3.5 w-3.5" /> {next >= ENQUIRIES.length ? "All sample enquiries processed" : "Capture next enquiry"}
          </DemoButton>
          <DemoButton
            onClick={() => {
              timers.current.forEach(clearTimeout);
              setCards([]);
              setNext(0);
              setBusy(false);
            }}
          >
            <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
          </DemoButton>
        </>
      }
    >
      <div className="grid min-h-80 gap-3 sm:grid-cols-3" aria-live="polite">
        {COLUMNS.map((col, ci) => (
          <div key={col} className="rounded-xl border border-line bg-bg p-2.5">
            <p className="flex items-center justify-between px-1 pb-2 text-[0.68rem] font-bold uppercase tracking-wider text-subtle">
              {col}
              <span className="rounded-full bg-bg-soft px-1.5 py-0.5 text-[0.62rem]">{cards.filter((c) => c.stage === ci).length}</span>
            </p>
            <div className="space-y-2">
              <AnimatePresence>
                {cards
                  .filter((c) => c.stage === ci)
                  .map((c) => {
                    const e = ENQUIRIES[c.enquiry];
                    return (
                      <motion.div
                        key={c.id}
                        layoutId={`lead-${c.id}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-lg border border-line-strong bg-bg-elev p-2.5 text-xs shadow-sm"
                      >
                        <p className="flex items-center justify-between font-semibold text-fg">
                          {e.from}
                          <span className="text-[0.6rem] font-medium text-subtle">{e.channel}</span>
                        </p>
                        {ci === 0 && <p className="mt-1 line-clamp-3 text-muted">{e.text}</p>}
                        {ci >= 1 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {e.tags.map((t) => (
                              <span key={t} className="rounded bg-[#3d9bff]/12 px-1.5 py-0.5 text-[0.62rem] font-medium text-accent-text">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        {ci === 1 && (
                          <p className="mt-2 flex items-center gap-1 text-[0.65rem] text-accent-text">
                            <Sparkles aria-hidden className="h-3 w-3" /> Suggesting next step…
                          </p>
                        )}
                        {ci === 2 && (
                          <div className="mt-2 space-y-1 border-t border-line pt-2 text-[0.66rem]">
                            <p className="flex items-center gap-1 text-fg">
                              <ArrowRight aria-hidden className="h-3 w-3 text-accent-text" /> {e.action}
                            </p>
                            <p className="flex items-center gap-1 text-muted">
                              <UserCheck aria-hidden className="h-3 w-3" /> Assigned to {e.owner} for review
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}
