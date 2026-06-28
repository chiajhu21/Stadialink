import Link from "next/link";
import { Mark } from "./Logo";

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Mark className="w-6 h-6 text-accent" />
            <span className="font-display font-semibold text-sm tracking-tight text-muted">
              Stadia Consulting Group
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs font-body font-normal text-muted">
            <Link href="/#services" className="hover:text-foreground transition-colors duration-300">
              Services
            </Link>
            <Link href="/#about" className="hover:text-foreground transition-colors duration-300">
              About
            </Link>
            <Link href="/#work" className="hover:text-foreground transition-colors duration-300">
              Work
            </Link>
            <Link href="/#contact" className="hover:text-foreground transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/60 font-body font-light">
            &copy; {new Date().getFullYear()} Stadia Consulting Group, LLC. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
