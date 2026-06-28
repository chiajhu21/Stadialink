# Stadia Website Refresh + Real Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four fictional portfolio entries with real, anonymized case studies from the owner's project folders, add a filterable Work grid + static `/work/[slug]` detail pages, and lightly elevate the existing dark design — all within the current static-export → Cloudflare Pages setup.

**Architecture:** A single `app/data/projects.ts` module is the source of truth. The home page keeps its single-page flow (now Hero → Services → About → Work → Capabilities → Contact). `Navbar`/`Footer` move into the root layout so detail pages share them. `/work/[slug]` is a statically-generated Server Component (`generateStaticParams` + `dynamicParams = false`) that renders a client `CaseStudyView`.

**Tech Stack:** Next.js 16.2.2 (App Router, `output: "export"`), React 19, Tailwind v4 (CSS `@theme`), framer-motion 12, TypeScript.

---

## Testing approach (read first)

This repo has **no unit-test harness**, and the approved spec scoped adding one out of scope (it's a static marketing site). Per the spec, **verification for each task is: TypeScript check + lint + production build, with a browser preview smoke-check at the end.** This intentionally overrides the writing-plans default of unit-test TDD, because the user-approved spec takes precedence. Type safety is enforced by `strict` mode + a `satisfies` annotation on the data; route correctness is enforced by a successful static build that emits the expected HTML files.

Standard verification commands used throughout:
- Type check: `npx tsc --noEmit` → **Expected:** exits 0, no output.
- Lint: `npm run lint` → **Expected:** no errors.
- Build: `npm run build` → **Expected:** "Compiled successfully" and an `out/` directory.

> **Next 16 reminder (from `AGENTS.md`):** `params` is a `Promise` and must be `await`ed; static export requires `generateStaticParams()` + `dynamicParams = false` for dynamic routes. Do not deviate from the signatures shown below.

---

## File structure

**Create**
- `app/data/projects.ts` — types, `PROJECTS` (8), `CATEGORIES`, `CAPABILITIES` (5), `getProjectBySlug`.
- `app/components/ProjectCard.tsx` — client card (links to detail page).
- `app/components/Work.tsx` — client Work section: category filter + animated grid.
- `app/components/Capabilities.tsx` — client "More capabilities" strip.
- `app/work/[slug]/page.tsx` — server route: `generateStaticParams`, `generateMetadata`, page.
- `app/components/CaseStudyView.tsx` — client detail UI.

**Modify**
- `app/layout.tsx` — render `Navbar` + `Footer` around `children`.
- `app/page.tsx` — drop `Navbar`/`Footer`; swap `Portfolio` → `Work`; add `Capabilities`.
- `app/components/Navbar.tsx` — section hrefs → `/#…`, logo → `/`.
- `app/components/Footer.tsx` — section hrefs → `/#…`.
- `app/components/Hero.tsx` — add one honest proof line.
- `app/components/Services.tsx` — align tag chips to real stacks.

**Delete**
- `app/components/Portfolio.tsx` — replaced by `Work.tsx`.

---

## Task 1: Project data module (source of truth)

**Files:**
- Create: `app/data/projects.ts`

- [ ] **Step 1: Write the data module**

```ts
// app/data/projects.ts
// Single source of truth for portfolio content.
// RULES (from docs/superpowers/specs/2026-06-28-stadialink-website-refresh-design.md):
// anonymized — no client/institution names; no compliance claims ("HIPAA");
// only verifiable facts. Do not add fabricated metrics.

export type Category = "Web" | "Mobile" | "AI/ML" | "Backend";

export interface Project {
  slug: string;
  title: string;
  category: Category[];
  domain: string;
  summary: string;
  problem: string;
  solution: string[];
  stack: string[];
  role: string;
  highlights: string[];
}

export interface Capability {
  title: string;
  blurb: string;
  tags: string[];
}

export const CATEGORIES: Category[] = ["Web", "Mobile", "AI/ML", "Backend"];

export const PROJECTS: Project[] = [
  {
    slug: "health-data-platform-modernization",
    title: "Health-Data Platform Modernization",
    category: ["Web", "Backend"],
    domain: "Healthcare & public health",
    summary:
      "A multi-year modernization of a mature health-data application — migrating a legacy .NET Framework system to .NET 10, with a rebuilt reporting engine, a PII-masking microservice, and cloud background automation.",
    problem:
      "A mature application serving healthcare and public-health institutions had accumulated legacy .NET Framework code, WebForms/RDLC reporting, and tightly-coupled data access — costly to maintain and risky to extend across multiple production tenants.",
    solution: [
      "Phased migration of the core app to .NET 10 ASP.NET Core, using Dapper for legacy stored-procedure access and EF Core for identity — stable and backward-compatible throughout.",
      "Reporting rebuilt as a modern Razor sub-application: 126+ reports with drill-down charts, CSV/Excel/PDF export, and tenant-aware theming, replacing legacy RDLC/WebForms.",
      "An API-first PII-masking microservice (Python/FastAPI) that detects and masks sensitive data across text, HTML, PDF, DOCX, and image inputs, with rule-based and AI-assisted detection and async processing.",
      "Cloud background automation: scheduled report distribution (Azure Functions + email) and data-retention log archival to blob storage, with retry and resilience policies.",
    ],
    stack: [".NET 10", "ASP.NET Core", "C#", "SQL Server", "Dapper", "EF Core", "Python", "FastAPI", "Chart.js", "QuestPDF", "Azure Functions", "AWS SES", "Cloudflare R2"],
    role: "Full lifecycle — architecture, migration strategy, reporting redesign, microservice, and DevOps automation.",
    highlights: [
      "Legacy .NET Framework → .NET 10 via a phased, backward-compatible rollout across multiple tenants",
      "126+ reports rebuilt with drill-down and multi-format export",
      "API-first PII-masking across five-plus document formats",
      "Scheduled cloud jobs with retry and data-retention archival",
    ],
  },
  {
    slug: "citizen-government-messaging",
    title: "Citizen–Government Messaging Platform",
    category: ["Web", "Mobile", "AI/ML"],
    domain: "Government / public services",
    summary:
      "A cross-platform communication platform connecting citizens and government staff — a .NET 10 web portal plus a native Flutter mobile app, with AI-assisted responses and live message streaming.",
    problem:
      "A government agency needed a modern way for citizens to communicate about permits and inquiries, with staff able to triage and respond efficiently across web and mobile.",
    solution: [
      "A .NET 10 web platform with separate citizen and staff experiences, permit-linked conversation threads, and bucket-based workload distribution for staff.",
      "AI-assisted reply drafting (OpenAI), presigned file attachments via Cloudflare R2, and OpenTelemetry observability.",
      "A native Flutter mobile app (Bloc architecture) with JWT auth, rotating refresh tokens, biometric unlock, and Server-Sent Events for streaming AI responses.",
    ],
    stack: [".NET 10", "ASP.NET Core", "C#", "PostgreSQL", "Dapper", "Flutter", "Dart", "Bloc", "GoRouter", "OpenAI", "Cloudflare R2", "Application Insights"],
    role: "End-to-end — backend, web, mobile, AI integration, and cloud.",
    highlights: [
      "One platform across web and native mobile",
      "AI-assisted staff responses with live SSE streaming",
      "Biometric auth and rotating refresh tokens on mobile",
      "Permit-linked threads with automatic workload distribution",
    ],
  },
  {
    slug: "medical-imaging-anonymization",
    title: "Medical-Imaging Anonymization Service",
    category: ["Backend", "AI/ML"],
    domain: "Healthcare / medical imaging",
    summary:
      "A microservice that automatically detects and redacts burned-in patient information from DICOM medical images using deep-learning text detection and OCR, plus 3D mesh extraction for visualization.",
    problem:
      "DICOM imaging files often contain burned-in patient identifiers that must be removed before images can be shared or reused — a slow, error-prone manual task.",
    solution: [
      "An ASP.NET Core 8 REST microservice that parses DICOM with fo-dicom.",
      "ONNX deep-learning text detection plus Tesseract OCR to locate and mask burned-in PII on images.",
      "3D mesh extraction and glTF optimization for downstream visualization, with presigned R2 download URLs.",
    ],
    stack: [".NET 8", "ASP.NET Core", "C#", "fo-dicom", "ONNX Runtime", "Tesseract OCR", "ImageSharp", "SharpGLTF", "Cloudflare R2", "Swagger"],
    role: "Service architecture, ML integration, and image pipeline.",
    highlights: [
      "Automated PII redaction on DICOM imagery",
      "ML text detection (ONNX) + OCR pipeline",
      "3D mesh extraction with glTF optimization",
      "Secure presigned delivery",
    ],
  },
  {
    slug: "multi-model-ai-discussion-platform",
    title: "Multi-Model AI Discussion Platform",
    category: ["AI/ML"],
    domain: "Stadia product",
    summary:
      "A desktop application that lets a human moderator orchestrate structured discussions among multiple AI models — cloud and local — with real-time streaming and workspace-based project management.",
    problem:
      "Getting value from multiple AI models usually means juggling separate tools; there was no single place to run a moderated, multi-model conversation with full history and control.",
    solution: [
      "A Tauri (Rust) desktop shell with a React + TypeScript frontend and a FastAPI (Python) backend.",
      "Moderator-controlled turn orchestration across configurable models (e.g. Claude, GPT, local Ollama), with real-time WebSocket streaming and token tracking.",
      "Workspace-first organization (projects, threads, AI personas), local-first SQLite storage, and OS-keychain credential storage.",
    ],
    stack: ["Tauri", "Rust", "React", "TypeScript", "Vite", "FastAPI", "Python", "SQLAlchemy", "SQLite", "Ollama", "WebSockets"],
    role: "Product design and full-stack build (Stadia product).",
    highlights: [
      "Moderated multi-model AI discussions in one app",
      "Cloud + local (Ollama) model orchestration",
      "Real-time WebSocket streaming with token tracking",
      "Local-first, secure credential storage",
    ],
  },
  {
    slug: "serverless-help-desk",
    title: "Serverless Help-Desk Platform",
    category: ["Web"],
    domain: "Stadia product",
    summary:
      "A multi-tenant help-desk ticketing platform built serverless on Cloudflare Workers, with an embeddable support widget, email-native workflow, and AI integration through a custom MCP server.",
    problem:
      "Teams want lightweight, white-labelable support ticketing without heavy infrastructure — and increasingly want safe AI assistance scoped to their own data.",
    solution: [
      "A Next.js 16 app deployed on Cloudflare Workers (edge), with PostgreSQL via Hyperdrive and R2 object storage.",
      "An embeddable widget for end-user ticket submission, email-native messaging, and role-based access with audit logging.",
      "A custom Claude MCP server enabling scoped AI assistance with role-aware enforcement.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Cloudflare Workers", "PostgreSQL", "Hyperdrive", "Drizzle ORM", "R2", "Better Auth", "Resend", "MCP"],
    role: "Product and full-stack build (Stadia product).",
    highlights: [
      "Serverless, multi-tenant ticketing on the edge",
      "Embeddable support widget",
      "Email-native workflow",
      "Claude integration via a custom MCP server with scoped roles",
    ],
  },
  {
    slug: "permit-zoning-rag-assistant",
    title: "Permit & Zoning RAG Assistant",
    category: ["AI/ML"],
    domain: "Government / civic",
    summary:
      "A retrieval-augmented assistant that answers building-permit and zoning questions with citations, drawing on official municipal code, permit PDFs, and zoning tables.",
    problem:
      "Permit and zoning rules are scattered across dense code, PDFs, and tables — making preliminary guidance slow and hard to source reliably.",
    solution: [
      "An ingestion pipeline for mixed-format sources (HTML/XML code, PDFs, structured tables) into a searchable corpus.",
      "Semantic search with pgvector embeddings; citation-first answers that explicitly avoid unsupported claims (no guaranteed approvals).",
      "An optional OCR fallback (Azure AI Document Intelligence) for scanned inputs.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "OpenAI embeddings", "Azure AI Document Intelligence", "SQLAlchemy"],
    role: "RAG architecture and data pipeline.",
    highlights: [
      "Citation-first answers over official municipal sources",
      "Mixed-format ingestion (code, PDFs, tables)",
      "Semantic search with pgvector",
      "Guardrailed scope — guidance, not guarantees",
    ],
  },
  {
    slug: "ai-bakery-inventory-app",
    title: "AI Bakery-Inventory App",
    category: ["Mobile", "AI/ML"],
    domain: "Consumer / retail",
    summary:
      "A Flutter mobile app that helps bakery staff track inventory by snapping a shelf photo — AI identifies and counts the items.",
    problem:
      "Manual inventory counts are tedious and error-prone for small retail and bakery teams.",
    solution: [
      "A cross-platform Flutter app with Firebase auth, Firestore, and Cloud Functions.",
      "Shelf photos analyzed via OpenAI vision (through Cloud Functions) to identify and count pastry items.",
    ],
    stack: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Cloud Functions", "OpenAI", "Node.js"],
    role: "Mobile app and cloud backend.",
    highlights: [
      "Photo-based inventory via AI vision",
      "Cross-platform Flutter + Firebase",
      "Real-world retail use case",
    ],
  },
  {
    slug: "enterprise-task-management",
    title: "Enterprise Task Management",
    category: ["Web"],
    domain: "Enterprise / B2B",
    summary:
      "An enterprise task and project-tracking platform with Microsoft Entra ID single sign-on and Microsoft Graph email integration, built for Microsoft 365 organizations.",
    problem:
      "Organizations on Microsoft 365 needed task and project tracking that fit their existing identity and email stack without yet another standalone login.",
    solution: [
      "An ASP.NET Core 10 MVC app with SQL Server (EF Core + Dapper).",
      "Microsoft Entra ID SSO and the Microsoft Graph API for automated email notifications.",
      "Role-based task filtering and team collaboration.",
    ],
    stack: ["ASP.NET Core 10", "C#", "SQL Server", "EF Core", "Dapper", "Microsoft Entra ID", "Microsoft Graph API"],
    role: "Full-stack build.",
    highlights: [
      "Entra ID SSO — no separate login",
      "Microsoft Graph email automation",
      "Role-based filtering and collaboration",
    ],
  },
] satisfies Project[];

export const CAPABILITIES: Capability[] = [
  {
    title: "Database Migration",
    blurb:
      "SQL Server → PostgreSQL migration toolkit: automated schema conversion, stored-procedure translation, and data validation.",
    tags: ["SQL Server", "PostgreSQL", "PowerShell", "Node.js"],
  },
  {
    title: "Government System Integration",
    blurb:
      "Permitting-platform API integration — automated record creation, custom forms, and document uploads with enterprise auth.",
    tags: ["C#", ".NET", "REST API", "Automation"],
  },
  {
    title: "Cloud Automation & Observability",
    blurb:
      "Scheduled jobs on Azure Functions with retry/resilience policies, managed identity, and Application Insights telemetry.",
    tags: ["Azure Functions", "Polly", "App Insights", "Managed Identity"],
  },
  {
    title: "Public-Health AI",
    blurb:
      "A guidance chatbot pairing a React frontend with a .NET backend over OpenAI, with end-to-end test coverage.",
    tags: ["React", ".NET 10", "OpenAI", "Playwright"],
  },
  {
    title: "AI in Education",
    blurb:
      "A course-support chatbot platform with student analytics and single sign-on for a university (anonymized).",
    tags: ["ASP.NET Core", "OpenAI", "PostgreSQL", "SSO"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits 0, no output. (The `satisfies Project[]` annotation will surface any shape mistakes.)

- [ ] **Step 3: Commit**

```bash
git add app/data/projects.ts
git commit -m "feat: add projects data module (real anonymized portfolio)"
```

---

## Task 2: ProjectCard component

**Files:**
- Create: `app/components/ProjectCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
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
}: {
  project: Project;
  index: number;
}) {
  const gradient = CATEGORY_GRADIENT[project.category[0]];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add app/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard component"
```

---

## Task 3: Work section (filterable grid)

**Files:**
- Create: `app/components/Work.tsx`

- [ ] **Step 1: Write the component**

```tsx
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
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add app/components/Work.tsx
git commit -m "feat: add filterable Work section"
```

---

## Task 4: Capabilities strip

**Files:**
- Create: `app/components/Capabilities.tsx`

- [ ] **Step 1: Write the component**

```tsx
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add app/components/Capabilities.tsx
git commit -m "feat: add Capabilities section"
```

---

## Task 5: Move nav/footer to layout; rewire home page; fix anchor hrefs; delete Portfolio

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/components/Navbar.tsx`
- Modify: `app/components/Footer.tsx`
- Delete: `app/components/Portfolio.tsx`

- [ ] **Step 1: Update `app/layout.tsx`** — add the two imports after the existing `import "./globals.css";` line:

```tsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
```

Then replace the `<body>...</body>` block with:

```tsx
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
```

- [ ] **Step 2: Replace `app/page.tsx` entirely**

```tsx
// app/page.tsx
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Work />
      <Capabilities />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 3: Fix `app/components/Navbar.tsx` hrefs** so they work from detail pages too.

Replace the `navLinks` array:

```tsx
const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];
```

Change the logo anchor `href="#"` to `href="/"` (the `<a aria-label="Stadia — home">`).

Change BOTH "Get in Touch" anchors (desktop and mobile menu) from `href="#contact"` to `href="/#contact"`.

- [ ] **Step 4: Fix `app/components/Footer.tsx` hrefs** — change the four links from `#services`/`#about`/`#work`/`#contact` to `/#services`/`/#about`/`/#work`/`/#contact`.

