import {
  Target,
  Brain,
  Rocket,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative">
      <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px'}} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left content */}
          <div>
            <p className="text-blue-600 font-medium mb-2">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Proudly Building in <span className="text-blue-600">Guam</span>
            </h2>

            {/* Founder intro with photo */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
              <img
                src="/images/NationalsPic2.jpg"
                alt="Leon Shimizu"
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/30"
              />
              <div>
                <p className="font-bold text-slate-900 text-lg">Leon Shimizu</p>
                <p className="text-sm text-blue-600 font-medium">Founder</p>
              </div>
            </div>

            <p className="text-slate-600 mb-4 leading-relaxed">
              I started Shimizu Technology because I saw a problem: <strong>employers want engineers with experience, but new engineers can't get experience if no one gives them a chance.</strong> As the founder of the <a href="https://codeschoolofguam.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">Code School of Guam</a>, I wanted to ensure every graduate had access to real-world projects — so I started building software for local businesses.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Along the way, I discovered something: <strong>I genuinely love building custom software.</strong> There's something incredibly rewarding about seeing ideas come to life and helping businesses solve real problems with technology.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              What started as a way to give students real-world experience has grown into a full-fledged software firm. Today, we specialize in AI-powered applications, mobile apps, and custom web solutions — and we genuinely enjoy every project we take on.
            </p>

            {/* Code School Connection */}
            <div className="bg-red-500 rounded-2xl p-5 text-white">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Code School of Guam Partnership</h3>
                  <p className="text-white/90 text-sm mb-3">
                    Guam's first AI-native coding bootcamp. Hybrid format with live instruction + async practice. Students learn to build AI-powered applications from scratch — and our team includes talented junior developers from the program.
                  </p>
                  <a
                    href="https://codeschoolofguam.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium hover:underline"
                  >
                    Learn more about Code School
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Values */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Local Expertise</h3>
              </div>
              <p className="text-slate-600 text-sm">
                We understand the Guam market and provide responsive, dedicated support. When you need help, you'll work with someone who knows your specific needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">AI-First Approach</h3>
              </div>
              <p className="text-slate-600 text-sm">
                We leverage cutting-edge AI models like GPT-4o, Gemini, and Whisper to build intelligent applications that solve real problems.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Rocket className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">End-to-End Delivery</h3>
              </div>
              <p className="text-slate-600 text-sm">
                From concept to App Store deployment, we handle everything. Design, development, deployment, and ongoing support — all under one roof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
