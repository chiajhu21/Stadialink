"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Healthcare Data Platform",
    category: "Web Application",
    description:
      "A HIPAA-compliant data platform enabling healthcare providers to manage patient records, analytics, and reporting in real-time.",
    tags: ["React", "Node.js", "PostgreSQL", "Azure"],
    color: "from-cyan-500/10 to-blue-500/5",
  },
  {
    title: "Mobile Banking App",
    category: "Mobile App",
    description:
      "A cross-platform mobile banking experience with biometric auth, instant transfers, and real-time notifications.",
    tags: ["Flutter", "Firebase", "Stripe", "REST API"],
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    title: "AI-Powered Chatbot",
    category: "AI / ML",
    description:
      "An intelligent conversational agent that handles customer support with natural language understanding and context retention.",
    tags: ["Python", "LLM", "RAG", "Azure AI"],
    color: "from-violet-500/10 to-purple-500/5",
  },
  {
    title: "Enterprise Task Tracker",
    category: "SaaS Platform",
    description:
      "A project management platform built for distributed teams with real-time collaboration, Kanban boards, and custom workflows.",
    tags: ["Next.js", "TypeScript", "Prisma", "Vercel"],
    color: "from-amber-500/10 to-orange-500/5",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative py-32 lg:py-40">
      {/* Divider */}
      <div className="glow-line max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-xs font-body font-500 text-accent uppercase tracking-[0.25em]">
              Our Work
            </span>
            <h2 className="mt-4 font-display font-700 text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Selected
              <br />
              <span className="text-muted">projects.</span>
            </h2>
          </div>
          <p className="text-muted text-sm font-body font-300 max-w-sm leading-relaxed">
            A selection of projects that showcase our range — from mobile apps to
            enterprise platforms.
          </p>
        </motion.div>

        {/* Project grid — bento-style */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.12 * (i + 1),
                ease: [0.23, 1, 0.32, 1],
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--mouse-x",
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  "--mouse-y",
                  `${e.clientY - rect.top}px`
                );
              }}
              className="card-glow group relative rounded-2xl border border-border bg-surface overflow-hidden hover:border-border-hover transition-colors duration-500"
            >
              {/* Gradient top bar */}
              <div
                className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}
              >
                <div className="absolute inset-0 dot-grid opacity-50" />
                <span className="relative z-10 font-display font-700 text-2xl text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500 tracking-tight">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8">
                <span className="text-[11px] font-body font-500 text-accent uppercase tracking-[0.2em]">
                  {project.category}
                </span>
                <h3 className="mt-2 font-display font-700 text-xl tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-3 text-muted text-sm leading-relaxed font-body font-300">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-body font-500 px-2.5 py-1 rounded-full bg-background border border-border text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
