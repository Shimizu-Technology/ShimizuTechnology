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
          <p className="section-intro lg:justify-self-end">We learn what you want to improve, recommend a practical approach, and agree on the work before starting. The right next step might be a change to your existing tools or something new.</p>
        </div>

        <div className="motion-process">
          <div className="motion-process-track" aria-hidden="true"><div className="motion-process-line" /></div>
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="motion-step">
              <div className="font-mono-label section-label">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
