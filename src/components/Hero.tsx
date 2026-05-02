import { ChevronRight, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Building AI-Powered Solutions in Guam
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transforming Ideas
            <br />
            <span className="text-blue-400">Into Reality</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            We build custom software, AI applications, and mobile apps that solve real problems for businesses in Guam and beyond.
          </p>

          <div className="flex flex-wrap gap-8 mb-10">
            <div>
              <div className="text-3xl font-bold text-white">13+</div>
              <div className="text-sm text-slate-400">Production Apps</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-sm text-slate-400">AI Apps Deployed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2</div>
              <div className="text-sm text-slate-400">Apps on App Store</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Start Your Project
              <ChevronRight className="ml-1 w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-medium transition-colors"
            >
              View Our Work
              <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
