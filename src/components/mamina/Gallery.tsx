import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import mix1 from "@/assets/mix-1.jpg";
import mix2 from "@/assets/mix-2.jpg";
import mix3 from "@/assets/mix-3.jpg";

const drinks = [
  { src: mix1, alt: "Cóctel Huamanga Velvet de inspiración andina" },
  { src: mix2, alt: "Cóctel Cacao VRAEM ahumado" },
  { src: mix3, alt: "Cóctel Oro de Huamanga con lámina de oro" },
];

export function Gallery() {
  return (
    <section id="vibe" className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow">V. The Vibe</p>
            <h2 className="mt-4 text-white">
              Detalles que se{" "}
              <span className="text-gold-gradient italic font-editorial font-normal tracking-normal lowercase first-letter:uppercase">
                recuerdan
              </span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <Link
              to="/galeria"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#C9A86A] uppercase font-semibold transition-all duration-300 hover:gap-3 hover:text-[#E5C378]"
            >
              <span>Ver Galería Completa</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 overflow-hidden" aria-label="Galería de tragos y cortos">
          <div className="drinks-marquee flex w-max">
            {[0, 1].map((group) => (
              <div key={group} className="drinks-marquee-group flex shrink-0 gap-6 pr-6">
                {drinks.map((drink) => (
                  <Link
                    key={`${group}-${drink.alt}`}
                    to="/galeria"
                    className="luxury-card group block w-[min(78vw,360px)] shrink-0 overflow-hidden rounded-[2px] border border-[#C9A86A]/12"
                  >
                    <img
                      src={drink.src}
                      alt={drink.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover brightness-90 transition-all duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:brightness-110"
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
