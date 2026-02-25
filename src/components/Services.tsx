import { services, techStack } from '../data';

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From AI-powered applications to mobile apps, we build technology that makes a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-xl ${service.iconBg} ${service.iconColor} mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-slate-500 mb-4">Technologies We Use</p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
