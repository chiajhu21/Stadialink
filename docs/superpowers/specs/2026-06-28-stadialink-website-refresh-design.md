# Stadia Consulting Group — Website Refresh + Real Portfolio

**Date:** 2026-06-28
**Status:** Approved design, pending implementation plan
**Repo:** `stadialink` (Next.js 16, React 19, Tailwind v4, framer-motion; static export → Cloudflare Pages)

## 1. Summary

Refresh the existing Stadia Consulting Group marketing site and replace its four
fictional portfolio entries with real, anonymized case studies drawn from the
owner's actual project folders under `~/Developer/`. Direction chosen:
**refined evolution** — keep the current dark, modern aesthetic and static-export
architecture; elevate it with real case studies, category filtering, and dedicated
project detail pages. Portfolio scope: a **curated top set of 8** featured case
studies, with remaining work surfaced as a "Capabilities" strip.

## 2. Goals / Non-goals

**Goals**
- Replace fictional portfolio with real, verifiable, anonymized work.
- Add a filterable Work grid (All / Web / Mobile / AI·ML / Backend).
- Add static `/work/[slug]` detail pages, one per featured case study.
- Centralize all project content in a single `app/data/projects.ts` module.
- Keep brand, color tokens, fonts, Contact form, and deploy flow intact.

