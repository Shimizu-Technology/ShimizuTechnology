import SectionMark from "./SectionMark";
import type { CSSProperties } from "react";
import { portfolioCounts, projects } from "../data";
const selection = [
  [
    "Cornerstone Payroll",
    "payroll-demo-v5-summary.webp",
    "Cornerstone Payroll pay-run summary and employee table showing demo data with fictional names",
    1600,
    1000,
  ],
  [
    "Marianas Open",
    "marianasopen-focus-1120.webp",
    "Marianas Open event page",
    1120,
    840,
  ],
  [
    "Hafaloha Orders",
    "hafaloha-orders-hero.webp",
    "Hafaloha Orders desktop interface",
    1600,
    903,
  ],
] as const;
const logos = [
  ["cornerstone-logo.webp", "Cornerstone Accounting", ""],
  ["aire-logo.png", "AIRE Services", "dark"],
  ["mo-logo-white.png", "Marianas Open", "dark"],
  ["make-a-wish-logo-blue.webp", "Make-A-Wish Guam and CNMI", "blue"],
  ["giaa-logo-mark.webp", "A.B. Won Pat International Airport Guam", ""],
  ["csg-logo.png", "Code School of Guam", "dark"],
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
          {logos.map(([src, alt, theme]) => (
            <li key={src} className={theme}>
              <img
                src={`/images/${src}`}
                alt={alt}
                width="168"
                height="88"
                loading="lazy"
              />
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
            <p className="font-mono-label section-label marked-label"><SectionMark />Selected work</p>
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
          {selection.map(([title, image, alt, width, height], index) => {
            const project = projects.find((p) => p.title === title)!;
            return (
              <article
                key={title}
                className={`motion-card ${index === 1 ? "dark" : ""}`}
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className="motion-card-copy">
                  <div>
                    <span className="motion-status">{project.status}</span>
                    <h3>{title}</h3>
                    <p>{project.description}</p>
                  </div>
                  {index === 0 ? (
                    <a href="#contact" className="text-link">
                      Talk about payroll →
                    </a>
                  ) : index === 1 ? (
                    <div className="motion-metrics">
                      <p>
                        <strong>Multilingual</strong>Event pages
                      </p>
                      <p>
                        <strong>Results</strong>&amp; rankings
                      </p>
                    </div>
                  ) : (
                    <div className="motion-metrics">
                      <p>
                        <strong>850+</strong>orders at a live event
                      </p>
                      <p>
                        <strong>Zero</strong>downtime
                      </p>
                    </div>
                  )}
                </div>
                <div className="motion-card-media">
                  <img
                    src={`/images/motion/${image}`}
                    alt={alt}
                    width={width}
                    height={height}
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
