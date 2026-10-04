import { services, techStack } from '../data';

export default function Services() {
  return (
    <section id="services" className="relative bg-[var(--surface-soft)] site-section">
      <div className="relative z-10 site-container">
        <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono-label section-label">Capabilities</p>
            <h2 className="mt-4 section-title">
              Useful technology, shaped around your business.
            </h2>
          </div>
          <p className="max-w-2xl section-intro lg:justify-self-end">
            We can help with your website, a manual process, or the tools your team already uses. Start with one useful improvement and a scope that fits your needs.
          </p>
        </div>

        <div className="mt-6 divide-y divide-slate-200 border-b border-slate-200">
          {services.map((service, index) => (
            <article key={service.title} className="grid gap-3 py-6 md:grid-cols-[50px_0.8fr_1.2fr] md:items-start md:gap-8">
              <span className="font-mono-label text-xs text-slate-600">0{index + 1}</span>
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
