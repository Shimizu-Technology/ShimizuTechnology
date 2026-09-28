import { useState, type FormEvent } from 'react';
import { usePostHog } from 'posthog-js/react';
import { ArrowRight, GraduationCap, Mail, Phone } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const posthog = usePostHog();
  const [status, setStatus] = useState<FormStatus>('idle');

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('Inquiry could not be sent');
      form.reset();
      setStatus('sent');
      posthog.capture('project_inquiry_submitted');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-blue-700 py-16 text-white md:py-24 lg:py-28">
      <div className="surface-grid absolute inset-0 opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="font-mono-label text-xs text-blue-100">Start a conversation</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl lg:text-6xl">Bring us the workflow that should work better.</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-blue-100">Tell us what your team needs. We&apos;ll help clarify the opportunity and map a practical path to launch.</p>
            <div className="mt-9 space-y-3 border-t border-white/20 pt-7 text-sm">
              <p className="font-semibold text-white">Prefer to reach out directly?</p>
              <a href="mailto:ShimizuTechnology@gmail.com" onClick={() => posthog.capture('contact_email_clicked')} className="flex w-fit items-center gap-3 text-blue-100 underline underline-offset-4 hover:text-white"><Mail className="h-4 w-4" /> ShimizuTechnology@gmail.com</a>
              <a href="tel:+16714830219" onClick={() => posthog.capture('contact_phone_clicked')} className="flex w-fit items-center gap-3 text-blue-100 underline underline-offset-4 hover:text-white"><Phone className="h-4 w-4" /> (671) 483-0219</a>
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white p-6 text-slate-950 shadow-xl shadow-blue-950/15 sm:p-8">
            <h3 className="text-xl font-bold">Tell us about your project</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">A few details are enough to start. Please leave sensitive account or customer data out of this first message.</p>
            {status === 'sent' ? (
              <div role="status" className="mt-7 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                <strong className="block">Your message was sent.</strong>
                <span className="mt-1 block text-sm">We&apos;ll follow up using the email address you provided.</span>
                <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm font-semibold underline underline-offset-4">Send another message</button>
              </div>
            ) : (
              <form name="project-inquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submitInquiry} className="mt-7 space-y-5">
                <input type="hidden" name="form-name" value="project-inquiry" />
                <div className="hidden" aria-hidden="true"><label>Leave this blank <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-semibold">Your name <span aria-hidden="true">*</span><input name="name" type="text" required autoComplete="name" className="mt-2 w-full rounded-md border border-slate-300 px-3.5 py-3 font-normal text-slate-950 outline-none focus-visible:border-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" /></label>
                  <label className="block text-sm font-semibold">Email <span aria-hidden="true">*</span><input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-md border border-slate-300 px-3.5 py-3 font-normal text-slate-950 outline-none focus-visible:border-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" /></label>
                </div>
                <label className="block text-sm font-semibold">What are you trying to improve? <span aria-hidden="true">*</span><textarea name="project" required rows={5} className="mt-2 w-full resize-y rounded-md border border-slate-300 px-3.5 py-3 font-normal text-slate-950 outline-none focus-visible:border-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" placeholder="A short description of the workflow, users, or idea" /></label>
                {status === 'error' && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">We couldn&apos;t send that message. Please email us directly at <a className="font-semibold underline" href="mailto:ShimizuTechnology@gmail.com">ShimizuTechnology@gmail.com</a>.</p>}
                <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send project inquiry'} <ArrowRight className="h-4 w-4" /></button>
              </form>
            )}
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
