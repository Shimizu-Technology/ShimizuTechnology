import { usePostHog } from 'posthog-js/react';
import { ArrowRight, GraduationCap, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const posthog = usePostHog();

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--action-primary)] site-section text-white">
      <div className="relative z-10 site-container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono-label text-xs text-blue-100">Start a conversation</p>
            <h2 className="mt-4 max-w-3xl section-title">Where could technology make things easier?</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100">Your website, your tools, or a process that takes too much manual work—tell us what you&apos;d like to improve.</p>
          </div>

          <div className="rounded-xl border border-white/20 bg-white p-6 text-slate-950 shadow-xl shadow-blue-950/15 sm:p-8">
            <p className="font-mono-label text-xs text-blue-700">Talk with us</p>
            <h3 className="mt-3 text-2xl font-bold">Start with a short note.</h3>
            <p className="mt-3 leading-relaxed text-slate-600">Tell us a little about your business and what you&apos;d like help with. We can arrange a 20–30-minute call or meeting. You don&apos;t need a finished specification.</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">There&apos;s no charge for the first conversation or a concise proposal based on it. If deeper investigation is needed, we agree on its scope and fee first.</p>
            <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-7">
              <a href="mailto:ShimizuTechnology@gmail.com?subject=Business%20conversation" onClick={() => posthog.capture('contact_email_clicked')} className="button-primary"><Mail className="h-4 w-4" /> Email to start a conversation <ArrowRight className="h-4 w-4" /></a>
              <a href="tel:+16714830219" onClick={() => posthog.capture('contact_phone_clicked')} className="button-secondary"><Phone className="h-4 w-4" /> Call (671) 483-0219</a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">Please leave sensitive account or customer data out of your first message.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-blue-100 sm:flex-row sm:items-center sm:justify-between">
          <span>Looking to learn software development?</span>
          <a href="https://codeschoolofguam.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-white"><GraduationCap className="h-4 w-4" /> Visit Code School of Guam ↗</a>
        </div>
      </div>
    </section>
  );
}
