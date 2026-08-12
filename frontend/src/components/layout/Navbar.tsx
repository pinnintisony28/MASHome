import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import Logo from "../../assets/final.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Targets", path: "/targets" },
  { name: "Genes", path: "/genes" },
  { name: "Drugs", path: "/drugs" },
  { name: "Biomarkers", path: "/biomarkers" },
  { name: "Bioactives", path: "/bioactives" },
];

const moreNavItems = [
  {
    name: "Patent",
    path: "/patents",
  },
  {
    name: "Medical Devices",
    path: "/medical-devices",
  },
  {
    name: "Associated Diseases",
    path: "/associated-diseases",
  },
  {
    name: "Pathways",
    path: "/pathways",
  },
  {
    name: "Other Therapies",
    path: "/other-therapies",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  return (
    <header className="relative z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center"
        >
          <img
            src={Logo}
            alt="MASHome"
            className="h-8 w-auto sm:h-9 md:h-10 lg:h-12 xl:h-14"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="relative hidden items-center gap-1 lg:flex">

          {/* Main Navigation */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-teal-600/10 to-emerald-600/10 text-teal-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Clinical Trials Dropdown */}
          <div className="group relative">

            <NavLink
              to="/clinical-trials"
              className={({ isActive }) =>
                `relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-teal-600/10 to-emerald-600/10 text-teal-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Clinical Trials

                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600" />
                  )}
                </>
              )}
            </NavLink>

            {/* Clinical Trials Dropdown */}
            <div
              className="
                invisible absolute right-0 top-full z-[9999] mt-1
                w-48
                translate-y-2
                rounded-xl
                border border-slate-200
                bg-white
                p-2
                opacity-0
                shadow-xl
                transition-all duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              {/* All Clinical Trials */}
              <NavLink
                to="/clinical-trials"
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <div className="font-medium">
                  All Clinical Trials
                </div>

                <div className="mt-0.5 text-xs text-slate-400">
                  All studies
                </div>
              </NavLink>

              {/* Terminated */}
              <NavLink
                to="/clinical-trials/terminated"
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <div className="font-medium">
                  Terminated
                </div>

                <div className="mt-0.5 text-xs text-slate-400">
                  Terminated studies
                </div>
              </NavLink>

              {/* Withdrawn */}
              <NavLink
                to="/clinical-trials/withdrawn"
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <div className="font-medium">
                  Withdrawn
                </div>

                <div className="mt-0.5 text-xs text-slate-400">
                  Withdrawn studies
                </div>
              </NavLink>
            </div>
          </div>

          {/* More Dropdown */}
          <div className="group relative">

            <button
              type="button"
              className="
                flex items-center gap-1
                rounded-lg px-3 py-2
                text-sm font-medium
                text-slate-600
                transition-all duration-200
                hover:bg-slate-100/80
                hover:text-slate-900
              "
            >
              More

              <ChevronDown
                size={14}
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </button>

            {/* More Dropdown */}
            <div
              className="
                invisible absolute right-0 top-full z-[9999] mt-1
                w-56
                translate-y-2
                rounded-xl
                border border-slate-200
                bg-white
                p-2
                opacity-0
                shadow-xl
                transition-all duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              {moreNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-emerald-50 font-medium text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setIsMobileMenuOpen(
              !isMobileMenuOpen
            )
          }
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col space-y-1 px-4 py-3">

            {/* Main Navigation */}
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-600/10 to-emerald-600/10 text-teal-700"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Mobile Clinical Trials */}
            <div className="mt-1 border-t border-slate-100 pt-2">

              <div className="px-4 py-2 text-sm font-semibold text-slate-700">
                Clinical Trials
              </div>

              <NavLink
                to="/clinical-trials"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="block rounded-lg px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                All Clinical Trials
              </NavLink>

              <NavLink
                to="/clinical-trials/terminated"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="block rounded-lg px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                Terminated
              </NavLink>

              <NavLink
                to="/clinical-trials/withdrawn"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="block rounded-lg px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                Withdrawn
              </NavLink>

            </div>

            {/* Mobile More */}
            <div className="mt-1 border-t border-slate-100 pt-2">

              <div className="px-4 py-2 text-sm font-semibold text-slate-700">
                More
              </div>

              {moreNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className={({ isActive }) =>
                    `block rounded-lg px-6 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-emerald-50 font-medium text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}