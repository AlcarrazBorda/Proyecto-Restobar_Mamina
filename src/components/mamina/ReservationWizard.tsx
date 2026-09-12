import { useState, useEffect, useRef } from "react";
import { useSearch } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Bookmark,
  Mail,
  User,
  Phone,
  Copy,
  Check,
  RotateCcw,
  Printer,
} from "lucide-react";
import { toast } from "sonner";

interface ZoneOption {
  id: string;
  name: string;
  minGuests: number;
  maxGuests: number;
  minSpend?: string;
  perks: string[];
  description: string;
}

const ZONES: ZoneOption[] = [
  {
    id: "vip",
    name: "Mesa VIP Alabastro",
    minGuests: 4,
    maxGuests: 12,
    minSpend: "S/ 800",
    perks: [
      "Frontis de Piedra de Huamanga retroiluminada",
      "Anfitrión dedicado y botillería premium",
      "Ingreso preferente sin fila",
    ],
    description:
      "Sofás de terciopelo esmeralda y muro de alabastro ayacuchano con vista a la cabina del DJ.",
  },
  {
    id: "barra",
    name: "Barra Central de Filigrana",
    minGuests: 1,
    maxGuests: 4,
    minSpend: "Consumo libre",
    perks: [
      "Degustación con botánicos andinos",
      "Conversación con el Head Bartender",
      "Servicio en cristalería Riedel",
    ],
    description: "Frente al espectáculo de mixología, muña y cacao del VRAEM a la minuta.",
  },
  {
    id: "terraza",
    name: "Terraza Sky y Lounge Boxes",
    minGuests: 4,
    maxGuests: 16,
    minSpend: "S/ 600",
    perks: ["Box climatizado", "Servicio de shisha de autor", "Cielo andino despejado"],
    description: "Ambiente al aire libre con iluminación tenue, calentadores y sonido envolvente.",
  },
  {
    id: "cava",
    name: "Salón Cava Privada",
    minGuests: 8,
    maxGuests: 20,
    minSpend: "S/ 1,500",
    perks: ["Sommelier privado", "Menú degustación 5 pasos", "Sistema de audio independiente"],
    description:
      "Máxima exclusividad rodeado de nuestra colección de single malts y etiquetas de guarda.",
  },
];

const SHIFTS = [
  {
    id: "gastro",
    name: "Primer Turno · Gastro Experience",
    hours: "19:00 — 22:15",
    desc: "Cena de autor con tempo pausado, maridajes de coctelería y música lounge sutil.",
  },
  {
    id: "nightclub",
    name: "Segundo Turno · Night Lounge y Beats",
    hours: "22:30 — 03:00",
    desc: "Energía en ascenso, DJ sets en vivo, botillería premium y atmósfera de celebración.",
  },
];

