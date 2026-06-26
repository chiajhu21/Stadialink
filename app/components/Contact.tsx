"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";

// Web3Forms access key — get a free one at https://web3forms.com (no account
// required) and set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local before build.
// The key is public by design and safe to ship in the client bundle.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setFeedback(
        "The form isn’t connected yet. Please email hello@stadialink.com directly."
      );
      return;
    }

    const form = e.currentTarget;
    setStatus("submitting");
    setFeedback("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFeedback("Thanks — your message is on its way. We’ll be in touch soon.");
        form.reset();
      } else {
        setStatus("error");
        setFeedback(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Network error. Please try again, or email hello@stadialink.com."
      );
    }
  }

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
            <span className="text-xs font-mono text-accent uppercase tracking-[0.25em]">
              Get in Touch
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.1]">
              Let&apos;s build
              <br />
              <span className="text-accent">something great.</span>
            </h2>
            <p className="mt-6 text-muted text-base leading-relaxed font-body font-light max-w-md">
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-accent" aria-hidden="true">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-body font-normal">hello@stadialink.com</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-accent" aria-hidden="true">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-body font-normal">United States</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Web3Forms metadata + honeypot */}
              <input type="hidden" name="subject" value="New project inquiry from stadialink.com" />
              <input type="hidden" name="from_name" value="Stadia Consulting Website" />
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                style={{ display: "none" }}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm font-body placeholder:text-muted/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm font-body placeholder:text-muted/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="project_type" className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                  Project Type
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-muted text-sm font-body focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 appearance-none"
                >
                  <option value="">Select a service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Consulting & Strategy">Consulting & Strategy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm font-body placeholder:text-muted/50 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative w-full px-8 py-4 rounded-full bg-accent text-background font-body font-semibold text-sm tracking-wide overflow-hidden transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10">
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>

              {/* Status feedback (persistent live region for screen readers) */}
              <p
                role="status"
                aria-live="polite"
                className={`min-h-[1.25rem] text-sm font-body font-light ${
                  status === "success"
                    ? "text-accent"
                    : status === "error"
                      ? "text-red-400"
                      : "text-muted"
                }`}
              >
                {feedback}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
