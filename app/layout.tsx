import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Stadia Consulting Group | Software That Moves You Forward",
  description:
    "Stadia Consulting Group builds high-performance web and mobile applications. From strategy to deployment, we craft software that drives results.",
  keywords: [
    "software development",
    "web development",
    "mobile apps",
    "consulting",
    "Stadia",
  ],
  openGraph: {
    title: "Stadia Consulting Group",
    description: "Software That Moves You Forward",
    url: "https://www.stadialink.com",
    siteName: "Stadia Consulting Group",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
