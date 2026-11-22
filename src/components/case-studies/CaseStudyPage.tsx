import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Phone, Quote } from 'lucide-react';
import CaseStudyHeader from './CaseStudyHeader';
import CaseStudyFooter from './CaseStudyFooter';
import PayrollWorkflowExplorer from './PayrollWorkflowExplorer';
import SectionMark from '../SectionMark';
import { caseStudies, caseStudyOrder, type CaseStudySlug } from '../../data/caseStudies';
import { track } from '../../lib/analytics';
import hafalohaMobile240 from '../../assets/hafaloha-orders-mobile-240.webp';
import hafalohaMobile480 from '../../assets/hafaloha-orders-mobile-480.webp';

function PayrollHeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && !userPausedRef.current) {
        void el.play().catch((error: DOMException) => {
          if (error.name !== 'AbortError') setPlaying(false);
        });
      } else {
        el.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(frameRef.current ?? el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      el.pause();
    };
  }, [reduced]);

  return (
    <figure className="mt-9" ref={frameRef}>
      <div className="cs-media-frame">
        <div className="cs-media-bar">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[var(--text-primary)]">Cornerstone Payroll · Workspace walkthrough</span>
            <span className="cs-demo-badge">Demo data · all names fictional</span>
          </div>
          {!reduced && (
            <button
              type="button"
              aria-controls="case-payroll-demo"
              aria-label={`${playing ? 'Pause' : 'Play'} Payroll demo video`}
              onClick={() => {
                const el = videoRef.current;
                if (!el) return;
                userPausedRef.current = playing;
                if (playing) {
                  el.pause();
                  setPlaying(false);
                } else {
                  void el.play().catch(() => setPlaying(false));
                }
              }}
              className="cs-btn cs-btn-secondary cs-btn-compact"
            >
              {playing ? 'Pause' : 'Play'}
            </button>
          )}
        </div>
        {reduced ? (
          <img
            src="/images/motion/payroll-demo-v5-poster.webp"
            alt="Cornerstone Payroll committed pay-period view showing aggregate totals and check preparation controls using demo data with fictional company and employee names"
            width={1600}
            height={1000}
            fetchPriority="high"
            className="block h-auto w-full"
          />
        ) : (
          <video
            ref={videoRef}
            id="case-payroll-demo"
            className="block aspect-8/5 h-auto w-full object-contain"
            width={1600}
            height={1000}
            muted
            loop
            playsInline
            preload="none"
            poster="/images/motion/payroll-demo-v5-poster.webp"
            aria-label="Cornerstone Payroll demo with fictional data (all names fictional): pay-run review, approval, commit, and check preparation"
            onPlay={() => {
              if (userPausedRef.current) videoRef.current?.pause();
              else setPlaying(true);
            }}
          >
            <source src="/images/motion/payroll-demo-v5.mp4" type="video/mp4" />
            <source src="/images/motion/payroll-demo-v5.webm" type="video/webm" />
          </video>
        )}
      </div>
      <figcaption className="cs-media-caption">
        <span>Aggregate pay-period totals, approval checkpoints, and check preparation workflow.</span>
        <span className="font-semibold text-[var(--text-primary)]">Demo data · all names fictional</span>
      </figcaption>
    </figure>
  );
}

function HafalohaHeroMedia() {
  return (
    <figure className="mt-9">
      <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr] lg:items-start">
        <div className="cs-media-frame !mt-0">
          <div className="cs-media-bar">
            <span className="font-semibold text-[var(--text-primary)]">Hafaloha Orders · Desktop storefront</span>
            <span>hafaloha-orders.com</span>
          </div>
          <img
            src="/images/motion/hafaloha-orders-hero.webp"
            alt="Hafaloha Orders desktop ordering interface showing Guam storefront location, popular menu items, and online ordering controls"
            width={1600}
            height={903}
            fetchPriority="high"
            className="block h-auto w-full"
          />
        </div>
        <div className="cs-media-frame !mt-0 mx-auto w-full max-w-[300px] lg:max-w-none">
          <div className="cs-media-bar">
            <span className="font-semibold text-[var(--text-primary)]">Mobile ordering</span>
          </div>
          <img
            src={hafalohaMobile480}
            srcSet={`${hafalohaMobile240} 240w, ${hafalohaMobile480} 480w`}
            sizes="(min-width: 1024px) 260px, 280px"
            alt="Hafaloha Orders mobile ordering view showing touch-friendly cart and menu items on a phone screen"
            width={480}
            height={1044}
            loading="lazy"
            decoding="async"
            className="block max-h-[420px] w-full object-cover object-top"
          />
        </div>
      </div>
      <figcaption className="cs-media-caption">
        <span>Responsive online ordering built for fast mobile VIP checkout and desktop menu browsing.</span>
      </figcaption>
    </figure>
  );
}

