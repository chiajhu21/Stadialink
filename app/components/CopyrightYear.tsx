// app/components/CopyrightYear.tsx
// Renders the current year on the client so the footer copyright never goes
// stale on a static export. The build bakes the build-time year into the HTML;
// the client re-renders with the live year on hydration (suppressHydrationWarning
// covers the expected year-boundary difference). Footer stays a server component.
"use client";

export function CopyrightYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
