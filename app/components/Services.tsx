"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks. From dashboards to SaaS platforms, we engineer for performance and scale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3M13 14h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tags: ["Next.js", ".NET", "React", "TypeScript"],
  },
  {
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android. We build fast, fluid experiences your users will love.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01" strokeLinecap="round" />
        <path d="M9 2v1.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V2" />
      </svg>
    ),
    tags: ["Flutter", "Bloc", "Firebase", "Dart"],
  },
  {
    title: "Consulting & Strategy",
    description:
      "Technical leadership and architecture consulting. We help teams make the right technology decisions and ship with confidence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    tags: ["Architecture", "Cloud", "AI / RAG", "Migrations"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
            What We Do
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            End-to-end software
            <br />
            <span className="text-muted">development.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 * (i + 1),
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
              className="card-glow group relative rounded-2xl border border-border bg-surface p-8 lg:p-10 hover:border-border-hover transition-colors duration-500"
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/15 transition-colors duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl tracking-tight mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed font-body font-light mb-6">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-body font-medium px-2.5 py-1 rounded-full bg-background border border-border text-muted"
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
