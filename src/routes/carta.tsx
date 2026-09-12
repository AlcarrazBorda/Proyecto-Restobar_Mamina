import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/mamina/PageHeader";
import { Reveal } from "@/components/mamina/Reveal";
import { Search, ArrowRight, Sparkles } from "lucide-react";

import mix1 from "@/assets/mix-1.jpg";
import mix2 from "@/assets/mix-2.jpg";
import mix3 from "@/assets/mix-3.jpg";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import cava1 from "@/assets/cava-1.jpg";
import cava2 from "@/assets/cava-2.jpg";

export const Route = createFileRoute("/carta")({
  head: () => ({
    meta: [
      { title: "La Carta y Mixología de Origen — Mamina Restobar (Ayacucho)" },
      {
        name: "description",
        content:
          "Explora la carta de coctelería con botánicos andinos, cocina de brasa al molle y cava de destilados selectos de Mamina Restobar en Jr. José Olaya, Ayacucho.",
      },
    ],
  }),
  component: CartaPage,
});

type MenuItem = {
  id: string;
  name: string;
  category: "cocteleria" | "brasa" | "cava";
  price: string;
  subtitle: string;
  ingredients: string;
  notes: string;
  pairing?: string;
  badge?: string;
  img: string;
};

const MENU_ITEMS: MenuItem[] = [
  // COCTELERÍA DE ORIGEN
  {
    id: "huamanga-velvet",
    name: "Huamanga Velvet",
    category: "cocteleria",
    price: "S/ 48",
    subtitle: "Gin andino · Muña negra silvestre · Molle de Huanta",
    ingredients:
      "Gin botánico infusionado en frío con muña de altura, vermut rosso artesanal, perfume de pimienta de molle huantino y corteza de cítrico asada.",
    notes:
      "Aroma balsámico andino de alta frescura. Estructura sedosa en boca con un final seco, especiado y elegante.",
    pairing: "Wagyu al Fuego de Molle",
    badge: "Insignia",
    img: mix1,
  },
  {
    id: "cacao-vraem",
    name: "Cacao VRAEM 70% Ahumado",
    category: "cocteleria",
    price: "S/ 54",
    subtitle: "Mezcal artesanal · Nibs de Chungui · Humo de eucalipto",
    ingredients:
      "Destilado artesanal macerado con granos de cacao orgánico fino de aroma del VRAEM (Chungui), licor de damasco andino y campana de humo de madera noble.",
    notes:
      "Complejidad envolvente: notas a chocolate amargo tostado, caramelo quemado y un retrogusto mineral profundo.",
    pairing: "Tiradito Trucha de Altura",
    badge: "Ahumado",
    img: mix2,
  },
  {
    id: "oro-de-huamanga",
    name: "Oro de Huamanga 24k",
    category: "cocteleria",
    price: "S/ 46",
    subtitle: "Pisco Mosto Verde · Tuna de Cangallo · Oro puro",
    ingredients:
      "Pisco mosto verde de guarda, reducción artesanal de tuna roja de Cangallo, miel de agave andino (miski) y lámina flotante de oro comestible de 24 quilates.",
    notes:
      "Textura aterciopelada, destellos cítricos brillantes y final dulce y seductor con reflejos dorados.",
    pairing: "Causa Real con Ají Huamanguino",
    badge: "24 Quilates",
    img: mix3,
  },
  {
    id: "negroni-trufado",
    name: "Negroni Alquimia Trufado",
    category: "cocteleria",
    price: "S/ 55",
    subtitle: "Campari clarificado · Aceite de trufa blanca · Sweet Vermouth",
    ingredients:
      "Gin London Dry lavado en aceite de trufa blanca, Campari clarificado y vermut Carpano Antica Formula sobre hielo tallado.",
    notes:
      "Potencia umami de alta elegancia. Complejo, untuoso y con un final infinitamente largo.",
    pairing: "Gyozas de Pato y Foie",
    img: mix1,
  },

  // COCINA Y BRASA
  {
    id: "tiradito-trucha",
    name: "Tiradito Trucha de Altura y Tumbo",
    category: "brasa",
    price: "S/ 68",
    subtitle: "Trucha asalmonada andina · Leche de tigre de tumbo",
    ingredients:
      "Corte fino de trucha de aguas frías andinas, reducción de tumbo silvestre, quinua negra crocante, brotes orgánicos y caviar de trufa.",
    notes:
      "Servido sobre placa de piedra volcánica templada a 4 °C para conservar la tersura extrema del corte.",
    pairing: "Cacao VRAEM 70%",
    badge: "Crudo de Origen",
    img: food1,
  },
  {
    id: "wagyu-molle",
    name: "Wagyu al Fuego de Molle MB5",
    category: "brasa",
    price: "S/ 98",
    subtitle: "Robata al carbón Binchotan · Reducción de jora y molle",
    ingredients:
      "Cortes selectos de Wagyu MB5 sellados al carbón japonés, glaseado dulce de chicha de jora reducida, pimienta de molle de Huanta y sal de Maras.",
    notes: "Grasa infiltrada noble que se funde en boca con el toque amaderado del molle andino.",
    pairing: "Huamanga Velvet",
    badge: "Signature Brasa",
    img: food2,
  },
  {
    id: "causa-huamanguina",
    name: "Causa Real con Ají Huamanguino",
    category: "brasa",
    price: "S/ 62",
    subtitle: "Papa amarilla de altura · Cangrejo popa fresco",
    ingredients:
      "Papa amarilla prensada a mano con ají amarillo asado confitado, pulpa fresca de cangrejo, gel de huacatay silvestre y crocante de maíz chulpi.",
    notes: "Reinterpretación contemporánea de la tradición peruana con acento de alta noche.",
    pairing: "Oro de Huamanga 24k",
    img: food1,
  },
  {
    id: "gyozas-pato",
    name: "Gyozas de Pato Confitado y Foie",
    category: "brasa",
    price: "S/ 58",
    subtitle: "Masa artesanal dorada · Reducción de sauco y oporto",
    ingredients:
      "Relleno de confit de pato cocido a baja temperatura durante 12 horas, trozos de foie gras, cebollín andino y salsa ponzu trufada con sauco.",
    notes: "Equilibrio supremo entre la untuosidad del foie y el toque punzante frutal del sauco.",
    pairing: "Negroni Alquimia Trufado",
    img: food2,
  },

  // CAVA Y DESTILADOS
  {
    id: "single-malts",
    name: "Reserva de Single Malts y Rare Casks",
    category: "cava",
    price: "Desde S/ 85",
    subtitle: "Macallan 18 · Hibiki Japanese Harmony · Lagavulin 16",
    ingredients:
      "Servicio de alta etiqueta presentado en cristalería Riedel con diamante de hielo tallado a mano de pureza cristalina 100%.",
    notes: "Acompañado de agua de manantial andino y pipeta de cristal para apertura de aromas.",
    badge: "Colección Cava",
    img: cava1,
  },
  {
    id: "champagne-rituals",
    name: "Ritual Champagne y Bengalas VIP",
    category: "cava",
    price: "Desde S/ 420",
    subtitle: "Dom Pérignon Vintage · Veuve Clicquot Ponsardin · Armand de Brignac",
    ingredients:
      "Servicio en mesa con hielera retroiluminada de cristal ahumado, cortejo con luces de bengala y copas grabadas.",
    notes: "El ritual predilecto de las mesas VIP para festejos y aniversarios memorables.",
    badge: "VIP Ritual",
    img: cava2,
  },
  {
    id: "vinos-guarda",
    name: "Vinos de Guarda y Parcelas Únicas",
    category: "cava",
    price: "Desde S/ 160",
    subtitle: "Etiquetas premiadas de Mendoza, Ribera del Duero y Priorat",
    ingredients:
      "Selección curada por el Sommelier residente. Incluye añadas históricas con decantación y servicio a temperatura calibrada.",
    notes: "Maridaje guiado paso a paso con los cortes de robata y piqueos del chef.",
    img: cava1,
  },
];

