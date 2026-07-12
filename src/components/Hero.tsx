import { ChevronRight, ArrowRight } from 'lucide-react';
import desktopProduct from '../assets/hafaloha-orders-hero.webp';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] text-white">
      <div className="surface-grid absolute inset-0 opacity-30" />
      <div className="absolute left-1/3 top-0 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-32">
        <div>
          <div className="font-mono-label mb-7 flex items-center gap-3 text-xs text-blue-300">
            <span className="h-px w-8 bg-blue-400" /> Guam-built software studio
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Software built for how your business <span className="text-blue-400">actually works.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            We design and build custom platforms, AI applications, and mobile products for organizations in Guam and beyond.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-blue-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Discuss your project
              <ChevronRight className="ml-1 w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Explore selected work
              <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 border-y border-white/10 py-5">
            {[
              ['13+', 'Production apps'],
              ['4', 'AI systems live'],
              ['2', 'App Store launches'],
            ].map(([value, label]) => (
              <div key={label} className="pr-2">
                <div className="text-2xl font-bold text-white md:text-3xl">{value}</div>
                <div className="mt-1 text-[11px] leading-tight text-slate-400 sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-2xl lg:block" aria-label="Selected product interfaces">
          <div className="premium-shadow overflow-hidden rounded-xl border border-white/10 bg-slate-900 p-2">
            <div className="mb-2 flex gap-1.5 px-2 py-1">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-green-400/70" />
            </div>
            <img src={desktopProduct} alt="Hafaloha Orders desktop interface" className="aspect-[16/10] w-full rounded-md object-cover object-top" />
          </div>
          <div className="premium-shadow absolute -bottom-14 -right-3 w-[29%] overflow-hidden rounded-[1.6rem] border-[6px] border-slate-950 bg-slate-950">
            <img src="/images/mobile-hafaloha-orders.com.PNG" alt="Hafaloha Orders mobile interface" className="aspect-[9/18] w-full object-cover object-top" />
          </div>
          <div className="absolute -bottom-10 left-8 rounded-lg border border-white/10 bg-[#0d192d]/95 p-4 backdrop-blur">
            <div className="font-mono-label text-[10px] text-blue-300">Live-event reliability</div>
            <div className="mt-1 text-2xl font-bold">850+ orders</div>
            <div className="text-xs text-slate-400">Zero downtime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
