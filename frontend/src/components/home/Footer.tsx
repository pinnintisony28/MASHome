import { Code2, Mail, HeartHandshake } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#0B2545] bg-[#0B2545]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Main Grid */}
        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Brand + Logo */}
          <div className="md:col-span-6 space-y-3">
            <img
              src="/web.jpeg"
              alt="MASHome — MASLD Knowledge Discovery Platform"
              
              className="h-14 w-auto"
            />
            <p className="text-xs text-slate-300/80 leading-relaxed max-w-md">
              MASLD Knowledge Discovery Platform integrating targets, drugs,
              genes, biomarkers, bioactives, clinical trials, and literature.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
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
                    className="text-xs text-slate-300/80 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3
              className="text-xs font-semibold text-white uppercase tracking-wider mb-3"
              style={{ fontFamily: "Roboto Slab" }}
            >
              Contact
            </h3>
            <div className="space-y-2.5">
              <a
                href="mailto:pinninitisony4041@gmail.com"
                className="flex items-center gap-2.5 text-xs text-slate-300/80 hover:text-emerald-400 transition-colors group"
              >
                <Mail size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="truncate">pinninitisony4041@gmail.com</span>
              </a>
              <a
                href="https://github.com/pinnintisony28"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-300/80 hover:text-emerald-400 transition-colors group"
              >
                <Code2 size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="truncate">github.com/pinnintisony28</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sony-pinninti-17b186343"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-300/80 hover:text-emerald-400 transition-colors group"
              >
                {/* <Linkedin size={14} className="text-emerald-400 flex-shrink-0" /> */}
                {/* <span>LinkedIn</span> */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-xs text-slate-400">
              © {currentYear} MASHome. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <HeartHandshake size={14} className="text-emerald-400" />
              <span>Built for Biomedical Research</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}