**Non-goals (YAGNI)**
- No CMS or blog. No light theme (that was a rejected direction).
- No fabricated metrics, no client names, no compliance claims.
- No real product screenshots (we don't have shareable ones).
- No change to the Contact form (Web3Forms) or the manual Cloudflare deploy flow.

## 3. Honesty & anonymization rules (binding)

These constraints govern all copy in `projects.ts` and detail pages:

- **No client/institution names.** No "Rutgers", "Johns Hopkins/JHU", "Baltimore
  City", "Accela" as a client, etc. Describe clients generically ("a university
  health system", "a public-health agency", "a municipal government").
- **No compliance claims.** Never state or imply "HIPAA-compliant" — not achieved.
- **The clinical/discussion board** (if ever surfaced) is described accurately as a
  **discussion board shared among doctors, nurses, and public-health workers** —
  not a patient-records system.
- **Only verifiable facts** from the codebase survey may appear (e.g. "126+
  reports", "cross-platform web + mobile", ".NET Framework → .NET 10"). No invented
  outcome numbers, revenue figures, or user counts.

## 4. Architecture & routing

- **Single-page marketing flow stays:** Hero → Services → About → Work → Capabilities → Contact → Footer.
- **New static detail pages:** `app/work/[slug]/page.tsx`, statically generated for
  each featured project. Must be compatible with `output: "export"` (Cloudflare
  Pages). This requires the Next 16 static-params API.
- **Single source of truth:** `app/data/projects.ts` exports the typed project list.
  Both the Work grid and the detail pages read from it. Content lives here, away
  from layout/markup.
- **Next 16 + React 19 caveat:** Per repo `AGENTS.md` ("This is NOT the Next.js you
  know"), the implementer MUST read the relevant guides under
  `node_modules/next/dist/docs/` (static params, metadata, dynamic routes with
  `output: export`) **before** writing route code. Do not assume App Router APIs
  from memory.

## 5. Content model

TypeScript shape in `app/data/projects.ts`:

```ts
type Category = "Web" | "Mobile" | "AI/ML" | "Backend";

interface Project {
  slug: string;            // url segment, e.g. "health-data-platform-modernization"
  title: string;
  category: Category[];    // one or more; drives the filter
  domain: string;          // e.g. "Healthcare & public health"
  summary: string;         // 1–2 sentence card + detail intro
  problem: string;         // the challenge
  solution: string[];      // bullet list of what was built
  stack: string[];         // verifiable technologies
  role: string;            // Stadia's role
  highlights: string[];    // short, factual outcome bullets (no invented numbers)
  featured: true;          // all 8 are featured
}
```

The "Capabilities" strip uses a lighter shape (`{ title, blurb, tags[] }`) — these
are mentioned, not linked to detail pages.

## 6. Featured projects (the curated 8)

All copy below is anonymized and limited to verified facts.

### 6.1 Health-data platform modernization — `health-data-platform-modernization`
- **category:** Web, Backend · **domain:** Healthcare & public health
- **summary:** A multi-year modernization of a mature health-data application — migrating a legacy .NET Framework system to .NET 10, with a rebuilt reporting engine, a PII-masking microservice, and cloud background automation.
- **problem:** A mature application serving healthcare and public-health institutions had accumulated legacy .NET Framework code, WebForms/RDLC reporting, and tightly-coupled data access — costly to maintain and risky to extend across multiple production tenants.
- **solution:**
  - Phased migration of the core app to .NET 10 ASP.NET Core, using Dapper for legacy stored-procedure access and EF Core for identity — stable and backward-compatible throughout.
  - Reporting rebuilt as a modern Razor sub-application: 126+ reports with drill-down charts, CSV/Excel/PDF export, and tenant-aware theming — replacing legacy RDLC/WebForms.
  - API-first PII-masking microservice (Python/FastAPI) detecting & masking sensitive data across text, HTML, PDF, DOCX, and image inputs, with rule-based + AI-assisted detection and async processing.
  - Cloud background automation: scheduled report distribution (Azure Functions + email) and data-retention log archival to blob storage, with retry/resilience policies.
- **stack:** .NET 10, ASP.NET Core, C#, SQL Server, Dapper, EF Core, Python, FastAPI, Celery/Redis, Chart.js, QuestPDF, Azure Functions, AWS SES, Cloudflare R2
- **role:** Full lifecycle — architecture, migration strategy, reporting redesign, microservice, and DevOps automation.
- **highlights:** Legacy .NET Framework → .NET 10 via phased, backward-compatible rollout across multiple tenants · 126+ reports rebuilt with drill-down and multi-format export · API-first PII-masking across 5+ document formats · Scheduled cloud jobs with retry and data-retention archival.

### 6.2 Citizen–government messaging platform — `citizen-government-messaging`
- **category:** Web, Mobile, AI/ML · **domain:** Government / public services
- **summary:** A cross-platform communication platform connecting citizens and government staff — a .NET 10 web portal plus a native Flutter mobile app, with AI-assisted responses and live message streaming.
- **problem:** A government agency needed a modern way for citizens to communicate about permits and inquiries, with staff able to triage and respond efficiently across web and mobile.
- **solution:**
  - .NET 10 web platform with separate citizen and staff experiences, permit-linked conversation threads, and bucket-based workload distribution for staff.
  - AI-assisted reply drafting (OpenAI), presigned file attachments via Cloudflare R2, and OpenTelemetry observability.
  - Native Flutter mobile app (Bloc architecture) with JWT auth + rotating refresh tokens, biometric unlock, and Server-Sent Events for streaming AI responses.
- **stack:** .NET 10, ASP.NET Core, C#, PostgreSQL, Dapper, Flutter, Dart, Bloc, GoRouter, OpenAI, Cloudflare R2, Application Insights
- **role:** End-to-end — backend, web, mobile, AI integration, cloud.
- **highlights:** One platform across web + native mobile · AI-assisted staff responses with live SSE streaming · Biometric auth + rotating refresh tokens on mobile · Permit-linked threads with automatic workload distribution.

### 6.3 Medical-imaging anonymization service — `medical-imaging-anonymization`
- **category:** Backend, AI/ML · **domain:** Healthcare / medical imaging
- **summary:** A microservice that automatically detects and redacts burned-in patient information from DICOM medical images using deep-learning text detection and OCR, plus 3D mesh extraction for visualization.
- **problem:** DICOM imaging files often contain burned-in patient identifiers that must be removed before images can be shared or reused — a slow, error-prone manual task.
- **solution:**
  - ASP.NET Core 8 REST microservice parsing DICOM with fo-dicom.
  - ONNX deep-learning text detection + Tesseract OCR to locate and mask burned-in PII on images.
  - 3D mesh extraction and glTF optimization for downstream visualization, with presigned R2 download URLs.
- **stack:** .NET 8, ASP.NET Core, C#, fo-dicom, ONNX Runtime, Tesseract OCR, SixLabors.ImageSharp, SharpGLTF, Cloudflare R2, Swagger
- **role:** Service architecture, ML integration, image pipeline.
- **highlights:** Automated PII redaction on DICOM imagery · ML text detection (ONNX) + OCR pipeline · 3D mesh extraction with glTF optimization · Secure presigned delivery.

### 6.4 Multi-model AI discussion platform — `multi-model-ai-discussion-platform`
- **category:** AI/ML · **domain:** Stadia product
- **summary:** A desktop application that lets a human moderator orchestrate structured discussions among multiple AI models — cloud and local — with real-time streaming and workspace-based project management.
- **problem:** Getting value from multiple AI models usually means juggling separate tools; there was no single place to run a moderated, multi-model conversation with full history and control.
- **solution:**
  - Tauri (Rust) desktop shell with a React + TypeScript frontend and a FastAPI (Python) backend.
  - Moderator-controlled turn orchestration across configurable models (e.g. Claude, GPT, local Ollama), with real-time WebSocket streaming and token tracking.
  - Workspace-first organization (projects, threads, AI personas), local-first SQLite storage, and OS-keychain credential storage.
- **stack:** Tauri, Rust, React, TypeScript, Vite, FastAPI, Python, SQLAlchemy, SQLite, Ollama, WebSockets
- **role:** Product design + full-stack build (Stadia product).
- **highlights:** Moderated multi-model AI discussions in one app · Cloud + local (Ollama) orchestration · Real-time WebSocket streaming with token tracking · Local-first, secure credential storage.

### 6.5 Serverless help-desk platform — `serverless-help-desk`
- **category:** Web · **domain:** Stadia product
- **summary:** A multi-tenant help-desk ticketing platform built serverless on Cloudflare Workers, with an embeddable support widget, email-native workflow, and AI integration through a custom MCP server.
- **problem:** Teams want lightweight, white-labelable support ticketing without heavy infrastructure — and increasingly want safe AI assistance scoped to their own data.
- **solution:**
  - Next.js 16 app deployed on Cloudflare Workers (edge), PostgreSQL via Hyperdrive, R2 object storage.
  - Embeddable widget for end-user ticket submission; email-native messaging; role-based access with audit logging.
  - Custom Claude MCP server enabling scoped AI assistance with role-aware enforcement.
- **stack:** Next.js 16, React 19, TypeScript, Cloudflare Workers, PostgreSQL, Hyperdrive, Drizzle ORM, R2, Better Auth, Resend, MCP
- **role:** Product + full-stack build (Stadia product).
- **highlights:** Serverless, multi-tenant ticketing on the edge · Embeddable support widget · Email-native workflow · Claude integration via custom MCP server with scoped roles.

### 6.6 Permit & zoning RAG assistant — `permit-zoning-rag-assistant`
- **category:** AI/ML · **domain:** Government / civic
- **summary:** A retrieval-augmented assistant that answers building-permit and zoning questions with citations, drawing on official municipal code, permit PDFs, and zoning tables.
- **problem:** Permit and zoning rules are scattered across dense code, PDFs, and tables — making preliminary guidance slow and hard to source reliably.
- **solution:**
  - Ingestion pipeline for mixed-format sources (HTML/XML code, PDFs, structured tables) into a searchable corpus.
  - Semantic search with pgvector embeddings; citation-first answers that explicitly avoid unsupported claims (no guaranteed approvals).
  - Optional OCR fallback (Azure AI Document Intelligence) for scanned inputs.
- **stack:** Python, FastAPI, PostgreSQL, pgvector, OpenAI embeddings, Azure AI Document Intelligence, SQLAlchemy
- **role:** RAG architecture and data pipeline.
- **highlights:** Citation-first answers over official municipal sources · Mixed-format ingestion (code, PDFs, tables) · Semantic search with pgvector · Guardrailed scope — guidance, not guarantees.

### 6.7 AI bakery-inventory app — `ai-bakery-inventory-app`
- **category:** Mobile, AI/ML · **domain:** Consumer / retail
- **summary:** A Flutter mobile app that helps bakery staff track inventory by snapping a shelf photo — AI identifies and counts the items.
- **problem:** Manual inventory counts are tedious and error-prone for small retail/bakery teams.
- **solution:**
  - Cross-platform Flutter app with Firebase auth, Firestore, and Cloud Functions.
  - Shelf photos analyzed via OpenAI vision (through Cloud Functions) to identify and count pastry items.
- **stack:** Flutter, Dart, Firebase (Auth, Firestore, Functions, Storage), OpenAI, Node.js
- **role:** Mobile app + cloud backend.
- **highlights:** Photo-based inventory via AI vision · Cross-platform Flutter + Firebase · Real-world retail use case.

### 6.8 Enterprise task management — `enterprise-task-management`
- **category:** Web · **domain:** Enterprise / B2B
- **summary:** An enterprise task and project-tracking platform with Microsoft Entra ID single sign-on and Microsoft Graph email integration, built for Microsoft 365 organizations.
- **problem:** Organizations on Microsoft 365 needed task/project tracking that fit their existing identity and email stack without yet another standalone login.
- **solution:**
  - ASP.NET Core 10 MVC app with SQL Server (EF Core + Dapper).
  - Microsoft Entra ID SSO and Microsoft Graph API for automated email notifications.
  - Role-based task filtering and team collaboration.
- **stack:** ASP.NET Core 10, C#, SQL Server, EF Core, Dapper, Microsoft Entra ID, Microsoft Graph API
- **role:** Full-stack build.
- **highlights:** Entra ID SSO — no separate login · Microsoft Graph email automation · Role-based filtering & collaboration.

**Swappable alternates** (not in the 8, available if owner wants to swap): public-health AI chatbot (TB isolation guidance); AI course-support platform for a university (anonymized).

## 7. Capabilities strip (mentioned, not linked)

- **Database migration** — SQL Server → PostgreSQL toolkit (schema conversion, stored-procedure translation, data validation).
- **Government system integration** — permitting-platform API integration (record creation, forms, document uploads).
- **Cloud automation & observability** — scheduled jobs (Azure Functions), retry/resilience policies, Application Insights.
- **Public-health AI** — guidance chatbot (React + .NET + OpenAI) with E2E test coverage.
- **AI in education** — course-support chatbot platform with analytics and SSO (anonymized).

## 8. Component plan

**Rebuilt**
- `app/components/Portfolio.tsx` → `Work` section: filterable grid (All / Web / Mobile / AI·ML / Backend) reading from `projects.ts`; cards link to `/work/[slug]`. Filtering animated with framer-motion layout transitions. Card visuals = domain-coded motifs built from existing `dot-grid` / `gradient-mesh` / accent utilities (no fake screenshots).

**New**
- `app/data/projects.ts` — typed source of truth (section 5 + 6).
- `app/work/[slug]/page.tsx` — static detail page (overview, problem, solution bullets, stack chips, role, highlights, back-to-work link). Per-page metadata for SEO/OG.
- `app/components/Capabilities.tsx` — the strip in section 7.
- Possibly `app/components/ProjectCard.tsx` and `app/components/WorkFilter.tsx` extracted from the Work section for clarity.

**Light polish**
- `Hero.tsx` — add one honest proof line (e.g. "Web · Mobile · AI across healthcare, government & enterprise"). No invented metrics.
- `Services.tsx` — align tags to real stacks; copy stays.
- `Footer.tsx` — add Work / section links.
- `Navbar.tsx` — ensure the Work link still targets the section; detail pages link back home.

**Untouched**
- `Contact.tsx` (Web3Forms), `About.tsx` (minor copy only if needed), `Logo.tsx`, `globals.css` tokens, fonts, `next.config.ts`.

## 9. Visual refresh (within the existing dark theme)

- Keep tokens: bg `#0b0d12`, accent `#0c7cf4`, Sora/Manrope/Space Mono.
- Reuse established utilities (`card-glow`, `dot-grid`, `gradient-mesh`, `glow-line`, `accent-underline`).
- Work cards: domain-coded subtle gradient + category label + tech chips + "View case study →". Replace the old fictional gradient bars.
- Optional, restrained per-category accent tint anchored to brand blue (avoid a rainbow); default to brand blue if it gets noisy.
- Detail page: focused hero (title, domain, category chips), then problem / what we built / stack / highlights; generous type rhythm.

## 10. Build, verify, deploy

- `next build` must succeed and emit `out/` with the new static `/work/<slug>/` routes.
- Preview-verify: Work grid renders 8 cards, filters work, a detail page renders and the back link works; check console for errors.
- Deploy via the existing manual flow in `DEPLOY.md` (`wrangler pages deploy out`) — not changed here.
- Commit straight to `main` per repo convention.

## 11. Testing

- Primary verification is a clean static build + preview smoke check (no test framework currently in the repo; adding one is out of scope).
- Type-check via the build; lint via `eslint`.

## 12. Open questions

None blocking. Featured set and direction approved. Alternates in §6 are available
if the owner wants to swap any of the 8 during implementation.
