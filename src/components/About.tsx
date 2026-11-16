export default function About() {
  return (
    <section id="about" className="site-section">
      <div className="site-container motion-about">
        <div className="motion-portrait">
          <img
            src="/images/leon-shimizu.webp"
            alt="Leon Shimizu"
            width="640"
            height="800"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="font-mono-label section-label">Built in Guam</h2>
          <blockquote>
            “Local teams deserve software shaped around their real work.”
          </blockquote>
          <p className="mt-6 text-slate-600">
            <strong className="text-slate-950">Leon Shimizu</strong>
            <br />
            Founder, Shimizu Technology &amp; Code School of Guam
          </p>
          <p className="mt-5 text-slate-600">
            We help local teams with websites, business software, and the tools
            behind their daily work. We start by understanding what needs to
            improve, then configure, connect, or build a solution with the
            people who will use it.
          </p>
        </div>
      </div>
    </section>
  );
}