function MarianasHeroMedia() {
  return (
    <figure className="mt-9">
      <div className="cs-media-frame">
        <div className="cs-media-bar cs-media-bar-dark">
          <span className="font-semibold text-white">Marianas Open · Multilingual event calendar</span>
          <span>marianasopen.com/calendar</span>
        </div>
        <img
          src="/images/case-studies/marianas-open-calendar.webp"
          srcSet="/images/case-studies/marianas-open-calendar-900.webp 900w, /images/case-studies/marianas-open-calendar.webp 1600w"
          sizes="(min-width: 1280px) 1160px, 100vw"
          alt="Marianas Open public calendar interface showing the 7-language selector open over Asia-Pacific Pro Series events in Guam, Tokyo, and Manila"
          width={1600}
          height={1000}
          fetchPriority="high"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="cs-media-caption">
        <span>Public calendar software UI with 7-language switching, upcoming/past result tabs, and Gi/No-Gi registration links.</span>
      </figcaption>
    </figure>
  );
}

export default function CaseStudyPage({ slug }: { slug: CaseStudySlug }) {
  const study = caseStudies[slug];
  const otherStudies = caseStudyOrder
    .filter((otherSlug) => otherSlug !== slug)
    .map((otherSlug) => caseStudies[otherSlug]);

  useEffect(() => {
    track('page_viewed', { page: `case_study_${slug}` });
  }, [slug]);

  return (
    <div className="cs-page">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <CaseStudyHeader />

      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="cs-hero">
          <div className="site-container">
            <nav className="cs-breadcrumb" aria-label="Breadcrumb">
              <a href="/work/">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All work
              </a>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="font-semibold text-[var(--text-primary)]">
                {study.title}
              </span>
            </nav>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className={`font-mono-label cs-status-pill ${
                  study.status === 'Live' ? 'cs-status-live' : 'cs-status-seasonal'
                }`}
              >
                {study.status}
              </span>
              <span className="font-mono-label section-label">{study.category} · {study.subtitle}</span>
            </div>

            <h1 className="cs-hero-title">{study.headline}</h1>
            <p className="cs-hero-summary">{study.summary}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/#contact" className="cs-btn cs-btn-primary">
                {study.cta.primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('project_link_clicked', {
                    project_title: study.title,
                    url: study.liveUrl,
                  })
                }
                className="cs-btn cs-btn-secondary"
              >
                {study.liveUrlLabel} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="cs-proof-grid" aria-label="Project highlights">
              {study.proofItems.map((item) => (
                <div key={item.label} className="cs-proof-item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {slug === 'cornerstone-payroll' && <PayrollHeroMedia />}
            {slug === 'hafaloha-orders' && <HafalohaHeroMedia />}
            {slug === 'marianas-open' && <MarianasHeroMedia />}
          </div>
        </section>

        {/* 01 · The Challenge */}
        <section className="cs-section cs-section-white" aria-labelledby="challenge-heading">
          <div className="site-container">
            <div className="cs-editorial-grid">
              <div>
                <p className="font-mono-label cs-eyebrow">
                  <SectionMark />
                  01 · The challenge
                </p>
                <h2 id="challenge-heading" className="cs-section-heading">
                  {study.challenge.heading}
                </h2>
              </div>
              <div>
                <p className="cs-lead">{study.challenge.lead}</p>
                <ul className="cs-point-list">
                  {study.challenge.points.map((point) => (
                    <li key={point} className="cs-point-item">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-detail)]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 02 · What We Built */}
        <section className="cs-section cs-section-soft" aria-labelledby="built-heading">
          <div className="site-container">
            <p className="font-mono-label cs-eyebrow">
              <SectionMark />
              02 · What we built
            </p>
            <div className="mt-2 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <h2 id="built-heading" className="cs-section-heading !mt-2">
                {study.whatWeBuilt.heading}
              </h2>
              <p className="cs-lead">{study.whatWeBuilt.lead}</p>
            </div>

            <div className="cs-capability-grid">
              {study.whatWeBuilt.capabilities.map((cap) => (
                <article key={cap.title} className="cs-capability-card">
                  <h3>{cap.title}</h3>
                  <p>{cap.detail}</p>
                </article>
              ))}
            </div>

            {slug === 'cornerstone-payroll' && (
              <figure className="mt-10">
                <div className="cs-media-frame !mt-0">
                  <div className="cs-media-bar">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[var(--text-primary)]">
                        Cornerstone Payroll · Pay-run calculation review
                      </span>
                      <span className="cs-demo-badge">Demo data · all names fictional</span>
                    </div>
                  </div>
                  <img
                    src="/images/motion/payroll-demo-v5-summary.webp"
                    alt="Cornerstone Payroll calculated pay-run review table showing aggregate totals and employee list with fictional demo names before approval"
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="cs-media-caption">
                  <span>Operators review hours, gross pay, deductions, net totals, and exception flags before approving the pay period.</span>
                  <span className="font-semibold text-[var(--text-primary)]">Demo data · all names fictional</span>
                </figcaption>
              </figure>
            )}

            {slug === 'marianas-open' && (
              <figure className="mt-10">
                <div className="cs-media-frame !mt-0">
                  <div className="cs-media-bar cs-media-bar-dark">
                    <span className="font-semibold text-white">
                      Marianas Open · Official ASJJF Team Rankings UI
                    </span>
                    <span>marianasopen.com/rankings</span>
                  </div>
                  <img
                    src="/images/case-studies/marianas-open-rankings.webp"
                    srcSet="/images/case-studies/marianas-open-rankings-900.webp 900w, /images/case-studies/marianas-open-rankings.webp 1600w"
                    sizes="(min-width: 1280px) 1160px, 100vw"
                    alt="Marianas Open rankings interface filtered to 2026 Gi Team Adults showing academy standings and points"
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="cs-media-caption">
                  <span>Structured standings filters for season, Gi/No-Gi discipline, and individual or team divisions.</span>
                </figcaption>
              </figure>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-2" aria-label="Project focus areas">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-label rounded-sm border border-[var(--border-subtle)] bg-white px-2.5 py-1 text-[11px] text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page Navy Signature Band */}
        {slug === 'cornerstone-payroll' && <PayrollWorkflowExplorer />}

        {slug === 'hafaloha-orders' && study.quote && (
          <section className="cs-section cs-dark-band" aria-labelledby="client-quote-heading">
            <div className="site-container">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <p className="font-mono-label cs-eyebrow">
                    <SectionMark />
                    Client feedback
                  </p>
                  <h2 id="client-quote-heading" className="cs-section-heading text-white">
                    Built for the moments when the system has to work.
                  </h2>
                  <p className="cs-lead mt-4">
                    Hafaloha used its custom ordering platform to run a high-volume concert VIP experience without downtime or fulfillment gaps.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#2a364a] bg-[#161e2c] p-6 sm:p-8 lg:p-10">
                  <Quote className="h-8 w-8 text-[#b8dfe5]" aria-hidden="true" />
                  <blockquote className="mt-5 text-xl font-medium leading-relaxed text-white sm:text-2xl">
                    “{study.quote.text}”
                  </blockquote>
                  <div className="mt-7 border-t border-[#2a364a] pt-5">
                    <p className="font-bold text-white">{study.quote.attribution}</p>
                    <p className="text-sm text-[#b8c4d4]">{study.quote.context}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {slug === 'marianas-open' && (
          <section className="cs-section cs-dark-band" aria-labelledby="mo-ops-heading">
            <div className="site-container">
              <p className="font-mono-label cs-eyebrow">
                <SectionMark />
                Public presence + admin tooling
              </p>
              <h2 id="mo-ops-heading" className="cs-section-heading max-w-[24ch] text-white">
                Designed for fans on the front end and organizers behind the scenes.
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <article className="rounded-xl border border-[#2a364a] bg-[#161e2c] p-6">
                  <p className="font-mono-label text-xs text-[#b8dfe5]">For competitors &amp; fans</p>
                  <h3 className="mt-3 text-xl font-bold text-white">Clear answers in 7 languages</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d4dde8]">
                    Event calendars across Guam and Asia-Pacific, competition rules, watch links, past-event archives, and filterable ASJJF rankings all stay consistent on desktop and mobile.
                  </p>
                </article>
                <article className="rounded-xl border border-[#2a364a] bg-[#161e2c] p-6">
                  <p className="font-mono-label text-xs text-[#b8dfe5]">For event organizers</p>
                  <h3 className="mt-3 text-xl font-bold text-white">Repeatable tournament administration</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d4dde8]">
                    Reusable event setup, results preview and import, translation refresh, media galleries, sponsor slots, and accommodation offers keep updates fast from event to event.
                  </p>
                </article>
              </div>
            </div>
          </section>
        )}

        {/* 03 · The Result */}
        <section className="cs-section cs-section-white" aria-labelledby="result-heading">
          <div className="site-container">
            <div className="cs-editorial-grid">
              <div>
                <p className="font-mono-label cs-eyebrow">
                  <SectionMark />
                  03 · The result
                </p>
                <h2 id="result-heading" className="cs-section-heading">
                  {study.result.heading}
                </h2>
              </div>
              <div>
                <p className="cs-lead">{study.result.lead}</p>
                <ul className="cs-point-list">
                  {study.result.outcomes.map((outcome) => (
                    <li key={outcome} className="cs-point-item">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-detail)]"
                        aria-hidden="true"
                      />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                {study.result.boundaryNote && (
                  <p className="mt-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {study.result.boundaryNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="cs-section cs-section-soft" aria-labelledby="who-heading">
          <div className="site-container">
            <p className="font-mono-label cs-eyebrow">
              <SectionMark />
              Who this is for
            </p>
            <div className="mt-2 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <h2 id="who-heading" className="cs-section-heading !mt-2">
                {study.whoThisIsFor.heading}
              </h2>
              <p className="cs-lead">{study.whoThisIsFor.lead}</p>
            </div>

            <div className="cs-audience-grid">
              {study.whoThisIsFor.audiences.map((audience) => (
                <article key={audience.title} className="cs-audience-card">
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
                    {audience.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)]">
                    {audience.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* More Case Studies */}
        <section className="cs-section cs-section-white" aria-labelledby="more-work-heading">
          <div className="site-container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono-label cs-eyebrow">
                  <SectionMark />
                  More case studies
                </p>
                <h2 id="more-work-heading" className="cs-section-heading">
                  See other Guam systems we have built.
                </h2>
              </div>
              <a href="/work/" className="cs-btn cs-btn-secondary">
                View full portfolio <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="cs-related-grid">
              {otherStudies.map((other) => (
                <a key={other.slug} href={other.path} className="cs-related-card">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-mono-label cs-status-pill ${
                          other.status === 'Live' ? 'cs-status-live' : 'cs-status-seasonal'
                        }`}
                      >
                        {other.status}
                      </span>
                      <span className="font-mono-label text-xs text-[var(--accent-detail)]">
                        {other.subtitle}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-extrabold text-[var(--text-primary)]">
                      {other.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {other.headline}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-detail)]">
                    Read case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Band */}
        <section className="cs-section cs-dark-band" aria-labelledby="case-cta-heading">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="font-mono-label cs-eyebrow">
                  <SectionMark />
                  {study.cta.kicker}
                </p>
                <h2 id="case-cta-heading" className="cs-section-heading text-white">
                  {study.cta.heading}
                </h2>
                <p className="cs-lead mt-4">{study.cta.body}</p>
              </div>

              <div className="rounded-2xl border border-[#2a364a] bg-[#161e2c] p-6 sm:p-8">
                <div className="flex flex-col gap-3">
                  <a href="/#contact" className="cs-btn cs-btn-on-dark w-full">
                    {study.cta.primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="tel:+16714830219"
                    onClick={() => track('contact_phone_clicked')}
                    className="cs-btn cs-btn-outline-dark w-full"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call (671) 483-0219
                  </a>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#b8c4d4]">
                  No charge for the first 20–30-minute conversation or a concise proposal based on it.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CaseStudyFooter />
    </div>
  );
}
