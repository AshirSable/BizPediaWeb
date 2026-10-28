"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { revealItem } from "./Reveal";

export function MotionItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealItem} className={className}>
      {children}
    </motion.div>
  );
}
