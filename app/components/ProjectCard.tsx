// app/components/ProjectCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project, Category } from "../data/projects";

// Subtle, brand-anchored gradient keyed off the project's primary category.
const CATEGORY_GRADIENT: Record<Category, string> = {
  Web: "from-accent/10 to-cyan-500/5",
  Mobile: "from-emerald-500/10 to-teal-500/5",
  "AI/ML": "from-violet-500/10 to-blue-500/5",
  Backend: "from-amber-500/10 to-orange-500/5",
};

export default function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const gradient = CATEGORY_GRADIENT[project.category[0]];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }}
      className="card-glow group relative rounded-2xl border border-border bg-surface overflow-hidden hover:border-border-hover transition-colors duration-500"
    >
      <Link href={`/work/${project.slug}`} className="block">
        {/* Category banner */}
        <div className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
          <div className="absolute inset-0 dot-grid opacity-50" />
          <span className="relative z-10 font-display font-bold text-2xl text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500 tracking-tight">
            {project.category[0]}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          <span className="text-[11px] font-mono text-accent uppercase tracking-[0.2em]">
            {project.domain}
          </span>
          <h3 className="mt-2 font-display font-bold text-xl tracking-tight">
            {project.title}
          </h3>
          <p className="mt-3 text-muted text-sm leading-relaxed font-body font-light">
            {project.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-body font-medium px-2.5 py-1 rounded-full bg-background border border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-body font-medium text-accent">
            View case study
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
