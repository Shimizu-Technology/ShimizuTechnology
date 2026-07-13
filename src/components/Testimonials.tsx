import { ArrowUpRight, CheckCircle, Quote } from 'lucide-react';

const outcomes = [
  ['850+', 'VIP orders processed'],
  ['100%', 'Fulfillment completed'],
  ['Zero', 'Event-day downtime'],
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] py-16 text-white md:py-24 lg:py-28">
      <div className="surface-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-mono-label text-xs text-blue-300">Client outcomes</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Built for the moments when the system has to work.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              Hafaloha used its custom ordering platform to manage a high-volume concert VIP experience without downtime or fulfillment gaps.
            </p>

            <div className="mt-9 grid grid-cols-3 border-y border-white/10 py-6">
              {outcomes.map(([value, label]) => (
                <div key={label} className="pr-3">
                  <div className="text-2xl font-bold text-blue-300 md:text-3xl">{value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-slate-400 sm:text-xs">{label}</div>
                </div>
              ))}
            </div>

            <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-300">
              Plan a dependable launch <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
            <Quote className="h-8 w-8 text-blue-400" />
            <blockquote className="mt-6 text-xl font-medium leading-relaxed text-slate-100 md:text-2xl">
              “It was incredible seeing what was only a discussion of an idea come to life. The online ordering option is a valuable perk and adds to the VIP experience.”
            </blockquote>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="font-bold">Hafaloha</p>
              <p className="text-sm text-slate-400">Owner feedback after the concert launch</p>
            </div>

            <div className="mt-8 rounded-lg bg-white/[0.04] p-5">
              <p className="font-mono-label text-[10px] text-slate-400">Additional client proof</p>
              <p className="mt-3 leading-relaxed text-slate-300">
                “Your technical expertise and attention to detail ensured the process was user-friendly for our registrants and efficient for our team.”
              </p>
              <p className="mt-3 text-sm font-semibold text-white">Guam International Airport Authority</p>
              <a href="https://giaa-tournament.com" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-300">
                View registration platform <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-16 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-xl">
            <img src="/images/uog-intro-to-ai.jpeg" alt="University of Guam staff attending an AI workshop" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <p className="font-mono-label text-xs text-blue-300">AI enablement</p>
            <h3 className="mt-4 text-3xl font-bold">Technology is more valuable when the team understands it.</h3>
            <p className="mt-5 leading-relaxed text-slate-300">We also help organizations build practical AI fluency through tailored workshops covering use cases, limitations, privacy, and responsible adoption.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {['Practical workflows for daily work', 'Clear guidance on risk and privacy', 'Training tailored to the organization'].map((item) => (
                <li key={item} className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-blue-400" />{item}</li>
              ))}
            </ul>
            <blockquote className="mt-7 border-l-2 border-blue-400 pl-5 text-lg italic text-white">“The staff are raving about the training.”</blockquote>
            <p className="mt-2 pl-5 text-xs text-slate-400">Office of the Senior Vice President &amp; Provost, University of Guam</p>
          </div>
        </div>
      </div>
    </section>
  );
}
