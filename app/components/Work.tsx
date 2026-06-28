// app/components/Work.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PROJECTS, CATEGORIES, type Category } from "../data/projects";
import ProjectCard from "./ProjectCard";

type Filter = "All" | Category;
const FILTERS: Filter[] = ["All", ...CATEGORIES];

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.includes(filter));

  return (
    <section id="work" className="relative py-32 lg:py-40">
      {/* Divider */}
      <div className="glow-line max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
              Our Work
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Selected
              <br />
              <span className="text-muted">projects.</span>
            </h2>
          </div>
          <p className="text-muted text-sm font-body font-light max-w-sm leading-relaxed">
            Real work across web, mobile, and AI — for healthcare, government, and
            enterprise teams.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`text-xs font-body font-medium px-4 py-2 rounded-full border transition-colors duration-300 ${
                filter === f
                  ? "bg-accent/15 border-accent/40 text-accent"
                  : "bg-surface border-border text-muted hover:text-foreground hover:border-border-hover"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                inView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
