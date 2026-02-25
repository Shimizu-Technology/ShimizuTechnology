import { workflowSteps } from '../data';

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">How We Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Process
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A proven approach that delivers results, on time and on budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                {step.icon}
              </div>
              <div className="text-sm text-blue-600 font-medium mb-1">Step {index + 1}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
