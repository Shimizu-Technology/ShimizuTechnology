import { usePostHog } from 'posthog-js/react';
import { ArrowRight, GraduationCap, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const posthog = usePostHog();

  return (
    <section id="contact" className="relative overflow-hidden bg-blue-700 py-16 text-white md:py-24 lg:py-28">
      <div className="surface-grid absolute inset-0 opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono-label text-xs text-blue-100">Start a conversation</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl lg:text-6xl">Bring us the workflow that should work better.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100">Tell us what your team needs. We&apos;ll help clarify the opportunity and map a practical path to launch.</p>
          </div>

          <div className="rounded-xl border border-white/20 bg-white p-6 text-slate-950 shadow-xl shadow-blue-950/15 sm:p-8">
            <p className="font-mono-label text-xs text-blue-700">Project inquiries</p>
            <h3 className="mt-3 text-2xl font-bold">Start with a short note.</h3>
            <p className="mt-3 leading-relaxed text-slate-600">Tell us who uses the current workflow, what takes too much time, and what you want to improve. You don&apos;t need a finished specification.</p>
            <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-7">
              <a href="mailto:ShimizuTechnology@gmail.com?subject=Project%20inquiry" onClick={() => posthog.capture('contact_email_clicked')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><Mail className="h-4 w-4" /> Email about a project <ArrowRight className="h-4 w-4" /></a>
              <a href="tel:+16714830219" onClick={() => posthog.capture('contact_phone_clicked')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-700 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><Phone className="h-4 w-4" /> Call (671) 483-0219</a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">Please leave sensitive account or customer data out of your first message.</p>
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
