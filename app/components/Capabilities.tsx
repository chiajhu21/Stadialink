// app/components/Capabilities.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CAPABILITIES } from "../data/projects";

export default function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" className="relative py-32 lg:py-40">
      {/* Divider */}
      <div className="glow-line max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
            More Capabilities
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Depth beyond
            <br />
            <span className="text-muted">the highlights.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <h3 className="font-display font-semibold text-lg tracking-tight">
                {cap.title}
              </h3>
              <p className="mt-3 text-muted text-sm leading-relaxed font-body font-light">
                {cap.blurb}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cap.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-body font-medium px-2.5 py-1 rounded-full bg-background border border-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
