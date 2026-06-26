"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid noise">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Subtle top-down fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Horizontal glow accent */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-mono text-muted tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Software Consultancy
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
        >
          We Build Software
          <br />
          <span className="text-accent">That Moves</span>
          <br />
          You Forward
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed font-body font-light"
        >
          Stadia Consulting Group partners with businesses to design, develop,
          and deploy web and mobile applications that deliver real impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full bg-accent text-background font-body font-semibold text-sm tracking-wide overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="relative z-10">Start a Project</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>
          <a
            href="#work"
            className="px-8 py-4 rounded-full border border-border text-muted hover:text-foreground hover:border-border-hover font-body font-medium text-sm tracking-wide transition-all duration-300"
          >
            View Our Work
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
