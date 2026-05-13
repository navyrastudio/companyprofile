import clientsData from "@/data/clients.json";

type Client = { id: number; name: string; logo: string };

// Duplicate array to create seamless infinite loop
const clients = clientsData as Client[];
const ticker = [...clients, ...clients];

export default function ClientsSection() {
  return (
    <section className="py-16 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        {/* Header */}
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-slate-100" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 shrink-0">
            Dipercaya oleh klien kami
          </span>
          <span className="h-px flex-1 bg-slate-100" />
        </div>
      </div>

      {/* Marquee track — full bleed, no container constraint */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-white to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-white to-transparent" />

        {/* Scrolling strip */}
        <div className="overflow-hidden">
          <div className="animate-marquee gap-10 items-center">
            {ticker.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="shrink-0 flex items-center justify-center h-12 px-8 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-default"
                title={client.name}
              >
                <span className="text-sm font-semibold text-slate-500 tracking-wide whitespace-nowrap select-none">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
