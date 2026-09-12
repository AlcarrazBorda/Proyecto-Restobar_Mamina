import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#C9A86A]/15 bg-[#0D0D0D]/60 pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand and Manifesto */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block font-display text-3xl tracking-[0.28em] text-gold-gradient font-medium"
            >
              MAMINA
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#D1D1CB]/60">
              Gastro lounge y templo nocturno independiente en Ayacucho. Mixología de alta
              precisión, cocina de brasa, zonas VIP privadas y sesiones de sonido refinadas cada
              noche.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[#C9A86A]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Mamina Restobar"
                className="flex h-8 w-8 items-center justify-center rounded-[1px] border border-[#C9A86A]/30 transition-colors hover:border-[#C9A86A] hover:bg-[#C9A86A]/10 hover:text-white"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de Mamina Restobar"
                className="flex h-8 w-8 items-center justify-center rounded-[1px] border border-[#C9A86A]/30 transition-colors hover:border-[#C9A86A] hover:bg-[#C9A86A]/10 hover:text-white"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <p className="eyebrow text-[10px]">Experiencia</p>
              <ul className="mt-4 space-y-2.5 text-xs text-[#D1D1CB]/70">
                <li>
                  <Link to="/carta" className="transition-colors hover:text-[#C9A86A]">
                    La Carta y Mixología
                  </Link>
                </li>
                <li>
                  <Link to="/experiencias" className="transition-colors hover:text-[#C9A86A]">
                    Experiencias VIP
                  </Link>
                </li>
                <li>
                  <Link to="/agenda" className="transition-colors hover:text-[#C9A86A]">
                    Lineup y Eventos
                  </Link>
                </li>
                <li>
                  <Link to="/galeria" className="transition-colors hover:text-[#C9A86A]">
                    The Vibe Galería
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow text-[10px]">Servicios</p>
              <ul className="mt-4 space-y-2.5 text-xs text-[#D1D1CB]/70">
                <li>
                  <Link to="/reservas" className="transition-colors hover:text-[#C9A86A]">
                    Reservas y Atención
                  </Link>
                </li>
                <li>
                  <Link to="/experiencias" className="transition-colors hover:text-[#C9A86A]">
                    Cava Privada
                  </Link>
                </li>
                <li>
                  <span className="text-[#7A7A75] cursor-default">Catering de Autor</span>
                </li>
                <li>
                  <span className="text-[#7A7A75] cursor-default">Botillería en Mesa</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Info and Contact */}
          <div className="space-y-4 text-xs text-[#D1D1CB]/70 lg:col-span-4">
            <p className="eyebrow text-[10px]">Ubicación y Contacto</p>

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-[#C9A86A] mt-0.5" strokeWidth={1.5} />
              <div>
                <span>Jr. José Olaya (Local Restaurante Las Flores)</span>
                <p className="text-[11px] text-[#7A7A75]">Negocio independiente · Ayacucho, Perú</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 shrink-0 text-[#C9A86A] mt-0.5" strokeWidth={1.5} />
              <div>
                <p>Martes a Domingo: 19:00 a 03:00</p>
                <p className="text-[11px] text-[#7A7A75]">Lunes: Cerrado</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#C9A86A] mt-0.5" strokeWidth={1.5} />
              <span>+51 999 888 777 · reservas@mamina.pe</span>
            </div>

            <div className="pt-2">
              <Link to="/reservas" className="btn-secondary text-[10px] py-2 px-5">
                <span>Solicitar Mesa VIP</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="gold-rule my-12 opacity-30" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.25em] text-[#7A7A75] uppercase">
          <p>
            © {new Date().getFullYear()} Mamina Restobar · Ayacucho. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span>Código de Vestimenta: Smart Casual / Elegant</span>
            <span>Reserva Recomendada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