const CATEGORIES = [
  { id: "todos", label: "Toda la Carta" },
  { id: "cocteleria", label: "Mixología de Autor" },
  { id: "brasa", label: "Cocina y Brasa" },
  { id: "cava", label: "Cava y Destilados" },
];

function MenuShowcase({ item }: { item: MenuItem }) {
  return (
    <div className="sticky top-28">
      <Reveal delay={50}>
        <div className="luxury-card overflow-hidden border border-[#C9A86A]/20 bg-[#121212]">
          <div className="relative aspect-4/3 overflow-hidden">
            <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            {item.badge && (
              <span className="absolute top-4 left-4 rounded-[1px] border border-[#C9A86A]/40 bg-[#080808]/90 px-3 py-1 text-[10px] tracking-[0.2em] text-[#C9A86A] uppercase font-semibold backdrop-blur-md">
                {item.badge}
              </span>
            )}
          </div>

          <div className="p-8 pt-4">
            <div className="flex items-baseline justify-between">
              <h3 className="text-white text-2xl font-display">{item.name}</h3>
              <span className="text-sm font-semibold tracking-widest text-[#E5C378]">
                {item.price}
              </span>
            </div>

            <p className="mt-1 text-xs text-[#E5C378] italic font-editorial">{item.subtitle}</p>
            <div className="gold-rule my-4 opacity-40" />

            <div className="space-y-2 text-xs leading-[1.6] text-[#D1D1CB]/80 font-light">
              <p>
                <strong className="text-[#C9A86A] uppercase tracking-[0.2em] text-[10px] block font-semibold not-italic">
                  Perfil de Sabor:
                </strong>{" "}
                {item.notes}
              </p>
              {item.pairing && (
                <p className="pt-2 text-[#E5C378] italic font-editorial text-sm">
                  <strong className="tracking-[0.2em] text-[10px] uppercase not-italic text-[#C9A86A] block font-semibold font-sans">
                    Sugerencia de Maridaje:
                  </strong>{" "}
                  {item.pairing}
                </p>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#C9A86A]/10 flex items-center justify-between">
              <Link to="/reservas" className="btn-primary text-[10px] py-2.5 px-6">
                <span>Degustar en Sala</span>
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <span className="text-[10px] tracking-[0.2em] text-[#7A7A75] uppercase">
                Ayacucho VIP
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function CartaPage() {
  const [selectedCat, setSelectedCat] = useState("todos");
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCat === "todos" || item.category === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.ingredients.toLowerCase().includes(search.toLowerCase()) ||
      item.notes.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader
        eyebrow="Gastro Lounge & Mixología de Origen"
        title="La Carta"
        titleItalic="de Autor"
        description="Una curaduría gastronómica y de coctelería concebida para la noche en Ayacucho. Botánicos autóctonos (muña, molle de Huanta, cacao VRAEM), brasas al carbón binchotan y destilados de colección."
        breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "La Carta" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Editorial Controls: Category Filter Tabs and Search Bar */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-[#C9A86A]/15 pb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={isActive ? "btn-tab-active" : "btn-tab-inactive"}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-[#C9A86A]"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Buscar botánico, corte o destilado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[1px] border border-[#C9A86A]/25 bg-[#121212] py-2.5 pr-4 pl-9 text-xs text-[#D1D1CB] placeholder-[#7A7A75] outline-none transition-colors focus:border-[#C9A86A]"
            />
          </div>
        </div>

        {/* Editorial Split Showcase (Awwwards Style) */}
        {filteredItems.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl text-[#7A7A75]">
              No se encontraron creaciones con ese término.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCat("todos");
              }}
              className="mt-4 text-xs tracking-[0.2em] text-[#C9A86A] uppercase underline font-semibold cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="mt-12 space-y-20">
            {CATEGORIES.filter((category) => category.id !== "todos")
              .filter((category) => selectedCat === "todos" || selectedCat === category.id)
              .map((category) => {
                const categoryItems = filteredItems.filter((item) => item.category === category.id);
                const showcaseItem = MENU_ITEMS.find((item) => item.category === category.id);
                const isExpanded = expandedCategories.includes(category.id);
                const visibleItems = isExpanded ? categoryItems : categoryItems.slice(0, 3);
                const isImageLeft = category.id === "brasa";

                if (!showcaseItem || categoryItems.length === 0) return null;

                return (
                  <section key={category.id} className="grid gap-12 lg:grid-cols-12 lg:items-start">
                    <div className={`space-y-4 lg:col-span-7 ${isImageLeft ? "lg:order-2" : ""}`}>
                      <div className="flex items-end justify-between gap-4 px-6">
                        <div>
                          <p className="eyebrow">Selección Mamina</p>
                          <h2 className="mt-2 font-display text-2xl text-white">
                            {category.label}
                          </h2>
                        </div>
                        <span className="text-[10px] tracking-[0.2em] text-[#7A7A75] uppercase">
                          {categoryItems.length} creaciones
                        </span>
                      </div>

                      {visibleItems.map((item) => (
                        <div
                          key={item.id}
                          className="border-b border-[#C9A86A]/10 p-6 transition-colors hover:bg-[#121212]/40"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <h3 className="font-display text-xl text-white">{item.name}</h3>
                              {item.badge && (
                                <span className="rounded-[1px] border border-[#C9A86A]/30 bg-[#080808] px-2 py-0.5 text-[9px] tracking-[0.2em] text-[#C9A86A] uppercase font-semibold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-semibold tracking-widest text-[#C9A86A]">
                              {item.price}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-[#D1D1CB]/70 font-light leading-[1.6]">
                            {item.ingredients}
                          </p>
                          <div className="mt-3 text-[10px] text-[#7A7A75] tracking-wider uppercase">
                            {item.subtitle}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCategories((current) =>
                            isExpanded
                              ? current.filter((id) => id !== category.id)
                              : [...current, category.id],
                          )
                        }
                        className="btn-secondary mt-2 ml-6"
                      >
                        <span>{isExpanded ? "Ver menos" : "Ver más"}</span>
                        <ArrowRight
                          className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-[-90deg]" : ""}`}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>

                    <div className={`lg:col-span-5 ${isImageLeft ? "lg:order-1" : ""}`}>
                      <MenuShowcase item={showcaseItem} />
                    </div>
                  </section>
                );
              })}
          </div>
        )}

        {/* Private Tasting Banner */}
        <div className="mt-24 rounded-[1px] border border-[#C9A86A]/20 bg-gradient-to-r from-[#121212] via-[#080808] to-[#121212] p-10 text-center backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 text-[#C9A86A]">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            <span className="eyebrow">Experiencias Personalizadas</span>
          </div>
          <h2 className="mt-3 text-white text-3xl sm:text-4xl font-display">
            Catas Privadas y Menús a Medida
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xs leading-[1.7] text-[#7A7A75] font-light">
            Nuestro Sommelier y Head Bartender diseñan maridajes exclusivos para grupos y ocasiones
            especiales en Jr. José Olaya con botánicos locales y cortes a la brasa.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/reservas" className="btn-primary">
              <span>Solicitar Cata Privada</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
