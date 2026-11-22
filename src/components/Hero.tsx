import { ArrowRight, Check } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { portfolioCounts } from "../data";

function PayrollDemo() {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;
    let visible = false;
    const update = () => {
      if (visible && !document.hidden && !userPaused.current)
        void el.play().catch((error: DOMException) => {
          // Visibility changes can cancel a pending play without changing intent.
          if (error.name !== "AbortError") setPlaying(false);
        });
      else el.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    // Include the control bar and avoid transformed video intersection differences.
    observer.observe(frame.current ?? el);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      el.pause();
    };
  }, [reduced]);
  return (
    <section
      className="motion-product"
      aria-label="Cornerstone Payroll product view"
    >
      <div className="site-container">
        <div className="motion-frame-wrap" ref={frame}>
          <div className="motion-frame" data-tilt>
            <div className="motion-frame-bar">
              <span>Cornerstone Payroll · Demo</span>
              {!reduced && (
                <button
                  type="button"
                  aria-controls="payroll-demo"
                  aria-label={`${playing ? "Pause" : "Play"} Payroll demo video`}
                  onClick={() => {
                    const el = video.current;
                    if (!el) return;
                    // Offscreen pauses must not turn an intended Pause click into Play.
                    userPaused.current = playing;
                    if (playing) {
                      el.pause();
                      setPlaying(false);
                    } else {
                      void el.play().catch(() => setPlaying(false));
                    }
                  }}
                >
                  {playing ? "Pause" : "Play"}
                </button>
              )}
            </div>
            {reduced ? (
              <img
                className="motion-video"
                src="/images/motion/payroll-demo-v5-poster.webp"
                alt="Cornerstone Payroll pay-run summary showing demo data with fictional company and employee names"
                width="1600"
                height="1000"
              />
            ) : (
              <video
                ref={video}
                id="payroll-demo"
                className="motion-video"
                width="1600"
                height="1000"
                muted
                loop
                playsInline
                preload="none"
                poster="/images/motion/payroll-demo-v5-poster.webp"
                aria-label="Cornerstone Payroll demo with fictional data (all names fictional): enter hours, calculate, review, approve, commit payroll, and prepare checks"
                onPlay={() => {
                  // A late play event must never undo an explicit user pause.
                  if (userPaused.current) video.current?.pause();
                  else setPlaying(true);
                }}
              >
                <source
                  src="/images/motion/payroll-demo-v5.mp4"
                  type="video/mp4"
                />
                <source
                  src="/images/motion/payroll-demo-v5.webm"
                  type="video/webm"
                />
              </video>
            )}
          </div>
          <div className="motion-chip">
            <Check size={24} aria-hidden="true" />
            <div>
              Pay period reviewed
              <small>Calculations checked before commit</small>
            </div>
          </div>
        </div>
        <div className="motion-caption">
          <p>
            <strong>Cornerstone Payroll</strong> · Guam payroll and firm
            operations, live for Cornerstone Accounting
          </p>
          <p>Demo data · all names fictional</p>
        </div>
      </div>
    </section>
  );
}
export default function Hero() {
  return (
    <>
      <section className="motion-hero" id="top">
        <div className="motion-grid" aria-hidden="true" />
        <div className="motion-grid-spot" aria-hidden="true" />
        <div className="site-container">
          <p className="font-mono-label section-label">
            Guam-built software studio
          </p>
          <h1>
            {"Technology built for how your business"
              .split(" ")
              .map((word, i) => (
                <Fragment key={i}>
                  <span className="motion-word">
                    <span style={{ animationDelay: `${i * 30}ms` }}>
                      {word}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
            <span className="motion-accent motion-word">
              <span style={{ animationDelay: "210ms" }}>actually works.</span>
            </span>
          </h1>
          <div className="motion-hero-row">
            <p>
              Improve your online presence and make everyday work easier through
              websites, software, and automation. We start with your needs, then
              improve the tools you have or build something new.
            </p>
            <div>
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="button-primary">
                  Start a conversation{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#projects" className="button-secondary">
                  See the work
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                A 20–30-minute call or meeting to explore where we can help.
              </p>
            </div>
          </div>
        </div>
      </section>
      <PayrollDemo />
      <section className="motion-stats" aria-label="Portfolio at a glance">
        <div className="site-container">
          {[
            [portfolioCounts.total, "Products & platforms built"],
            [4, "AI systems live"],
            [portfolioCounts.appStoreLaunches, "App Store launches"],
          ].map(([n, label]) => (
            <div key={label}>
              <strong>{n}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
