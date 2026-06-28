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
