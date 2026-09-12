import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/mamina/PageHeader";
import { Reveal } from "@/components/mamina/Reveal";
import { Check, ArrowRight } from "lucide-react";

import vip from "@/assets/zone-vip.jpg";
import bar from "@/assets/zone-bar.jpg";
import terraza from "@/assets/zone-terraza.jpg";
import cava from "@/assets/cava-1.jpg";

export const Route = createFileRoute("/experiencias")({
  head: () => ({
    meta: [
      { title: "Experiencias VIP y Territorios — Mamina Restobar (Ayacucho)" },
      {
        name: "description",
        content:
          "Descubre las áreas exclusivas de Mamina en Jr. José Olaya (Ayacucho): Mesas VIP Alabastro, Barra de Filigrana, Terraza Sky y el Salón Cava Privada.",
      },
    ],
  }),
  component: ExperienciasPage,
});

const ZONES_DETAILED = [
  {
    id: "vip",
    name: "Mesas VIP Alabastro",
    tagline: "Piedra de Huamanga retroiluminada en luz ámbar y terciopelo esmeralda",
    capacity: "4 a 12 personas",
    minSpend: "Desde S/ 800",
    img: vip,
    description:
      "Ubicadas en desnivel frente a la cabina de sonido. Diseñadas con frontis de Piedra de Huamanga (alabastro traslúcido) retroiluminado, sillones capitoné de terciopelo esmeralda y mesas de mármol negro veteado.",
    perks: [
      "Frontis de alabastro ayacuchano retroiluminado",
      "Anfitrión VIP dedicado durante toda la noche",
      "Ritual de botillería premium en mesa con bengalas",
      "Acceso directo sin fila ni espera en puerta",
    ],
  },
  {
    id: "barra",
    name: "Barra de Filigrana y Granito",
    tagline: "El escenario alquímico de la coctelería y botánicos andinos",
    capacity: "1 a 4 personas",
    minSpend: "Consumo libre a la carta",
    img: bar,
    description:
      "Una barra monolítica de 12 metros inspirada en la orfebrería tradicional de Huamanga. El asiento predilecto para degustar maceraciones de muña, cacao del VRAEM y coctelería experimental junto a los bartenders.",
    perks: [
      "Conversación directa con nuestro Head Bartender",
      "Cócteles fuera de carta con botánicos andinos exclusivos",
      "Servicio de piqueos y bocados al momento desde la brasa",
      "Servicio en cristalería Riedel pulida a mano",
    ],
  },
  {
    id: "terraza",
    name: "Terraza Sky Lounge",
    tagline: "Brisa andina, calentadores de diseño y cielo abierto",
    capacity: "6 a 16 personas",
    minSpend: "Desde S/ 600",
    img: terraza,
    description:
      "Ambiente al aire libre en nuestro nivel superior con sillones modulares, calentadores dorados y vista despejada a la noche estrellada de Ayacucho.",
    perks: [
      "Servicio de Shisha artesanal con esencias herbales y frutales",
      "Sonido acústico equilibrado para la conversación fluida",
      "Box privado con cortinas semi-translúcidas para mayor intimidad",
      "Servicio de cócteles de autor en cristalería de diseño",
    ],
  },
  {
    id: "cava",
    name: "Salón Cava Privada",
    tagline: "Máxima discreción para celebraciones íntimas y eventos ejecutivos",
    capacity: "8 a 22 personas",
    minSpend: "Desde S/ 1,500",
    img: cava,
    description:
      "Un santuario subterráneo rodeado de más de 400 etiquetas de vinos y single malts internacionales. Cuenta con control de iluminación regulable, acústica privada y sistema de sonido independiente.",
    perks: [
      "Sommelier privado exclusivo asignado a la sala",
      "Menú de degustación en 5 o 7 pasos diseñado a medida",
      "Privacidad absoluta con aislamiento acústico",
      "Pantalla oculta 4K para presentaciones privadas",
    ],
  },
];

function ExperienciasPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Territorios y Exclusividad"
        title="Zonas VIP"
        titleItalic="y Experiencias"
        description="Cada rincón de Mamina rinde homenaje a la nobleza de los materiales: desde la calidez traslúcida del Alabastro de Huamanga hasta la discreción absoluta de la Cava Privada."
        breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Experiencias VIP" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Asymmetric Zone Spreads */}
        <div className="space-y-24">
          {ZONES_DETAILED.map((z, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <Reveal key={z.id} delay={80}>
                <div
                  id={z.id}
                  className={`grid items-center gap-12 lg:grid-cols-12 ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Photo with Frame */}
                  <div
                    className={`overflow-hidden rounded-[1px] border border-[#C9A86A]/20 bg-[#121212] lg:col-span-6 ${
                      isReversed ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-4/3 overflow-hidden">
                      <img
                        src={z.img}
                        alt={z.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 rounded-[1px] border border-[#C9A86A]/40 bg-[#080808]/90 px-3 py-1 text-[10px] tracking-[0.2em] text-[#C9A86A] uppercase font-semibold backdrop-blur-md">
                        {z.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Details Spread */}
                  <div className={`space-y-6 lg:col-span-6 ${isReversed ? "lg:order-1" : ""}`}>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="eyebrow text-[#C9A86A]">{z.capacity}</span>
                        <span className="rounded-[1px] border border-[#C9A86A]/30 bg-[#121212] px-3 py-1 text-[11px] tracking-[0.2em] text-[#E5C378] uppercase font-semibold">
                          {z.minSpend}
                        </span>
                      </div>
                      <h2 className="mt-3 font-display text-white text-3xl sm:text-4xl">
                        {z.name}
                      </h2>
                      <p className="mt-1 text-xs text-[#E5C378] italic font-editorial">
                        {z.tagline}
                      </p>
                    </div>

                    <p className="text-[15px] leading-[1.7] text-[#D1D1CB]/80 font-light">
                      {z.description}
                    </p>

                    <div className="space-y-2 border-t border-[#C9A86A]/15 pt-5">
                      <p className="text-[10px] tracking-[0.2em] text-[#C9A86A] uppercase font-semibold">
                        Privilegios de la sala:
                      </p>
                      <ul className="space-y-2">
                        {z.perks.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-3 text-xs text-[#D1D1CB] font-light"
                          >
                            <Check
                              className="h-3.5 w-3.5 shrink-0 text-[#C9A86A]"
                              strokeWidth={2}
                            />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link to="/reservas" search={{ zone: z.id }} className="btn-primary">
                        <span>Reservar {z.name.split(" ")[0]}</span>
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </Link>
                      <a
                        href={`https://wa.me/51999888777?text=Hola%20Mamina,%20deseo%20m%C3%A1s%20detalles%20de%20la%20zona%20${encodeURIComponent(z.name)}%20en%20Ayacucho`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                      >
                        <span>Consultar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Private Event Full-Hire Banner */}
        <div className="mt-28 flex flex-col items-center justify-between gap-6 rounded-[1px] border border-[#C9A86A]/30 bg-gradient-to-r from-[#080808] via-[#121212] to-[#080808] p-10 text-center sm:text-left sm:flex-row">
          <div>
            <span className="eyebrow text-[#C9A86A]">Alquiler Completo de Sala</span>
            <h3 className="mt-2 text-white text-2xl sm:text-3xl font-display">
              ¿Deseas reservar el salón completo para un evento privado en Ayacucho?
            </h3>
            <p className="mt-2 text-xs leading-[1.7] text-[#7A7A75] font-light">
              Capacidad total de hasta 140 personas en Jr. José Olaya con catering cerrado, DJ
              exclusivo y seguridad privada.
            </p>
          </div>
          <Link to="/reservas" className="btn-primary shrink-0">
            <span>Solicitar Evento</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
