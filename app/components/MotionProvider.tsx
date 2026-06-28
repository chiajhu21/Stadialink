// app/components/MotionProvider.tsx
// Respects the user's OS "reduce motion" setting for all framer-motion
// animations (disables transform/layout motion, keeps gentle opacity fades).
"use client";

import { MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
