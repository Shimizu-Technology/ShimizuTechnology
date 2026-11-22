import { ArrowRight } from "lucide-react";
import SectionMark from "./SectionMark";
import { services, techStack } from "../data";
import { resolveContactTopic, selectContactTopic } from "../lib/contactTopic";

export default function Services() {
  return (
    <section id="services" className="relative bg-[var(--surface-soft)] site-section">
      <div className="relative z-10 site-container">
        <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono-label section-label marked-label">
              <SectionMark />Capabilities
            </p>
            <h2 className="mt-4 section-title">
              Useful technology, shaped around your business.
            </h2>
          </div>
          <p className="section-intro lg:justify-self-end">
            We can help with your website, a manual process, or the tools your team already uses. Start with one useful improvement and a scope that fits your needs.
          </p>
        </div>

        <div className="mt-6 divide-y divide-slate-200 border-b border-slate-200">
          {services.map((service, index) => {
            const topic = resolveContactTopic(service.title);
            return (
              <a
                href="#contact"
                key={service.title}
                onClick={() => {
                  if (topic) selectContactTopic(topic);
                }}
                className="motion-service-row grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 py-6 md:grid-cols-[50px_0.75fr_1.15fr_auto] md:items-start md:gap-8"
              >
                <span className="font-mono-label col-span-2 text-xs text-slate-600 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-slate-950 md:text-2xl">
                  {service.title}
                </h3>
                <p className="col-span-2 max-w-2xl leading-relaxed text-slate-600 md:col-span-1">
                  {service.description}
                </p>
                <span className="col-start-2 row-start-2 flex items-center justify-end self-center md:col-start-4 md:row-start-1 md:pt-1">
                  <ArrowRight className="motion-service-arrow h-5 w-5 shrink-0" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[220px_1fr] md:items-start">
          <p className="font-mono-label pt-2 text-xs text-slate-600">Production toolkit</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {techStack.map((tech) => (
              <span key={tech} className="text-sm font-semibold text-slate-600">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
