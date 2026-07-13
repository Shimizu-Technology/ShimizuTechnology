import { usePostHog } from 'posthog-js/react';
import { Mail, Phone, GraduationCap } from 'lucide-react';

export default function Contact() {
  const posthog = usePostHog();

  return (
    <section id="contact" className="relative overflow-hidden bg-blue-600 py-16 text-white md:py-24 lg:py-28">
      <div className="surface-grid absolute inset-0 opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="font-mono-label text-xs text-blue-100">Start a conversation</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl lg:text-6xl">
              Bring us the workflow that should work better.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-blue-100">We’ll help you clarify the opportunity, choose the right level of solution, and map a practical path to launch.</p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:ShimizuTechnology@gmail.com"
              onClick={() => posthog.capture('contact_email_clicked')}
              className="flex items-center justify-between gap-4 rounded-lg bg-white p-5 text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-blue-600" /><div><div className="font-bold">Email the studio</div><div className="break-all text-xs text-slate-500 sm:text-sm">ShimizuTechnology@gmail.com</div></div></div>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="tel:+16714830219"
              onClick={() => posthog.capture('contact_phone_clicked')}
              className="flex items-center justify-between gap-4 rounded-lg border border-white/20 bg-white/10 p-5 text-white transition hover:bg-white/15"
            >
              <div className="flex items-center gap-4"><Phone className="h-5 w-5" /><div><div className="font-bold">Call directly</div><div className="text-sm text-blue-100">(671) 483-0219</div></div></div>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-blue-100 sm:flex-row sm:items-center sm:justify-between">
          <span>Looking to learn software development?</span>
          <a href="https://codeschoolofguam.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-white"><GraduationCap className="h-4 w-4" /> Visit Code School of Guam ↗</a>
        </div>
      </div>
    </section>
  );
}
