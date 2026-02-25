import { usePostHog } from 'posthog-js/react';
import { Mail, Phone, GraduationCap } from 'lucide-react';

export default function Contact() {
  const posthog = usePostHog();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <p className="text-blue-400 font-medium mb-2">Get In Touch</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let's Build Something Amazing
        </h2>
        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
          Ready to start your project? Reach out and let's discuss how we can help.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <a
            href="mailto:ShimizuTechnology@gmail.com"
            onClick={() => {
              posthog.capture('contact_email_clicked');
            }}
            className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Email Us</div>
              <div className="text-slate-400 text-sm break-all">ShimizuTechnology@gmail.com</div>
            </div>
          </a>

          <a
            href="tel:+16714830219"
            onClick={() => {
              posthog.capture('contact_phone_clicked');
            }}
            className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <div className="p-3 bg-green-500 rounded-xl flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Call Us</div>
              <div className="text-slate-400 text-sm">(671) 483-0219</div>
            </div>
          </a>
        </div>

        <p className="text-slate-400 text-sm mb-4">
          Looking to learn coding? Check out our partner program:
        </p>
        <a
          href="https://codeschoolofguam.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
        >
          <GraduationCap className="w-4 h-4 mr-2" />
          Visit Code School of Guam
        </a>
      </div>
    </section>
  );
}
