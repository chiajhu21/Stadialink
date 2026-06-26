"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    number: "01",
    title: "Craft Over Convention",
    description:
      "Every line of code is intentional. We build software that's engineered to last, not just shipped to meet a deadline.",
  },
  {
    number: "02",
    title: "Partnership, Not Vendor",
    description:
      "We embed with your team, understand your domain, and become an extension of your business.",
  },
  {
    number: "03",
    title: "Outcome-Driven",
    description:
      "We measure success by the impact our software delivers. Revenue, efficiency, user satisfaction — those are our KPIs.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Divider */}
      <div className="glow-line max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column — story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
              About Stadia
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.1]">
              Built by engineers
              <br />
              <span className="text-muted">who ship.</span>
            </h2>
            <div className="mt-8 space-y-5 text-muted text-base leading-relaxed font-body font-light">
              <p>
                Stadia Consulting Group is a software development consultancy
                that partners with businesses to turn ideas into production-ready
                applications.
              </p>
              <p>
                We specialize in building high-performance web and mobile
                applications using modern technology stacks. Our team brings deep
                expertise across the full development lifecycle — from
                architecture and design to deployment and scaling.
              </p>
              <p>
                Whether you&apos;re a startup launching your first product or an
                enterprise modernizing legacy systems, we bring the technical
                depth and product thinking to get it done right.
              </p>
            </div>
          </motion.div>

          {/* Right column — values */}
          <div className="space-y-8">
            {values.map((value, i) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 * (i + 1),
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="group relative pl-16 border-l border-border hover:border-accent/30 transition-colors duration-500"
              >
                <span className="absolute left-4 top-0 font-display font-bold text-sm text-accent/40 group-hover:text-accent/70 transition-colors duration-500">
                  {value.number}
                </span>
                <h3 className="font-display font-semibold text-lg tracking-tight mb-2">
                  {value.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed font-body font-light">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
