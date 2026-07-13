import { services, techStack } from '../data';

export default function Services() {
  return (
    <section id="services" className="relative bg-[#f7f8fa] py-16 md:py-24 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono-label text-xs text-blue-600">Capabilities</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
              From operational problem to production software.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">
            Strategy, design, engineering, and long-term support from one Guam-based team. We focus on useful systems that earn their place in the day-to-day operation.
          </p>
        </div>

        <div className="mt-6 divide-y divide-slate-200 border-b border-slate-200">
          {services.map((service, index) => (
            <article key={service.title} className="grid gap-4 py-7 md:grid-cols-[80px_0.65fr_1.35fr] md:items-start md:gap-8 md:py-9">
              <span className="font-mono-label text-xs text-slate-400">0{index + 1}</span>
              <h3 className="text-xl font-bold text-slate-950 md:text-2xl">{service.title}</h3>
              <p className="max-w-2xl leading-relaxed text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[220px_1fr] md:items-start">
          <p className="font-mono-label pt-2 text-xs text-slate-500">Production toolkit</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {techStack.map((tech) => (
              <span key={tech} className="text-sm font-semibold text-slate-500">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
