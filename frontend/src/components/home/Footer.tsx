import {
  Database,
  Code2,
  Mail,
  HeartHandshake,
  // Linkedin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Platform - About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 flex-shrink-0">
                <Database size={16} className="text-white" />
                <div className="absolute inset-0 rounded-lg border-2 border-white/20" />
                <div className="absolute inset-0 rounded-lg bg-white/10 animate-pulse" />
              </div>
              <h2
                className="text-lg font-bold text-white"
                style={{ fontFamily: "Roboto Slab" }}
              >
                MASHome
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              MASLD Knowledge Discovery Platform integrating targets, drugs, genes, biomarkers, bioactives, clinical trials, and literature.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs font-semibold text-white uppercase tracking-wider mb-3"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Targets", "Drugs", "Dashboard"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3
              className="text-xs font-semibold text-white uppercase tracking-wider mb-3"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Technology
            </h3>
            <ul className="space-y-2">
              {["FastAPI", "React + TypeScript", "MySQL", "SQLAlchemy ORM"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold text-white uppercase tracking-wider mb-3"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Contact
            </h3>
            <div className="space-y-2.5">
              <a
                href="mailto:pinninitisony4041@gmail.com"
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                <Mail size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="truncate">pinninitisony4041@gmail.com</span>
              </a>
              <a
                href="https://github.com/pinnintisony28"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                <Code2 size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="truncate">github.com/pinnintisony28</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sony-pinninti-17b186343"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors group"
              >
                {/* <Linkedin size={14} className="text-emerald-400 flex-shrink-0" /> */}
                {/* <span>LinkedIn</span> */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-700/80">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-xs text-slate-500">
              © {currentYear} MASHome. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <HeartHandshake size={14} className="text-emerald-400" />
              <span>Built for Biomedical Research</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}