const TIME_SLOTS = Array.from({ length: 19 }, (_, index) => {
  const totalMinutes = 18 * 60 + index * 30;
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("es-PE", { weekday: "short" });
const DAY_FORMATTER = new Intl.DateTimeFormat("es-PE", { day: "numeric" });
const MONTH_FORMATTER = new Intl.DateTimeFormat("es-PE", { month: "short" });

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateValue(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekDates(value: string) {
  const selectedDate = parseDate(value);
  const dayOfWeek = selectedDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(selectedDate);
  monday.setDate(selectedDate.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const dateValue = new Date(monday);
    dateValue.setDate(monday.getDate() + index);
    return dateValue;
  });
}

const OCCASIONS = [
  "Noche de Amigos y Cócteles",
  "Celebración de Cumpleaños (Ritual de bengala)",
  "Cita Romántica / Aniversario",
  "Cena de Negocios / Executive",
  "After-Work de Lujo",
  "Experiencia de Degustación y Cava",
];

interface BookingConfirmation {
  code: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  shiftName: string;
  guests: string;
  zoneName: string;
  minSpend?: string;
  occasion: string;
  notes?: string;
  createdAt: string;
}

export function ReservationWizard() {
  const search = useSearch({ strict: false }) as {
    date?: string;
    guests?: string;
    zone?: string;
  };

  const dateInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState(() => {
    if (search.date) return search.date;
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("23:00");
  const [guests, setGuests] = useState(() => search.guests || "4");
  const [selectedZone, setSelectedZone] = useState(() => search.zone || "vip");
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingConfirmation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (search.date) setDate(search.date);
    if (search.guests) setGuests(search.guests);
    if (search.zone) setSelectedZone(search.zone);
  }, [search]);

  const currentZone = ZONES.find((z) => z.id === selectedZone) || ZONES[0];
  const currentShift = time >= "22:30" ? SHIFTS[1] : SHIFTS[0];
  const weekDates = getWeekDates(date);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Por favor ingresa el nombre del titular de la reserva.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Por favor ingresa un número de teléfono o celular.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const bookingData: BookingConfirmation = {
        code: `MAM-AYAC-${randomId}`,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        date,
        time,
        shiftName: currentShift.name,
        guests,
        zoneName: currentZone.name,
        minSpend: currentZone.minSpend,
        occasion,
        notes: notes.trim() || undefined,
        createdAt: new Date().toLocaleDateString("es-PE", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      try {
        const stored = localStorage.getItem("mamina_bookings");
        const bookingsList = stored ? JSON.parse(stored) : [];
        bookingsList.push(bookingData);
        localStorage.setItem("mamina_bookings", JSON.stringify(bookingsList));
      } catch (err) {
        console.error("Error saving booking locally:", err);
      }

      setConfirmedBooking(bookingData);
      setIsSubmitting(false);
      toast.success("¡Reservación registrada y confirmada en sistema!");
    }, 600);
  };

  const copyCode = () => {
    if (!confirmedBooking) return;
    void navigator.clipboard.writeText(confirmedBooking.code);
    setCopiedCode(true);
    toast.info("Código de reserva copiado al portapapeles");
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
  };

  // SUCCESS CONFIRMATION VIEW
  if (confirmedBooking) {
    return (
      <div className="mx-auto max-w-3xl animate-fade-in">
        <div className="luxury-card overflow-hidden rounded-[2px] p-8 shadow-[var(--shadow-deep)] backdrop-blur-2xl sm:p-12">
          {/* Header Badge */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A86A]/40 bg-[#C9A86A]/10 text-[#C9A86A] shadow-[var(--shadow-glow)]">
              <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <span className="eyebrow mt-5 block text-[#C9A86A]">
              Reservación Confirmada en Sistema
            </span>
            <h2 className="mt-2 text-white text-3xl sm:text-4xl">¡Tu experiencia está lista!</h2>
            <p className="mt-2 text-xs text-[#7A7A75]">
              Hemos registrado tu reserva para Mamina Restobar en Jr. José Olaya (Ayacucho).
            </p>
          </div>

          {/* Booking Code Callout */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[2px] border border-[#C9A86A]/30 bg-[#080808] p-5 text-center sm:flex-row sm:text-left">
            <div>
              <span className="text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
                Código Único de Reservación
              </span>
              <p className="font-display text-3xl tracking-wider text-[#C9A86A]">
                {confirmedBooking.code}
              </p>
            </div>
            <button type="button" onClick={copyCode} className="btn-secondary py-2 px-5 text-xs">
              {copiedCode ? (
                <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
              ) : (
                <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
              )}
              <span>{copiedCode ? "Copiado" : "Copiar Código"}</span>
            </button>
          </div>

          {/* Breakdown Details */}
          <div className="mt-8 space-y-4 rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-6 text-xs text-[#D1D1CB] sm:text-sm">
            <div className="flex justify-between border-b border-[#C9A86A]/10 pb-3">
              <span className="text-[#7A7A75]">Titular:</span>
              <span className="font-medium text-white">{confirmedBooking.name}</span>
            </div>
            <div className="flex justify-between border-b border-[#C9A86A]/10 pb-3">
              <span className="text-[#7A7A75]">Fecha y Hora:</span>
              <span className="font-medium text-white">
                {confirmedBooking.date} · {confirmedBooking.time} hrs
              </span>
            </div>
            <div className="flex justify-between border-b border-[#C9A86A]/10 pb-3">
              <span className="text-[#7A7A75]">Turno:</span>
              <span className="font-medium text-white">{confirmedBooking.shiftName}</span>
            </div>
            <div className="flex justify-between border-b border-[#C9A86A]/10 pb-3">
              <span className="text-[#7A7A75]">Invitados:</span>
              <span className="font-medium text-white">{confirmedBooking.guests} personas</span>
            </div>
            <div className="flex justify-between border-b border-[#C9A86A]/10 pb-3">
              <span className="text-[#7A7A75]">Zona Asignada:</span>
              <span className="font-medium text-[#C9A86A]">{confirmedBooking.zoneName}</span>
            </div>
            <div className="flex justify-between border-b border-[#C9A86A]/10 pb-3">
              <span className="text-[#7A7A75]">Motivo:</span>
              <span className="font-medium text-white">{confirmedBooking.occasion}</span>
            </div>
            {confirmedBooking.notes && (
              <div className="flex justify-between border-b border-[#C9A86A]/10 pb-3">
                <span className="text-[#7A7A75]">Peticiones Especiales:</span>
                <span className="font-medium text-white text-right">{confirmedBooking.notes}</span>
              </div>
            )}
            <div className="flex justify-between pt-1">
              <span className="text-[#7A7A75]">Ubicación:</span>
              <span className="font-medium text-[#C9A86A]">
                Jr. José Olaya (Local Las Flores) · Ayacucho
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={() => window.print()} className="btn-secondary">
              <Printer className="h-4 w-4" strokeWidth={1.5} />
              <span>Imprimir / Guardar</span>
            </button>

            <button type="button" onClick={resetForm} className="btn-primary">
              <RotateCcw className="h-4 w-4 text-[#080808]" strokeWidth={1.5} />
              <span>Hacer otra reservación</span>
            </button>
          </div>

          <div className="mt-8 border-t border-[#C9A86A]/10 pt-4 text-center">
            <p className="text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
              Tolerancia de espera: 15 minutos · Código de vestimenta: Smart Casual / Elegant
            </p>
          </div>
        </div>
      </div>
    );
  }

  // BOOKING FORM VIEW
  return (
    <form onSubmit={handleBookingSubmit} className="grid gap-12 lg:grid-cols-12">
      {/* Form Steps */}
      <div className="space-y-10 lg:col-span-7">
        {/* Date, Time and Guests */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-[#C9A86A]/40 text-xs font-semibold text-[#C9A86A]">
              1
            </span>
            <h3 className="text-sm tracking-[0.2em] text-white uppercase font-semibold">
              Elige tu fecha y horario
            </h3>
          </div>
          <div className="relative flex items-center justify-between rounded-[2px] border border-[#C9A86A]/20 bg-[#121212] p-4">
            <div>
              <span className="eyebrow text-[#C9A86A]">Semana disponible</span>
              <p className="mt-1 text-sm text-white">
                {MONTH_FORMATTER.format(parseDate(date))} {parseDate(date).getFullYear()}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dateInputRef.current?.showPicker()}
              className="btn-secondary relative z-10 px-4 py-2 text-xs"
            >
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>Elegir otra fecha</span>
            </button>
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              min={formatDateValue(new Date())}
              required
              aria-label="Seleccionar otra fecha"
              onChange={(e) => setDate(e.target.value)}
              className="pointer-events-none absolute h-px w-px opacity-0"
              tabIndex={-1}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {weekDates.map((weekDate) => {
              const dateValue = formatDateValue(weekDate);
              const isSelected = dateValue === date;
              return (
                <button
                  key={dateValue}
                  type="button"
                  onClick={() => setDate(dateValue)}
                  className={`flex min-h-20 flex-col items-center justify-center rounded-[2px] border p-2 transition-all ${
                    isSelected
                      ? "border-[#C9A86A] bg-[#C9A86A]/15 text-[#E5C378] shadow-[var(--shadow-glow)]"
                      : "border-[#C9A86A]/15 bg-[#121212] text-[#D1D1CB] hover:border-[#C9A86A]/40"
                  }`}
                >
                  <span className="text-[10px] tracking-[0.15em] uppercase">
                    {WEEKDAY_FORMATTER.format(weekDate).replace(".", "")}
                  </span>
                  <span className="mt-1 font-display text-2xl">{DAY_FORMATTER.format(weekDate)}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-4">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
              <Clock className="h-3.5 w-3.5 text-[#C9A86A]" strokeWidth={1.5} /> Horarios disponibles
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`rounded-[2px] border px-2 py-2.5 text-xs transition-all ${
                    time === slot
                      ? "border-[#C9A86A] bg-[#C9A86A]/15 text-[#E5C378]"
                      : "border-[#C9A86A]/15 text-[#D1D1CB] hover:border-[#C9A86A]/40"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#7A7A75]">Atención continua de 18:00 a 03:00.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="hidden sm:block" />
            <label className="flex flex-col gap-2 rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-4 sm:col-start-3">
              <span className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
                <Users className="h-3.5 w-3.5 text-[#C9A86A]" strokeWidth={1.5} /> Personas
              </span>
              <input
                type="number"
                min={1}
                max={30}
                value={guests}
                required
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-sm text-[#D1D1CB] outline-none focus:text-[#C9A86A]"
              />
            </label>
          </div>
        </div>

        {/* Zone Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-[#C9A86A]/40 text-xs font-semibold text-[#C9A86A]">
              2
            </span>
            <h3 className="text-sm tracking-[0.2em] text-white uppercase font-semibold">
              Selecciona tu Territorio
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setSelectedZone(z.id)}
                className={`rounded-[2px] border p-4 text-left transition-all cursor-pointer ${
                  selectedZone === z.id
                    ? "border-[#C9A86A] bg-[#C9A86A]/10 shadow-[var(--shadow-glow)]"
                    : "border-[#C9A86A]/15 bg-[#121212] hover:border-[#C9A86A]/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-white">{z.name}</span>
                  <span className="text-[11px] text-[#C9A86A] font-semibold">{z.minSpend}</span>
                </div>
                <p className="mt-1 text-xs text-[#7A7A75] leading-[1.5]">{z.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Occasion and Guest info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-[#C9A86A]/40 text-xs font-semibold text-[#C9A86A]">
              3
            </span>
            <h3 className="text-sm tracking-[0.2em] text-white uppercase font-semibold">
              Datos del Titular
            </h3>
          </div>
          <div className="space-y-3">
            <label className="block rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-4">
              <span className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
                <Bookmark className="h-3.5 w-3.5 text-[#C9A86A]" strokeWidth={1.5} /> Motivo u
                Ocasión
              </span>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="mt-2 w-full bg-[#121212] text-sm text-[#D1D1CB] outline-none focus:text-[#C9A86A]"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-4">
                <span className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
                  <User className="h-3.5 w-3.5 text-[#C9A86A]" strokeWidth={1.5} /> Nombre completo
                  *
                </span>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full bg-transparent text-sm text-[#D1D1CB] placeholder-[#7A7A75] outline-none focus:text-[#C9A86A]"
                />
              </label>

              <label className="block rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-4">
                <span className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
                  <Phone className="h-3.5 w-3.5 text-[#C9A86A]" strokeWidth={1.5} /> Teléfono o
                  Celular *
                </span>
                <input
                  type="tel"
                  required
                  placeholder="987 654 321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full bg-transparent text-sm text-[#D1D1CB] placeholder-[#7A7A75] outline-none focus:text-[#C9A86A]"
                />
              </label>
            </div>

            <label className="block rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-4">
              <span className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
                <Mail className="h-3.5 w-3.5 text-[#C9A86A]" strokeWidth={1.5} /> Correo Electrónico
                (Opcional)
              </span>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full bg-transparent text-sm text-[#D1D1CB] placeholder-[#7A7A75] outline-none focus:text-[#C9A86A]"
              />
            </label>

            <label className="block rounded-[2px] border border-[#C9A86A]/15 bg-[#121212] p-4">
              <span className="text-[11px] tracking-[0.2em] text-[#7A7A75] uppercase font-medium">
                Peticiones especiales, alergias o botellas preferidas
              </span>
              <textarea
                rows={2}
                placeholder="Indícanos si requieres servicio de descorche, bengalas de cumpleaños o marcas específicas de destilados..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 w-full resize-none bg-transparent text-sm text-[#D1D1CB] placeholder-[#7A7A75] outline-none focus:text-[#C9A86A]"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Summary Card and In-App Submit */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 luxury-card p-8 shadow-[var(--shadow-deep)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-[#C9A86A]/15 pb-5">
            <div>
              <span className="eyebrow">Resumen de Experiencia</span>
              <h4 className="mt-1 font-display text-2xl text-white">Mamina Restobar</h4>
            </div>
            <span className="rounded-[2px] border border-[#C9A86A]/40 px-3 py-1 text-[11px] tracking-[0.2em] text-[#C9A86A] uppercase font-semibold">
              Ayacucho VIP
            </span>
          </div>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-[#7A7A75]">
              <span>Turno:</span>
              <span className="font-medium text-white">{currentShift.name.split("·")[0]}</span>
            </div>
            <div className="flex justify-between text-[#7A7A75]">
              <span>Fecha y hora:</span>
              <span className="font-medium text-white">
                {date} · {time} hrs
              </span>
            </div>
            <div className="flex justify-between text-[#7A7A75]">
              <span>Invitados:</span>
              <span className="font-medium text-white">{guests} personas</span>
            </div>
            <div className="flex justify-between text-[#7A7A75]">
              <span>Zona elegida:</span>
              <span className="font-medium text-[#C9A86A]">{currentZone.name}</span>
            </div>
            <div className="flex justify-between text-[#7A7A75]">
              <span>Consumo sugerido:</span>
              <span className="font-medium text-white">{currentZone.minSpend}</span>
            </div>
          </div>

          <div className="gold-rule my-6" />

          <div>
            <span className="text-[11px] tracking-[0.2em] text-[#C9A86A] uppercase font-semibold">
              Beneficios en tu zona:
            </span>
            <ul className="mt-3 space-y-2">
              {currentZone.perks.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-xs text-[#D1D1CB]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#C9A86A]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Functional In-App Booking Button */}
          <div className="mt-8 space-y-3">
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? (
                <span>Registrando en Sistema...</span>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-[#080808]" strokeWidth={1.5} />
                  <span>Confirmar Reservación</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-[#7A7A75]">
              Registro directo e instantáneo en el sistema de sala de Mamina (Jr. José Olaya).
            </p>
          </div>

          <div className="mt-6 border-t border-[#C9A86A]/10 pt-4 text-center">
            <p className="text-[11px] tracking-[0.2em] text-[#C9A86A]/80 uppercase font-medium">
              Código de Vestimenta: Smart Casual / Elegant · Reserva Recomendada
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
