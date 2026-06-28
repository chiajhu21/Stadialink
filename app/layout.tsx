import type { Metadata } from "next";
import { Sora, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stadialink.com"),
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
      className={`${sora.variable} ${manrope.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
