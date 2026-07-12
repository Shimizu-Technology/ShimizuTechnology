import { workflowSteps } from '../data';

export default function Process() {
  return (
    <section id="process" className="relative bg-[#f7f8fa] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono-label text-xs text-blue-600">How we work</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">Clear decisions. Visible progress. No black box.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:justify-self-end">Every engagement is structured around tangible checkpoints, direct communication, and early validation with the people who will use the product.</p>
        </div>

        <div className="mt-12 grid border-y border-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="border-b border-slate-200 p-6 md:border-r md:even:border-r-0 lg:border-b-0 lg:border-r lg:even:border-r lg:p-8 last:border-r-0">
              <div className="font-mono-label text-xs text-blue-600">0{index + 1}</div>
              <h3 className="mt-8 text-xl font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
