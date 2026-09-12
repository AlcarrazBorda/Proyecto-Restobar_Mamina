import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/carta", label: "La Carta" },
  { to: "/experiencias", label: "Experiencias VIP" },
  { to: "/galeria", label: "The Vibe" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
          scrolled
            ? "glass-panel border-x-0 border-t-0 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            : "border-transparent bg-gradient-to-b from-[#070707]/90 via-[#070707]/40 to-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Brand Wordmark: MAMINA RESTOBAR */}
          <Link
            to="/"
            className="group flex flex-col font-display text-2xl tracking-[0.28em] text-white transition-all duration-300 hover:opacity-85"
          >
            <span className="text-gold-gradient font-medium">MAMINA</span>
            <span className="text-[8px] tracking-[0.48em] text-[#C9A86A] uppercase font-semibold transition-colors group-hover:text-white">
              RESTOBAR
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            {links.map((l) => {
              const isActive = currentPath === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative py-1 text-[11px] tracking-[0.22em] uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[#E8D3A7] font-semibold"
                      : "text-[#CECBC4]/70 hover:text-white font-normal"
                  }`}
                >
                  {l.label}
                  {isActive && <span className="absolute inset-x-0 -bottom-1 h-px bg-[#C9A86A]" />}
                </Link>
              );
            })}
          </div>

          {/* VIP Booking CTA and Mobile Menu */}
          <div className="ml-8 flex items-center gap-3.5">
            <Link to="/reservas" className="btn-header hidden md:inline-flex">
              Reservar Mesa
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="flex h-8 w-8 items-center justify-center rounded-[1px] border border-white/15 text-[#CECBC4] transition-colors hover:border-[#C9A86A] hover:text-white lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Glass Drawer */}
      <div
        className={`fixed inset-0 z-30 flex flex-col justify-between bg-[#070707]/95 px-8 pt-28 pb-10 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-6">
          <div className="flex flex-col font-display text-2xl tracking-[0.28em]">
            <span className="text-gold-gradient font-medium">MAMINA</span>
            <span className="text-[8px] tracking-[0.48em] text-[#C9A86A] uppercase font-semibold">
              RESTOBAR
            </span>
          </div>
          <nav className="flex flex-col space-y-4">
            {links.map((l) => {
              const isActive = currentPath === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`font-display text-2xl tracking-[0.1em] transition-colors ${
                    isActive ? "text-[#E5C378]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 border-t border-[#C9A86A]/20 pt-6">
          <p className="text-xs text-[#7A7A75]">Jr. José Olaya (Local Las Flores) · Ayacucho</p>
          <Link to="/reservas" className="btn-primary w-full text-center">
            Reservar Experiencia VIP
          </Link>
        </div>
      </div>
    </>
  );
}
