export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span className="font-display font-800 text-accent text-xs">
                S
              </span>
            </div>
            <span className="font-display font-600 text-sm tracking-tight text-muted">
              Stadia Consulting Group
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs font-body font-400 text-muted">
            <a href="#services" className="hover:text-foreground transition-colors duration-300">
              Services
            </a>
            <a href="#about" className="hover:text-foreground transition-colors duration-300">
              About
            </a>
            <a href="#work" className="hover:text-foreground transition-colors duration-300">
              Work
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors duration-300">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/60 font-body font-300">
            &copy; {new Date().getFullYear()} Stadia Consulting Group, LLC. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
