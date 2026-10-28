"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, FileJson, Play, RotateCcw, ScanText } from "lucide-react";
import { DemoButton, DemoFrame } from "./DemoFrame";

// Sample invoice used only for this demonstration
const FIELDS = [
  { key: "Supplier", value: "Sample Supplies Co.", conf: 0.98 },
  { key: "Invoice number", value: "INV-000123", conf: 0.99 },
  { key: "Invoice date", value: "12 Sep 2026", conf: 0.95 },
  { key: "Due date", value: "26 Sep 2026?", conf: 0.61 },
  { key: "Subtotal", value: "₹ 42,000.00", conf: 0.97 },
  { key: "Tax", value: "₹ 7,560.00", conf: 0.93 },
  { key: "Total", value: "₹ 49,560.00", conf: 0.99 },
];

type Stage = "idle" | "scanning" | "extracting" | "review" | "exported";

export function DocumentDemo({ autoPlay = false }: { autoPlay?: boolean }) {
  const [stage, setStage] = useState<Stage>("idle");
  const [shown, setShown] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = () => {
    clear();
    setShown(0);
    setStage("scanning");
    timers.current.push(setTimeout(() => setStage("extracting"), 1400));
    FIELDS.forEach((_, i) => timers.current.push(setTimeout(() => setShown(i + 1), 1600 + i * 280)));
    timers.current.push(setTimeout(() => setStage("review"), 1700 + FIELDS.length * 280));
  };

  const reset = () => {
    clear();
    setShown(0);
    setStage("idle");
  };

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(run, 600);
      return () => {
        clearTimeout(t);
        clear();
      };
    }
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  return (
    <DemoFrame
      title="Document Intelligence"
      actions={
        <>
          <DemoButton primary onClick={run} disabled={stage === "scanning" || stage === "extracting"}>
            <Play aria-hidden className="h-3.5 w-3.5" /> {stage === "idle" ? "Process sample invoice" : "Run again"}
          </DemoButton>
          <DemoButton onClick={() => setStage("exported")} disabled={stage !== "review"}>
            <FileJson aria-hidden className="h-3.5 w-3.5" /> Prepare export
          </DemoButton>
          <DemoButton onClick={reset}>
            <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
          </DemoButton>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
        {/* Sample invoice */}
        <div className="relative overflow-hidden rounded-xl border border-line bg-white p-4 text-[#1d2740] shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[#1d4fff]">Invoice</p>
              <p className="mt-1 text-sm font-semibold">Sample Supplies Co.</p>
            </div>
            <p className="text-right text-[0.65rem] text-[#6b7896]">
              INV-000123
              <br />
              12 Sep 2026
            </p>
          </div>
          <div className="mt-4 space-y-1.5">
            {["Office chairs × 6", "Standing desks × 2", "Installation"].map((l, i) => (
              <div key={l} className="flex justify-between border-b border-dashed border-[#d5ddf0] pb-1.5 text-[0.7rem]">
                <span>{l}</span>
                <span>₹ {[24000, 15000, 3000][i].toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-right text-[0.7rem]">
            <p>Tax ₹ 7,560</p>
            <p className="text-sm font-bold">Total ₹ 49,560</p>
            <p className="text-[0.62rem] text-[#9aa8c7] [filter:blur(0.6px)]">Payment due: 26/09 (smudged)</p>
          </div>
          <AnimatePresence>
            {stage === "scanning" && (
              <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#3d9bff]/35 to-transparent"
              >
                <div className="absolute inset-x-0 bottom-1/2 h-px bg-[#3d9bff]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Extracted fields */}
        <div className="rounded-xl border border-line bg-bg p-3" aria-live="polite">
          <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold text-muted">
            <ScanText aria-hidden className="h-4 w-4 text-accent-text" />
            {stage === "idle" && "Waiting for a document"}
            {stage === "scanning" && "Reading document…"}
            {stage === "extracting" && "Extracting fields…"}
            {stage === "review" && "Ready for review — 1 field flagged"}
            {stage === "exported" && "Prepared for export"}
          </div>
          {stage === "exported" ? (
            <pre className="max-h-64 overflow-auto rounded-lg bg-[#050b1c] p-3 text-[0.68rem] leading-relaxed text-[#9fd4ff]">
              {JSON.stringify(Object.fromEntries(FIELDS.map((f) => [f.key, f.conf < 0.8 ? { value: f.value, status: "needs_review" } : f.value])), null, 2)}
            </pre>
          ) : (
            <ul className="space-y-1.5">
              {FIELDS.map((f, i) => {
                const visible = i < shown;
                const flagged = f.conf < 0.8;
                return (
                  <li
                    key={f.key}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-xs transition-all duration-500 ${
                      visible ? "opacity-100" : "opacity-30"
                    } ${visible && flagged ? "border-[#f59e0b]/50 bg-[#f59e0b]/10" : "border-line bg-bg-elev"}`}
                  >
                    <span className="text-muted">{f.key}</span>
                    <span className="flex items-center gap-2 font-semibold text-fg">
                      {visible ? f.value : "—"}
                      {visible &&
                        (flagged ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#f59e0b]/20 px-1.5 py-0.5 text-[0.6rem] text-[#b45309] dark:text-[#fbbf24]">
                            <AlertTriangle aria-hidden className="h-3 w-3" /> Review
                          </span>
                        ) : (
                          <Check aria-label="Confident" className="h-3.5 w-3.5 text-[#10b981]" />
                        ))}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
