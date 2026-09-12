import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/mamina/Hero";
import { Menu } from "@/components/mamina/Menu";
import { Zones } from "@/components/mamina/Zones";
import { Agenda } from "@/components/mamina/Agenda";
import { Gallery } from "@/components/mamina/Gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mamina Restobar — Lujo nocturno, coctelería de autor y gastronomía en Ayacucho" },
      {
        name: "description",
        content:
          "Restobar y gastro lounge independiente en Jr. José Olaya (Local Las Flores), Ayacucho: coctelería de vanguardia, brasa, zonas VIP y sesiones en vivo.",
      },
      { property: "og:title", content: "Mamina Restobar — Lujo nocturno en Ayacucho" },
      {
        property: "og:description",
        content:
          "Mixología de autor, cocina de brasa, zonas VIP y música en vivo cada noche en Ayacucho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#080808]">
      <Hero />
      <Menu />
      <Zones />
      <Agenda />
      <Gallery />
    </div>
  );
}
