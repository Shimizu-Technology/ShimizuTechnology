import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Home,
  Keyboard,
  Mail,
  Power,
  ShieldCheck,
  Tv,
  Volume2,
  Wifi,
} from 'lucide-react';
import shimizuLogo from '../assets/ShimizuTechnologyLogo.jpg';

type HafaRemoteSiteProps = {
  pathname: string;
};

const baseUrl = 'https://shimizu-technology.com/hafa-remote';
const supportEmail = 'ShimizuTechnology@gmail.com';
const landingFeatures = [
  { icon: Wifi, title: 'Local by design', copy: 'Commands stay between your iPhone and television on the same Wi-Fi network.' },
  { icon: Volume2, title: 'Everyday controls', copy: 'D-pad, select, volume, mute, home, back, playback, and power off.' },
  { icon: Keyboard, title: 'Type from iPhone', copy: 'Use the familiar iPhone keyboard when the active TV screen accepts text.' },
  { icon: ShieldCheck, title: 'Honest status', copy: 'Clear pairing, reconnecting, offline, and permission states—never fake success.' },
];

function usePageMetadata(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${baseUrl}${path}`;
  }, [description, path, title]);
}

function BrandMark() {
  return (
    <a
      href="/hafa-remote"
      className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#07101f]"
      aria-label="Hafa Remote home"
    >
      <span className="grid h-10 w-10 place-items-center rounded-[14px] border border-cyan-200/30 bg-cyan-300 text-[#07101f] shadow-[0_10px_30px_-12px_rgba(103,232,249,0.8)]">
        <Tv className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span>
        <span className="block text-base font-extrabold tracking-tight text-white">Hafa Remote</span>
        <span className="font-mono-label block text-[9px] text-slate-400">by Shimizu Technology</span>
      </span>
    </a>
  );
}

function Header() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '');

  return (
    <header className="border-b border-white/10 bg-[#07101f] text-white">
      <nav className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Hafa Remote">
        <BrandMark />
        <div className="flex items-center gap-1 text-sm font-semibold text-slate-300 sm:gap-2">
          <a aria-current={normalizedPath === '/hafa-remote/support' ? 'page' : undefined} className="rounded-md px-3 py-2 hover:bg-white/5 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white" href="/hafa-remote/support">Support</a>
          <a aria-current={normalizedPath === '/hafa-remote/privacy' ? 'page' : undefined} className="rounded-md px-3 py-2 hover:bg-white/5 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white" href="/hafa-remote/privacy">Privacy</a>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#07101f] py-9 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <a href="/" className="inline-flex items-center gap-3 text-sm font-semibold text-slate-300 hover:text-white">
          <img src={shimizuLogo} alt="" className="h-8 w-8 rounded-full border border-white/10 object-contain" />
          Shimizu Technology
        </a>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
          <a className="hover:text-white" href="/hafa-remote">Hafa Remote</a>
          <a className="hover:text-white" href="/hafa-remote/support">Support</a>
          <a className="hover:text-white" href="/hafa-remote/privacy">Privacy</a>
        </div>
        <span className="text-xs text-slate-500">© {new Date().getFullYear()} Shimizu Technology</span>
      </div>
    </footer>
  );
}

function RemotePreview() {
  const directionClass = 'grid h-12 w-12 place-items-center rounded-full text-slate-300';

  return (
    <div className="relative mx-auto w-full max-w-[342px]" role="img" aria-label="Illustration of the Hafa Remote controls">
      <div className="absolute -inset-10 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="premium-shadow relative overflow-hidden rounded-[42px] border border-white/15 bg-[#0d192d] p-6 shadow-2xl shadow-cyan-950/50">
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <p className="font-mono-label text-[9px] text-cyan-300">Living room</p>
            <p className="mt-1 text-lg font-bold text-white">Samsung Q70A</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Connected</p>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-full border border-red-300/20 bg-red-400/10 text-red-200">
            <Power className="h-5 w-5" />
          </div>
        </div>

        <div className="mx-auto mt-7 grid h-48 w-48 grid-cols-3 grid-rows-3 place-items-center rounded-full border border-white/10 bg-[#07101f] shadow-inner shadow-black/30">
          <span />
          <span className={directionClass}><ChevronUp /></span>
          <span />
          <span className={directionClass}><ChevronLeft /></span>
          <span className="grid h-16 w-16 place-items-center rounded-full border border-cyan-200/30 bg-cyan-300 font-bold text-[#07101f] shadow-lg shadow-cyan-950">OK</span>
          <span className={directionClass}><ChevronRight /></span>
          <span />
          <span className={directionClass}><ChevronDown /></span>
          <span />
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3 text-slate-200">
          {[Home, Volume2, Keyboard].map((Icon, index) => (
            <span key={index} className="grid h-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Icon className="h-5 w-5" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  usePageMetadata(
    'Hafa Remote — Simple Samsung TV control',
    'A straightforward iPhone remote for compatible Samsung smart TVs. No account, ads, tracking, backend, or subscription.',
    '',
  );

  return (
    <>
      <Header />
      <main>
        <section className="surface-grid relative overflow-hidden bg-[#07101f] text-white">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-300/[0.07] blur-[120px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div>
              <p className="font-mono-label flex items-center gap-3 text-xs text-cyan-300"><span className="h-px w-8 bg-cyan-300" /> Private iPhone testing</p>
              <h1 className="mt-7 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[4.65rem]">
                Your Samsung TV remote. <span className="text-cyan-300">Nothing in the way.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                Hafa Remote puts everyday controls on your iPhone without an account, advertising, tracking, or a weekly subscription.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="/hafa-remote/support" className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-300 px-6 py-3.5 font-bold text-[#07101f] transition hover:-translate-y-0.5 hover:bg-cyan-200">
                  Setup and support <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/hafa-remote/privacy" className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                  Read the privacy policy
                </a>
              </div>
              <div className="mt-11 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {['No account', 'No ads', 'No tracking', 'No subscription'].map((item) => (
                  <div key={item} className="bg-[#0a1628] px-3 py-4 text-center text-xs font-bold text-slate-200">{item}</div>
                ))}
              </div>
            </div>
            <RemotePreview />
          </div>
        </section>

        <section className="bg-[#f7f8fa] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-mono-label text-xs text-cyan-700">Built for the daily job</p>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl">Open it. Connect. Control.</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">The controls you reach for most, organized around one-handed use and a truthful connection state.</p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
                {landingFeatures.map(({ icon: FeatureIcon, title, copy }) => {
                  return (
                    <article key={title} className="bg-white p-7 sm:p-8">
                      <FeatureIcon className="h-6 w-6 text-cyan-700" />
                      <h3 className="mt-6 text-xl font-bold text-slate-950">{title}</h3>
                      <p className="mt-3 leading-relaxed text-slate-600">{copy}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono-label text-xs text-slate-500">Compatibility note</p>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-950 sm:text-3xl">Samsung-first, tested before promised.</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">The first release is for compatible Samsung smart TVs with secure local-network control. Power on is not currently supported. Hafa Remote is independent and is not affiliated with or endorsed by Samsung Electronics.</p>
            </div>
            <a href={`mailto:${supportEmail}?subject=Hafa%20Remote%20question`} className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 font-bold text-slate-800 hover:border-cyan-700 hover:text-cyan-800">
              Ask a question <Mail className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DocumentPage({ eyebrow, title, intro, children, metadata }: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  metadata: { title: string; description: string; path: string };
}) {
  usePageMetadata(metadata.title, metadata.description, metadata.path);

  return (
    <>
      <Header />
      <main className="bg-[#f7f8fa]">
        <section className="border-b border-white/10 bg-[#07101f] py-14 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <a href="/hafa-remote" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"><ArrowLeft className="h-4 w-4" /> Hafa Remote</a>
            <p className="font-mono-label mt-10 text-xs text-slate-400">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] sm:text-6xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{intro}</p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
          <article className="hafa-document rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.55)] sm:p-10">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SupportPage() {
  return (
    <DocumentPage
      eyebrow="Support"
      title="Get connected and back to watching."
      intro="Hafa Remote works locally, so most setup issues come down to Wi-Fi access, the TV approval prompt, or the television being asleep."
      metadata={{ title: 'Hafa Remote Support', description: 'Setup, troubleshooting, compatibility, and contact information for Hafa Remote.', path: '/support' }}
    >
      <h2>Set up your TV</h2>
      <ol>
        <li>Turn on the Samsung TV and connect your iPhone to the same non-guest Wi-Fi network.</li>
        <li>On the TV, open <strong>Settings → General → Network → Network Status</strong> and note its private IPv4 address. Menu wording can vary by model.</li>
        <li>Open Hafa Remote, choose <strong>Add Samsung TV</strong>, and enter that address.</li>
        <li>When the television asks whether to allow Hafa Remote, choose <strong>Allow</strong>.</li>
        <li>Wait for the connected status before using the remote.</li>
      </ol>

      <h2>If the TV does not connect</h2>
      <ul>
        <li>Confirm both devices are on the same normal Wi-Fi network. Guest networks often prevent devices from seeing each other.</li>
        <li>Keep the TV on during initial pairing. Power on from Hafa Remote is not currently supported.</li>
        <li>If the TV address changed, check Network Status again and add it with the current address.</li>
        <li>If approval was denied or expired, remove the saved TV in Hafa Remote and pair it again.</li>
        <li>Some Samsung models, firmware versions, and secure text fields may not accept every command.</li>
      </ul>

      <h2>Text entry</h2>
      <p>Open a text field on the television before sending text. Individual TV apps and secure fields may ignore remote text even while other controls work normally.</p>

      <h2>Contact support</h2>
      <p>Email <a href={`mailto:${supportEmail}?subject=Hafa%20Remote%20support`}>{supportEmail}</a>. Include the TV model, firmware version, iPhone model, iOS version, and the connection message shown in Hafa Remote. Do not send your pairing token, Wi-Fi password, or other credentials.</p>
    </DocumentPage>
  );
}

function PrivacyPage() {
  return (
    <DocumentPage
      eyebrow="Privacy policy · Effective September 4, 2026"
      title="Your remote stays in your home."
      intro="Hafa Remote has no account, advertising, tracking, analytics SDK, backend, or subscription. Shimizu Technology does not collect data from the iOS app."
      metadata={{ title: 'Hafa Remote Privacy Policy', description: 'How Hafa Remote handles TV information, pairing credentials, typed text, and local-network access.', path: '/privacy' }}
    >
      <h2>Data we collect</h2>
      <p><strong>None.</strong> Hafa Remote does not send personal information, television information, usage activity, typed text, or pairing credentials to Shimizu Technology or an advertising or analytics service.</p>

      <h2>Information kept on your iPhone</h2>
      <p>The app stores the television name, model details made available by the TV, local network address, observed capabilities, and recent connection information on your device. Pairing credentials are stored separately in Apple Keychain. This information is used only to reconnect and show the correct controls.</p>

      <h2>Local-network communication</h2>
      <p>Remote commands and text you choose to send travel directly from your iPhone to the selected television over your local Wi-Fi network. Typed text is not saved by Hafa Remote or written to app logs. The app requests iOS Local Network permission because this direct connection cannot work without it.</p>

      <h2>Deleting local information</h2>
      <p>Removing a television in Hafa Remote deletes its saved device record and pairing credential. Remove each saved television in the app before uninstalling if you want those credentials explicitly deleted.</p>

      <h2>Apple services</h2>
      <p>Apple may process App Store, TestFlight, or opt-in diagnostic information under Apple’s own policies. Hafa Remote does not add a third-party crash-reporting or analytics SDK.</p>

      <h2>This website</h2>
      <p>This policy describes the Hafa Remote iOS app. The public website hosting this policy may create routine security and delivery logs through its hosting and content-delivery providers. The Hafa Remote pages do not load Shimizu Technology’s product analytics provider.</p>

      <h2>Changes and contact</h2>
      <p>If app behavior changes in a way that affects privacy, this policy and the App Store privacy answers will be updated before that release. Questions can be sent to <a href={`mailto:${supportEmail}?subject=Hafa%20Remote%20privacy`}>{supportEmail}</a>.</p>
    </DocumentPage>
  );
}

function NotFoundPage() {
  usePageMetadata('Page not found — Hafa Remote', 'The requested Hafa Remote page could not be found.', '/not-found');

  return (
    <>
      <Header />
      <main className="grid min-h-[62vh] place-items-center bg-[#f7f8fa] px-5 py-16 text-center">
        <div>
          <p className="font-mono-label text-xs text-cyan-700">404</p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-950">That page is not on this remote.</h1>
          <a href="/hafa-remote" className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#07101f] px-5 py-3 font-bold text-white">Return to Hafa Remote <ArrowRight className="h-4 w-4" /></a>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function HafaRemoteSite({ pathname }: HafaRemoteSiteProps) {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  if (normalizedPath === '/hafa-remote') return <LandingPage />;
  if (normalizedPath === '/hafa-remote/support') return <SupportPage />;
  if (normalizedPath === '/hafa-remote/privacy') return <PrivacyPage />;
  return <NotFoundPage />;
}
