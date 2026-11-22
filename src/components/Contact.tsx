import { type FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { track } from "../lib/analytics";
import {
  CONTACT_TOPICS,
  onContactTopicSelected,
  resolveContactTopic,
  type ContactTopic,
} from "../lib/contactTopic";

type SubmitState = "idle" | "submitting" | "success" | "error";

type Field = "name" | "contact" | "message";

export default function Contact() {
  const [topic, setTopic] = useState<ContactTopic | "">(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return resolveContactTopic(params.get("topic"));
  });
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [invalidFields, setInvalidFields] = useState<Field[]>([]);
  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    contact: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return onContactTopicSelected((selected) => {
      setTopic(selected);
      if (submitState === "success") {
        setSubmitState("idle");
      }
    });
  }, [submitState]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError("");

    const trimmedName = name.trim();
    const trimmedContact = contactInfo.trim();
    const trimmedMessage = message.trim();

    const missing = (
      [
        ["name", trimmedName],
        ["contact", trimmedContact],
        ["message", trimmedMessage],
      ] as const
    )
      .filter(([, value]) => !value)
      .map(([field]) => field);
    setInvalidFields(missing);

    if (missing.length > 0) {
      setValidationError(
        "Please fill in your name, how to reach you, and a short note about what you want to improve.",
      );
      fieldRefs[missing[0]].current?.focus();
      return;
    }

    setSubmitState("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    formData.forEach((value, key) => body.append(key, String(value)));

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      track("contact_form_submitted", { topic: topic || "unspecified" });
      setName("");
      setContactInfo("");
      setMessage("");
      setSubmitState("success");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section id="contact" className="contact-band site-section">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <div>
            <p className="font-mono-label text-xs text-[var(--accent-on-dark)]">
              Next step
            </p>
            <h2 className="mt-3 text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Tell us what you want to improve.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#b8c4d4] sm:text-lg">
              Start with a short note or a 20–30-minute call. Whether you need a
              clearer website, a custom tool, or steady ongoing support, we will
              talk through your current setup first.
            </p>

            <div className="mt-6 rounded-xl border border-[#263244] bg-[#131a27] p-4 text-sm leading-relaxed text-[#b8c4d4]">
              <p className="font-bold text-white">What happens next</p>
              <p className="mt-1">
                Leon replies within 1 business day (Guam time) to suggest a
                quick call or meeting. There is no charge for the first
                conversation or a concise proposal.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href="mailto:ShimizuTechnology@gmail.com?subject=Business%20conversation"
                onClick={() => track("contact_email_clicked")}
                className="contact-direct-link"
              >
                <small>Email us</small>
                <strong>ShimizuTechnology@gmail.com</strong>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="tel:+16714830219"
                onClick={() => track("contact_phone_clicked")}
                className="contact-direct-link"
              >
                <small>Call us</small>
                <strong>(671) 483-0219</strong>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="contact-form-card rounded-2xl border border-[#dce1e8] bg-white p-6 text-[#171d27] shadow-xl sm:p-8">
            {submitState === "success" ? (
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="py-6 text-center"
              >
                <CheckCircle2
                  className="mx-auto h-11 w-11 text-[var(--action-primary)]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-2xl font-bold text-slate-950">
                  Note received.
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                  Thanks for reaching out. Leon will reply within 1 business day
                  (Guam time) to suggest a time to talk.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitState("idle")}
                  className="button-secondary mt-6"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form
                name="business-inquiry"
                aria-label="Send a project note"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                noValidate
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="business-inquiry" />
                <input type="hidden" name="topic" value={topic} />
                <p className="hidden" aria-hidden="true">
                  <label>
                    Do not fill this out:{" "}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div>
                  <p className="text-sm font-bold text-slate-900" id="contact-topic-label">
                    Topic <span className="font-normal text-slate-500">(optional)</span>
                  </p>
                  <div
                    role="group"
                    aria-labelledby="contact-topic-label"
                    className="mt-2.5 flex flex-wrap gap-2"
                  >
                    {CONTACT_TOPICS.map((item) => {
                      const active = topic === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setTopic(active ? "" : item)}
                          className="topic-chip"
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-bold text-slate-900"
                    >
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      ref={fieldRefs.name}
                      aria-invalid={invalidFields.includes("name") || undefined}
                      aria-describedby={invalidFields.includes("name") ? "contact-form-error" : undefined}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last name"
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-950 placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-info"
                      className="block text-sm font-bold text-slate-900"
                    >
                      Email or phone
                    </label>
                    <input
                      id="contact-info"
                      ref={fieldRefs.contact}
                      aria-invalid={invalidFields.includes("contact") || undefined}
                      aria-describedby={invalidFields.includes("contact") ? "contact-form-error" : undefined}
                      name="contact"
                      type="text"
                      required
                      autoComplete="email"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="you@company.com or (671)..."
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-950 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-bold text-slate-900"
                  >
                    What would you like to improve?
                  </label>
                  <textarea
                    id="contact-message"
                    ref={fieldRefs.message}
                    aria-invalid={invalidFields.includes("message") || undefined}
                    aria-describedby={invalidFields.includes("message") ? "contact-form-error" : undefined}
                    name="message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="For example: updating our website, replacing spreadsheet tracking, or connecting tools we already use."
                    className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-950 placeholder:text-slate-500"
                  />
                </div>

                {validationError && (
                  <div
                    id="contact-form-error"
                    role="alert"
                    className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-950"
                  >
                    {validationError}
                  </div>
                )}

                {submitState === "error" && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
                  >
                    We could not send your note right now. Please try again, or
                    email{" "}
                    <a
                      href="mailto:ShimizuTechnology@gmail.com?subject=Business%20conversation"
                      className="font-bold underline"
                    >
                      ShimizuTechnology@gmail.com
                    </a>{" "}
                    or call{" "}
                    <a href="tel:+16714830219" className="font-bold underline">
                      (671) 483-0219
                    </a>
                    .
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="button-primary w-full disabled:cursor-wait disabled:opacity-75"
                >
                  {submitState === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending note…
                    </>
                  ) : (
                    <>
                      Send note <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-xs leading-relaxed text-slate-600">
                  No finished specification needed. Please leave sensitive
                  account or customer data out of your first note.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
