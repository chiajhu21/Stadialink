"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-32 lg:py-40">
      {/* Divider */}
      <div className="glow-line max-w-7xl mx-auto mb-32" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — CTA text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-xs font-body font-500 text-accent uppercase tracking-[0.25em]">
              Get in Touch
            </span>
            <h2 className="mt-4 font-display font-700 text-4xl md:text-5xl tracking-tight leading-[1.1]">
              Let&apos;s build
              <br />
              <span className="text-accent">something great.</span>
            </h2>
            <p className="mt-6 text-muted text-base leading-relaxed font-body font-300 max-w-md">
              Have a project in mind? We&apos;d love to hear about it. Reach out
              and let&apos;s explore how Stadia can help bring your vision to
              life.
            </p>

            {/* Contact details */}
            <div className="mt-10 space-y-4">
              <a
                href="mailto:hello@stadialink.com"
                className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center group-hover:border-accent/30 transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-accent">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-body font-400">hello@stadialink.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-accent">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-body font-400">United States</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-body font-500 text-muted uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm font-body placeholder:text-muted/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-500 text-muted uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm font-body placeholder:text-muted/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-body font-500 text-muted uppercase tracking-wider mb-2">
                  Project Type
                </label>
                <select className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-muted text-sm font-body focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 appearance-none">
                  <option value="">Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="consulting">Consulting & Strategy</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-body font-500 text-muted uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm font-body placeholder:text-muted/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full px-8 py-4 rounded-full bg-accent text-background font-body font-600 text-sm tracking-wide overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
