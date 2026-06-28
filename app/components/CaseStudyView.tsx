// app/components/CaseStudyView.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";

export default function CaseStudyView({ project }: { project: Project }) {
  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 overflow-hidden dot-grid">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm font-body text-muted hover:text-foreground transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {project.category.map((c) => (
                <span
                  key={c}
                  className="text-[11px] font-mono text-accent uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-accent/20 bg-accent/10"
                >
                  {c}
                </span>
              ))}
            </div>
            <h1 className="mt-5 font-display font-extrabold text-4xl md:text-6xl tracking-tight leading-[1.02]">
              {project.title}
            </h1>
            <p className="mt-3 text-sm font-mono text-muted uppercase tracking-[0.2em]">
              {project.domain}
            </p>
            <p className="mt-6 text-lg text-muted font-body font-light leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="relative max-w-4xl mx-auto px-6 lg:px-8 pb-32">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
                The Challenge
              </h2>
              <p className="mt-4 text-muted text-base leading-relaxed font-body font-light">
                {project.problem}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
                What We Built
              </h2>
              <ul className="mt-4 space-y-3">
                {project.solution.map((s, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-muted text-base leading-relaxed font-body font-light"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
                Highlights
              </h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-border bg-surface p-4 text-sm text-muted font-body font-light leading-relaxed"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
                Our Role
              </h2>
              <p className="mt-4 text-muted text-sm leading-relaxed font-body font-light">
                {project.role}
              </p>
            </div>
            <div>
              <h2 className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
                Stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-body font-medium px-2.5 py-1 rounded-full bg-background border border-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full bg-accent text-background font-body font-semibold text-sm tracking-wide transition-transform duration-300 hover:scale-[1.02]"
            >
              Start a project
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
