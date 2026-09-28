import {
  Target,
  Brain,
  Rocket,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative bg-white py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left content */}
          <div>
            <p className="font-mono-label text-xs text-blue-600">Built in Guam</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">
              Local context. Global engineering standards.
            </h2>

            {/* Founder intro with photo */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
              <img
                src="/images/leon-shimizu.webp"
                alt="Leon Shimizu"
                loading="lazy"
                decoding="async"
                className="h-20 w-20 rounded-lg object-cover grayscale"
              />
              <div>
                <p className="font-bold text-slate-900 text-lg">Leon Shimizu</p>
                <p className="text-sm text-blue-600 font-medium">Founder</p>
              </div>
            </div>

            <p className="text-slate-600 mb-4 leading-relaxed">
              I founded <a href="https://codeschoolofguam.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">Code School of Guam</a> to open a path into software development here in Guam. Shimizu Technology grew from the same belief: local teams deserve software shaped around their real work, and emerging engineers need real projects to learn from.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Today, our work ranges from payroll and learning platforms to ordering and live-event systems. We start by understanding the workflow, then design, build, and support the product with the people who use it.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              You work with a Guam-based team that can stay close to the problem after launch. We are direct about what is live, what is still being tested, and what a new engagement needs to succeed.
            </p>

            {/* Code School Connection */}
            <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-slate-900">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-red-100 p-2 text-red-700">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Code School of Guam Partnership</h3>
                  <p className="mb-3 text-sm text-slate-600">
                    Code School of Guam teaches focused courses and a full software development bootcamp. Some graduates have had opportunities to practice on Shimizu projects when the work and their readiness align.
                  </p>
                  <a
                    href="https://codeschoolofguam.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-red-700 hover:underline"
                  >
                    Learn more about Code School
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Values */}
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            <div className="py-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Local Expertise</h3>
              </div>
              <p className="text-slate-600 text-sm">
                We build with Guam's rules, teams, and customers in mind. You'll work directly with people who understand your workflow and can support the product after launch.
              </p>
            </div>

            <div className="py-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Practical AI</h3>
              </div>
              <p className="text-slate-600 text-sm">
                We use AI where it makes a workflow more useful: helping people find information, process media, or make sense of complex material. The product still needs clear controls, reliable data, and human judgment.
              </p>
            </div>

            <div className="py-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">End-to-End Delivery</h3>
              </div>
              <p className="text-slate-600 text-sm">
                One team carries discovery, design, engineering, launch, and support. You see working software and make decisions at practical checkpoints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
