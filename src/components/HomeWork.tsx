import SectionMark from "./SectionMark";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioCounts, projects } from "../data";
import { selectContactTopic } from "../lib/contactTopic";
import { track } from "../lib/analytics";

interface SelectedCard {
  title: string;
  image: string;
  image800: string;
  alt: string;
  width: number;
  height: number;
  caseStudyPath: string;
  problem: string;
  outcome: string;
  dark?: boolean;
}

const selection: SelectedCard[] = [
  {
    title: "Cornerstone Payroll",
    image: "payroll-demo-v5-summary.webp",
    image800: "payroll-demo-v5-summary-800.webp",
    alt: "Cornerstone Payroll pay-run summary and employee table showing demo data with fictional names",
    width: 1600,
    height: 1000,
    caseStudyPath: "/work/cornerstone-payroll/",
    problem: "Guam payroll and filing rules needed dependable calculations and audited approvals.",
    outcome: "Production payroll, check printing, and tax summaries live for Cornerstone Accounting.",
  },
  {
    title: "Marianas Open",
    image: "marianasopen-rankings-1600.webp",
    image800: "marianasopen-rankings-800.webp",
    alt: "Marianas Open rankings interface showing division filters, Gi and No-Gi toggles, and live ASJJF standings",
    width: 1600,
    height: 1000,
    caseStudyPath: "/work/marianas-open/",
    problem: "Competitors and fans across Guam, Korea, and Japan needed one place for live tournament data.",
    outcome: "Live multilingual platform for event schedules, competitor profiles, rankings, and results.",
    dark: true,
  },
  {
    title: "Hafaloha Orders",
    image: "hafaloha-orders-hero.webp",
    image800: "hafaloha-orders-hero-800.webp",
    alt: "Hafaloha Orders desktop interface for online ordering and VIP event fulfillment",
    width: 1600,
    height: 903,
    caseStudyPath: "/work/hafaloha-orders/",
    problem: "High-volume concert VIP ordering and shipping had to run without bottlenecks or missed orders.",
    outcome: "850+ VIP orders processed, 100% fulfilled, and zero event-day downtime.",
  },
];

const logos = [
  { src: "clients/cornerstone-white.webp", alt: "Cornerstone Accounting", role: "Payroll & tax" },
  { src: "clients/aire-white.webp", alt: "AIRE Services", role: "Time & ops" },
  { src: "clients/marianas-open-white.webp", alt: "Marianas Open", role: "Tournaments" },
  { src: "clients/make-a-wish-white.webp", alt: "Make-A-Wish Guam and CNMI", role: "Charity events" },
  { src: "clients/giaa-white.webp", alt: "A.B. Won Pat International Airport Guam", role: "Airport events" },
  { src: "clients/csg-white.webp", alt: "Code School of Guam", role: "Coding school" },
];

export function ClientLogos() {
  return (
    <section
      className="motion-logos"
      aria-label="Organizations we have built for"
    >
      <div className="site-container">
        <p className="font-mono-label logo-band-label">
          <SectionMark />Built with teams across Guam
        </p>
        <ul>
          {logos.map(({ src, alt, role }) => (
            <li key={src}>
              <img
                src={`/images/${src}`}
                alt={alt}
                width="160"
                height="46"
                loading="lazy"
                decoding="async"
              />
              <span className="logo-role">{role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HomeWork() {
  return (
    <section id="projects" className="site-section">
      <span id="work" className="motion-anchor" />
      <div className="site-container">
        <div className="motion-head">
          <div>
            <p className="font-mono-label section-label marked-label">
              <SectionMark />Selected work
            </p>
            <h2 className="section-title mt-4">
              Products with real users and real stakes.
            </h2>
          </div>
          <p>
            From Guam payroll to international events and live commerce, our
            work turns complicated rules and workflows into software people can
            use.
          </p>
        </div>
        <div className="motion-stack">
          {selection.map((item, index) => {
            const project = projects.find((p) => p.title === item.title)!;
            const linkColor = item.dark
              ? "text-[var(--accent-on-dark)] hover:text-white"
              : "text-[var(--accent-detail)] hover:text-[var(--action-hover)]";
            const secondaryLinkColor = item.dark
              ? "text-slate-300 hover:text-white"
              : "text-slate-600 hover:text-slate-950";

            return (
              <article
                key={item.title}
                className={`motion-card ${item.dark ? "dark" : ""}`}
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className="motion-card-copy">
                  <div>
                    <span className="motion-status">{project.status}</span>
                    <h3>{item.title}</h3>
                    <p>{project.description}</p>
                    <dl className="motion-outcome-list">
                      <div>
                        <dt className="inline font-bold">Problem: </dt>
                        <dd className="inline">{item.problem}</dd>
                      </div>
                      <div>
                        <dt className="inline font-bold">Outcome: </dt>
                        <dd className="inline">{item.outcome}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="space-y-4">
                    {index === 1 && (
                      <div className="motion-metrics">
                        <p>
                          <strong>Multilingual</strong>Event pages
                        </p>
                        <p>
                          <strong>Results</strong>&amp; rankings
                        </p>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="motion-metrics">
                        <p>
                          <strong>850+</strong>orders at a live event
                        </p>
                        <p>
                          <strong>Zero</strong>downtime
                        </p>
                      </div>
                    )}
                    <div className="motion-card-actions">
                      <a href={item.caseStudyPath} className={linkColor}>
                        Read case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                      {index === 0 ? (
                        <a
                          href="#contact"
                          onClick={() => selectContactTopic("Business Software")}
                          className={secondaryLinkColor}
                        >
                          Talk about payroll →
                        </a>
                      ) : project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            track("project_link_clicked", {
                              project_title: project.title,
                              url: project.link!,
                            })
                          }
                          className={secondaryLinkColor}
                        >
                          Visit product <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="motion-card-media">
                  <img
                    src={`/images/motion/${item.image}`}
                    srcSet={`/images/motion/${item.image800} 800w, /images/motion/${item.image} ${item.width}w`}
                    sizes="(min-width: 821px) 52vw, 92vw"
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            );
          })}
        </div>
        <a href="/work/" className="button-secondary mt-8">
          Explore all {portfolioCounts.total} projects →
        </a>
      </div>
    </section>
  );
}

export function Statement() {
  const words =
    "Most businesses don't need more software. They need the tools they already have to work together, and a local team that understands how the work actually gets done.".split(
      " ",
    );
  return (
    <section className="motion-statement">
      <div className="site-container">
        <p>
          {words.map((word, i) => (
            <span data-fill-word key={i}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
