import { useEffect } from "react";

// No per-frame React renders: native scroll, one rAF scroll handler, and damped pointer lerp.
export default function useHomeMotion() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (media.matches) return;
      const frame = document.querySelector<HTMLElement>("[data-tilt]");
      const statement =
        document.querySelector<HTMLElement>(".motion-statement");
      const words = Array.from(
        document.querySelectorAll<HTMLElement>("[data-fill-word]"),
      );
      const process = document.querySelector<HTMLElement>(".motion-process");
      const line = document.querySelector<HTMLElement>(".motion-process-line");
      const portrait = document.querySelector<HTMLElement>(
        ".motion-portrait img",
      );
      const steps = Array.from(
        document.querySelectorAll<HTMLElement>(".motion-step"),
      );
      const hero = document.querySelector<HTMLElement>(".motion-hero");
      const spot = document.querySelector<HTMLElement>(".motion-grid-spot");

      // Subtle rAF lerp so the teal grid spotlight glides naturally and stops when settled.
      let spotTargetX = 0;
      let spotTargetY = 0;
      let spotCurrentX = 0;
      let spotCurrentY = 0;
      let spotInitialized = false;
      let spotRaf = 0;

      const tickSpot = () => {
        spotRaf = 0;
        if (!spot) return;
        const dx = spotTargetX - spotCurrentX;
        const dy = spotTargetY - spotCurrentY;
        spotCurrentX += dx * 0.16;
        spotCurrentY += dy * 0.16;
        spot.style.transform = `translate3d(${spotCurrentX.toFixed(1)}px, ${spotCurrentY.toFixed(1)}px, 0)`;
        if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
          spotRaf = requestAnimationFrame(tickSpot);
        }
      };

      const pointer = (event: PointerEvent) => {
        if (
          !hero ||
          !spot ||
          !matchMedia("(hover: hover) and (pointer: fine)").matches
        )
          return;
        const rect = hero.getBoundingClientRect();
        spotTargetX = event.clientX - rect.left - 120;
        spotTargetY = event.clientY - rect.top - 120;
        if (!spotInitialized) {
          spotCurrentX = spotTargetX;
          spotCurrentY = spotTargetY;
          spotInitialized = true;
          spot.style.transform = `translate3d(${spotCurrentX.toFixed(1)}px, ${spotCurrentY.toFixed(1)}px, 0)`;
        }
        spot.style.opacity = "0.55";
        if (!spotRaf) spotRaf = requestAnimationFrame(tickSpot);
      };
      const leave = () => {
        if (spot) spot.style.opacity = "0";
      };
      hero?.addEventListener("pointermove", pointer);
      hero?.addEventListener("pointerleave", leave);

      let raf = 0;
      const clamp = (n: number) => Math.min(1, Math.max(0, n));
      const progress = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return clamp(
          (innerHeight * 0.85 - rect.top) / (rect.height + innerHeight * 0.25),
        );
      };
      const update = () => {
        raf = 0;
        if (frame) {
          const p = progress(frame);
          frame.style.transform = `perspective(1600px) rotateX(${(1 - p) * 18}deg) scale(${0.94 + p * 0.06})`;
        }
        if (statement) {
          const p = progress(statement);
          words.forEach((word, i) => {
            word.style.color =
              i / words.length < p
                ? "var(--statement-filled)"
                : "var(--statement-muted)";
          });
        }
        if (process && line) {
          const p = progress(process);
          steps.forEach((step, i) =>
            step.classList.toggle("on", p >= i / steps.length),
          );
          line.style.transform =
            innerWidth <= 820 ? `scaleY(${p})` : `scaleX(${p})`;
        }
        if (portrait && portrait.parentElement) {
          const p = progress(portrait.parentElement);
          portrait.style.transform = `translateY(${-8 + p * 10}%)`;
        }
      };
      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      addEventListener("scroll", schedule, { passive: true });
      addEventListener("resize", schedule);
      update();
      cleanup = () => {
        hero?.removeEventListener("pointermove", pointer);
        hero?.removeEventListener("pointerleave", leave);
        leave();
        cancelAnimationFrame(spotRaf);
        spot?.style.removeProperty("transform");
        steps.forEach((step) => step.classList.remove("on"));
        removeEventListener("scroll", schedule);
        removeEventListener("resize", schedule);
        cancelAnimationFrame(raf);
        [frame, line, portrait].forEach((el) =>
          el?.style.removeProperty("transform"),
        );
        words.forEach((word) => word.style.removeProperty("color"));
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      cleanup();
      media.removeEventListener("change", setup);
    };
  }, []);
}