- [ ] **Step 5: Delete the old Portfolio component**

```bash
git rm app/components/Portfolio.tsx
```

- [ ] **Step 6: Build (full)**

Run: `npm run build`
Expected: "Compiled successfully"; an `out/` directory is produced; no errors about missing modules (confirms `Portfolio.tsx` is no longer imported).

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/page.tsx app/components/Navbar.tsx app/components/Footer.tsx
git commit -m "feat: render nav/footer in layout, wire Work + Capabilities, drop Portfolio"
```

---

## Task 6: Static detail route `/work/[slug]`

**Files:**
- Create: `app/work/[slug]/page.tsx`
- Create: `app/components/CaseStudyView.tsx`

- [ ] **Step 1: Write the client detail view `app/components/CaseStudyView.tsx`**

```tsx
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
```

- [ ] **Step 2: Write the route `app/work/[slug]/page.tsx`** (Server Component — note the `await params` and the static-export exports)

```tsx
// app/work/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "../../data/projects";
import CaseStudyView from "../../components/CaseStudyView";

// Required for `output: "export"`: pre-generate one HTML file per slug.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// No on-demand params in a static export.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.title} — Stadia Consulting Group`;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      url: `https://www.stadialink.com/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <CaseStudyView project={project} />;
}
```

- [ ] **Step 3: Build and confirm static pages were emitted**

Run: `npm run build`
Expected: "Compiled successfully"; build output lists the `/work/[slug]` route as statically generated (8 entries).

Run: `ls out/work`
Expected: 8 HTML files —
`ai-bakery-inventory-app.html`, `citizen-government-messaging.html`, `enterprise-task-management.html`, `health-data-platform-modernization.html`, `medical-imaging-anonymization.html`, `multi-model-ai-discussion-platform.html`, `permit-zoning-rag-assistant.html`, `serverless-help-desk.html`.

- [ ] **Step 4: Commit**

```bash
git add app/work/[slug]/page.tsx app/components/CaseStudyView.tsx
git commit -m "feat: add static /work/[slug] case-study detail pages"
```

---

## Task 7: Light polish — Hero proof line + Services tags

**Files:**
- Modify: `app/components/Hero.tsx`
- Modify: `app/components/Services.tsx`

- [ ] **Step 1: Add an honest proof line to `Hero.tsx`** — insert this block immediately AFTER the subheadline `</motion.p>` (the one ending the "...applications that deliver real impact." paragraph) and BEFORE the CTAs `motion.div`:

```tsx
        {/* Proof line — capability range, no invented metrics */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 text-xs font-mono text-muted/70 uppercase tracking-[0.2em]"
        >
          Web · Mobile · AI — across healthcare, government &amp; enterprise
        </motion.p>
```

- [ ] **Step 2: Align the `services` tags in `Services.tsx`** to the real stacks. Replace each `tags` array:

For "Web Development":
```tsx
    tags: ["Next.js", ".NET", "React", "TypeScript"],
```
For "Mobile Development":
```tsx
    tags: ["Flutter", "Bloc", "Firebase", "Dart"],
```
For "Consulting & Strategy":
```tsx
    tags: ["Architecture", "Cloud", "AI / RAG", "Migrations"],
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: "Compiled successfully".

- [ ] **Step 4: Commit**

```bash
git add app/components/Hero.tsx app/components/Services.tsx
git commit -m "feat: add hero proof line; align service tags to real stacks"
```

---

## Task 8: Browser preview smoke-check

No code changes unless a defect is found. Use the preview tooling against the dev server.

- [ ] **Step 1: Start the dev server / preview** (via `preview_start`, or `npm run dev` then open the preview).

- [ ] **Step 2: Home page checks**
  - `preview_snapshot` the home page: confirm the Work section shows **8** cards and the **Capabilities** section renders 5 items.
  - `preview_console_logs`: confirm **no** errors.

- [ ] **Step 3: Filter check**
  - `preview_click` the "Mobile" filter button.
  - `preview_snapshot`: confirm only mobile projects remain (Citizen–Government Messaging, AI Bakery-Inventory App).
  - Click "All": confirm all 8 return.

- [ ] **Step 4: Detail page check**
  - Click a card (e.g. "Health-Data Platform Modernization").
  - `preview_snapshot`: confirm the detail page renders The Challenge / What We Built / Highlights / Our Role / Stack, and that the URL is `/work/health-data-platform-modernization`.
  - Click "Back to work": confirm it returns to the home page Work section.
  - `preview_console_logs`: confirm no errors.

- [ ] **Step 5: Anonymization spot-check** — `preview_snapshot` two detail pages and grep the text for forbidden strings. There must be **no** occurrences of `Rutgers`, `Johns Hopkins`, `JHU`, `HIPAA`, `Baltimore`, or `Accela` anywhere in the rendered output.

- [ ] **Step 6: Responsive check** — `preview_resize` to a narrow width (~390px) and `preview_snapshot`: confirm the grid collapses to one column and the nav toggle works.

- [ ] **Step 7: Final screenshot** — `preview_screenshot` the Work section and one detail page to share with the owner as proof.

- [ ] **Step 8: If any defect was fixed**, commit:

```bash
git add -A
git commit -m "fix: address preview smoke-check findings"
```

---

## Deployment (after owner sign-off — not part of the build tasks)

Per `DEPLOY.md`, deploys are manual and the owner runs them (do not deploy without explicit approval):

```bash
npm run build
npx wrangler pages deploy out --project-name stadialink --branch main
```

---

## Self-Review

**Spec coverage:**
- §3 anonymization/honesty → enforced in Task 1 data + Task 8 Step 5 grep. ✓
- §4 architecture/routing (single-page + static detail pages, projects.ts, Next 16 docs) → Tasks 1, 5, 6. ✓
- §5 content model → Task 1 `Project`/`Capability` interfaces. ✓
- §6 featured 8 → Task 1 `PROJECTS`. ✓
- §7 capabilities strip → Task 1 `CAPABILITIES` + Task 4. ✓
- §8 component plan (rebuilt Work, new detail/Capabilities, polish Hero/Services/Footer/Navbar, untouched Contact/About/Logo/globals) → Tasks 2–7. ✓
- §9 visual refresh (existing tokens, domain-coded cards) → Tasks 2, 6. ✓
- §10 build/verify/deploy → Tasks 5–8 + Deployment section. ✓
- §11 testing (build + preview, no new framework) → Testing approach + Task 8. ✓

**Placeholder scan:** No TBD/TODO; all code blocks are complete; no "handle edge cases" hand-waving. ✓

**Type consistency:** `Project`/`Category`/`Capability` defined in Task 1 and used identically in Tasks 2–6. `getProjectBySlug` signature matches its call sites. `generateStaticParams` returns `{ slug }` matching the `params: Promise<{ slug: string }>` shape. Import paths are relative and match the file tree. ✓
