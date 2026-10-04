import { workflowSteps } from '../data';

export default function Process() {
  return (
    <section id="process" className="relative bg-[var(--surface-soft)] site-section">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono-label section-label">How we work</p>
            <h2 className="mt-4 section-title">Start with a conversation. Agree on the next step.</h2>
          </div>
          <p className="max-w-2xl section-intro lg:justify-self-end">We learn what you want to improve, recommend a practical approach, and agree on the work before starting. The right next step might be a change to your existing tools or something new.</p>
        </div>

        <div className="mt-9 grid border-y border-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="border-b border-slate-200 p-6 last:border-b-0 last:border-r-0 md:border-r md:even:border-r-0 md:nth-[n+3]:border-b-0 lg:border-b-0 lg:border-r lg:even:border-r lg:last:border-r-0 lg:p-6">
              <div className="font-mono-label section-label">0{index + 1}</div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
