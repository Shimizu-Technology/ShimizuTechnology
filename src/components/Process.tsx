import { ArrowRight } from 'lucide-react';
import { workflowSteps } from '../data';
import { selectContactTopic, type ContactTopic } from '../lib/contactTopic';

const engagementModels: {
  number: string;
  title: string;
  summary: string;
  topic: ContactTopic;
  cta: string;
}[] = [
  {
    number: '01',
    title: 'Focused project',
    summary:
      'A business website refresh, online inquiry flow, or one specific workflow fix. We agree on the scope, timeline, and result up front before starting.',
    topic: 'Websites & Online Presence',
    cta: 'Ask about a focused project',
  },
  {
    number: '02',
    title: 'Custom business system, phased',
    summary:
      'When your team has outgrown spreadsheets or disconnected tools. We build and roll out the system in clear phases, with the people who use it reviewing each step.',
    topic: 'Business Software',
    cta: 'Plan a phased system',
  },
  {
    number: '03',
    title: 'Ongoing monthly support & iteration',
    summary:
      'Steady local help after launch—hosting oversight, fixes, small updates, and new improvements as your operations grow, so you are not left on your own.',
    topic: 'Ongoing Support',
    cta: 'Talk about ongoing support',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-[var(--surface-soft)] site-section">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono-label section-label">How we work</p>
            <h2 className="mt-4 section-title">Start with a conversation. Agree on the next step.</h2>
          </div>
          <p className="section-intro lg:justify-self-end">
            We learn what you want to improve, recommend a practical approach, and agree on the work before starting. The right next step might be a change to your existing tools or something new.
          </p>
        </div>

        <div className="motion-process">
          <div className="motion-process-track" aria-hidden="true">
            <div className="motion-process-line" />
          </div>
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="motion-step">
              <div className="font-mono-label section-label">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-[var(--border-subtle)] pt-12">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono-label section-label">Ways we work together</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight !text-[#f8fafc] sm:text-3xl">
                Start with what makes sense now.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#b8c4d4] lg:justify-self-end sm:text-base">
              You do not need a giant scope or a finished specification to get started. Every engagement starts with a free 20–30-minute conversation and a clear written proposal.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <article
                key={model.title}
                className="flex flex-col justify-between rounded-2xl border border-[#263244] bg-[#131a27] p-6"
              >
                <div>
                  <span className="font-mono-label text-xs text-[var(--accent-on-dark)]">
                    {model.number}
                  </span>
                  <h4 className="mt-3 text-lg font-bold text-[#f8fafc]">{model.title}</h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#b8c4d4]">{model.summary}</p>
                </div>
                <a
                  href="#contact"
                  onClick={() => selectContactTopic(model.topic)}
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[var(--accent-on-dark)] hover:text-white"
                >
                  {model.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
