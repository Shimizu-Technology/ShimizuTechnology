import { ArrowUpRight, Quote } from 'lucide-react';
import SectionMark from './SectionMark';

const clientQuotes = [
  {
    quote:
      '“It was incredible seeing what was only a discussion of an idea come to life. The online ordering option is a valuable perk and adds to the VIP experience.”',
    author: 'Hafaloha',
    context: 'Owner feedback after the concert launch',
    link: { href: '/work/hafaloha-orders/', label: 'Read the Hafaloha case study →', external: false },
  },
  {
    quote:
      '“Your technical expertise and attention to detail ensured the process was user-friendly for our registrants and efficient for our team.”',
    author: 'Guam International Airport Authority',
    context: 'Annual Memorial Golf Tournament',
    link: { href: 'https://giaa-tournament.com', label: 'View registration platform', external: true },
  },
  {
    quote: '“The staff are raving about the training.”',
    author: 'Office of the Senior Vice President & Provost',
    context: 'University of Guam · Tailored AI workshop',
    link: null,
  },
] as const;

export default function Testimonials() {
  return (
    <section
      aria-labelledby="client-proof-heading"
      className="site-section border-y border-[var(--border-subtle)] bg-white"
    >
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-mono-label section-label marked-label">
              <SectionMark />Client feedback
            </p>
            <h2 id="client-proof-heading" className="section-title mt-4">
              What Guam teams say after launch.
            </h2>
          </div>
          <p className="section-intro lg:justify-self-end">
            Direct feedback from local business owners, event organizers, and university leadership we have built and trained with.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {clientQuotes.map((item) => (
            <figure
              key={item.author}
              className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-6 sm:p-7"
            >
              <div>
                <Quote className="h-6 w-6 text-[var(--accent-detail)]" aria-hidden="true" />
                <blockquote className="mt-4 text-base font-medium leading-relaxed text-slate-900 sm:text-[1.0625rem]">
                  {item.quote}
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                <p className="font-bold text-slate-950">{item.author}</p>
                <p className="mt-0.5 text-xs text-slate-600">{item.context}</p>
                {item.link && (
                  item.link.external ? (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-[var(--accent-detail)]"
                    >
                      {item.link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <a
                      href={item.link.href}
                      className="text-link mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-[var(--accent-detail)]"
                    >
                      {item.link.label}
                    </a>
                  )
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
