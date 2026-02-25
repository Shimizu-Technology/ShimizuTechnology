import {
  Star,
  Quote,
  ArrowRight,
  Plane,
  ExternalLink,
  Brain,
  CheckCircle,
} from 'lucide-react';

export default function Testimonials() {
  return (
    <>
      {/* HAFALOHA TESTIMONIAL */}
      <section className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Proven Success Under Pressure
            </h2>
            <p className="text-blue-400 font-medium">
              Hafaloha's Concert VIP Experience
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="text-center p-4 bg-white/5 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">850+</div>
              <div className="text-sm text-slate-400 mt-1">VIP Orders</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-green-400">100%</div>
              <div className="text-sm text-slate-400 mt-1">Fulfillment</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">Zero</div>
              <div className="text-sm text-slate-400 mt-1">Downtime</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-10 h-10 text-blue-500/30" />
              <blockquote className="text-center text-lg md:text-xl text-slate-300 leading-relaxed pl-6">
                "It was soooo incredible being able to see what was only a discussion of an idea, come to life. No doubt that the online ordering option is a valuable perk & adds to the VIP experience. I'm excited to sit with the team and you to discuss how we can make it better!!!"
              </blockquote>
            </div>
            <p className="text-center mt-4 text-slate-400">
              — <span className="text-white font-medium">Hafaloha Owner</span>
            </p>
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Let's Build Your Solution
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* GIAA TESTIMONIAL */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-4">
              <Plane className="w-4 h-4" />
              Guam International Airport Authority
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Digital Transformation Success
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <Quote className="w-10 h-10 text-blue-400/40 mb-4" />

            <blockquote className="text-lg md:text-xl text-slate-200 leading-relaxed mb-6">
              "Transitioning to a digital system is a <span className="text-white font-semibold">significant milestone</span> for us, and we are incredibly impressed with how smoothly the rollout went. Your technical expertise and attention to detail ensured that the process is <span className="text-white font-semibold">user-friendly for our registrants and efficient for our team</span>. We already see the benefits of the streamlined workflow. Thank you for the excellent work!"
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Guam International Airport Authority</p>
                  <p className="text-sm text-slate-400">Golf Tournament Registration System</p>
                </div>
              </div>

              <a
                href="https://giaa-tournament.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                View Project
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-400 italic">
              "Check in process was awesome!" <span className="text-slate-500">— Follow-up message after tournament day</span>
            </p>
          </div>
        </div>
      </section>

      {/* UOG AI WORKSHOP */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              AI Training & Workshops
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Empowering Organizations with AI
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Beyond building software, we help teams understand and leverage AI effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/uog-intro-to-ai.jpeg"
                alt="UOG Intro to AI Workshop attendees"
                className="w-full h-auto object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  UOG
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">University of Guam</h3>
                  <p className="text-sm text-slate-500">Office of the Senior Vice President & Provost</p>
                </div>
              </div>

              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Intro to AI Workshop
              </h4>
              <p className="text-slate-600 mb-4">
                A two-day seminar (July 9-10, 2025) introducing UOG staff to AI fundamentals — what it is, how to use it effectively, and what to watch out for.
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>What is AI & how does ChatGPT work</span>
                </li>
                <li className="flex items-start text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Practical use cases: brainstorming, analysis, proofreading</span>
                </li>
                <li className="flex items-start text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Risks & limitations: hallucinations, security, privacy</span>
                </li>
              </ul>

              <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                <Quote className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-slate-700 italic mb-2">
                  "The staff are raving about the training! Thanks again for a wonderful seminar."
                </p>
                <p className="text-sm text-slate-500">
                  — Office of the Senior Vice President & Provost, UOG
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
