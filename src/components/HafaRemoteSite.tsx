import { useEffect, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Home, Keyboard, Power, ShieldCheck, Tv, Volume2, Wifi,
} from 'lucide-react';

type HafaRemoteSiteProps = { pathname: string };
const baseUrl = 'https://shimizu-technology.com/hafa-remote';
const supportEmail = 'ShimizuTechnology@gmail.com';
const iconUrl = '/hafa-remote-icon.png';
const supportLink = 'mailto:' + supportEmail + '?subject=Hafa%20Remote%20support';

const landingFeatures = [
  { icon: Volume2, title: 'Everyday controls', copy: 'Navigation, volume, mute, Home, Back, and playback, with an optional swipe surface and accessible Buttons fallback.' },
  { icon: Keyboard, title: 'Text from your iPhone', copy: 'Type when the current TV field accepts remote text. Individual apps and secure fields can limit text entry.' },
  { icon: Home, title: 'Your TVs, your favorites', copy: 'Name saved TVs, add rooms, and keep favorites with their TV. App shortcuts use the list a compatible TV returns.' },
  { icon: ShieldCheck, title: 'Clear connection status', copy: 'See connected, reconnecting, and offline states. A sent request does not claim that the TV carried it out.' },
];

function usePageMetadata(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    const setMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      let element = document.querySelector<HTMLMetaElement>('meta[' + attribute + '="' + key + '"]');
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', baseUrl + path);
    setMeta('property', 'og:image', 'https://shimizu-technology.com' + iconUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', 'https://shimizu-technology.com' + iconUrl);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = baseUrl + path;
    // The document heading exists only after React renders, after the browser's initial hash lookup.
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      target.focus({ preventScroll: true });
    }
  }, [description, path, title]);
}

function Header() {
  const path = window.location.pathname.replace(/\/+$/, '');
  return (
    <header className="hafa-header">
      <a className="hafa-skip-link" href="#hafa-main">Skip to content</a>
      <nav className="hafa-header-inner" aria-label="Hafa Remote">
        <a href="/hafa-remote" className="hafa-brand" aria-label="Hafa Remote home">
          <img src={iconUrl} width="44" height="44" alt="" />
          <span><strong>Hafa Remote</strong><small>by Shimizu Technology</small></span>
        </a>
        <div className="hafa-nav-links">
          <a aria-current={path === '/hafa-remote/support' ? 'page' : undefined} href="/hafa-remote/support">Support</a>
          <a aria-current={path === '/hafa-remote/privacy' ? 'page' : undefined} href="/hafa-remote/privacy">Privacy</a>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="hafa-footer">
      <div className="hafa-footer-inner">
        <a href="/">Shimizu Technology</a>
        <nav aria-label="Product information">
          <a href="/hafa-remote">Hafa Remote</a>
          <a href="/hafa-remote/support">Support</a>
          <a href="/hafa-remote/privacy">Privacy</a>
        </nav>
        <small>© {new Date().getFullYear()} Shimizu Technology</small>
      </div>
    </footer>
  );
}

function RemotePreview() {
  return (
    <figure className="hafa-remote-preview">
      <div role="img" aria-label="Illustration of Hafa Remote navigation and volume controls, shown as an offline preview">
        <div className="hafa-preview-heading">
          <div><small>Offline preview</small><strong>Demo TV</strong><span>No TV connected</span></div>
          <span className="hafa-preview-power"><Power aria-hidden="true" size={22} /></span>
        </div>
        <div className="hafa-preview-pad" aria-hidden="true">
          <span /><span className="hafa-preview-direction"><ChevronUp /></span><span />
          <span className="hafa-preview-direction"><ChevronLeft /></span>
          <span className="hafa-preview-select">OK</span>
          <span className="hafa-preview-direction"><ChevronRight /></span>
          <span /><span className="hafa-preview-direction"><ChevronDown /></span><span />
        </div>
        <div className="hafa-preview-volume" aria-hidden="true">
          <small>Volume</small>
          <div><span>−</span><Volume2 size={24} /><span>+</span></div>
        </div>
      </div>
      <figcaption>Control illustration. Try the labeled offline demo in the app.</figcaption>
    </figure>
  );
}

function LandingPage() {
  usePageMetadata(
    'Hafa Remote — Samsung TV remote',
    'A local iPhone remote for compatible Samsung TVs. No account, ads, tracking, backend, or subscription. App Store release in preparation.',
    '',
  );
  return (
    <>
      <Header />
      <main id="hafa-main" tabIndex={-1}>
        <section className="hafa-hero">
          <div className="hafa-hero-inner">
            <div>
              <p className="hafa-eyebrow">App Store release for Samsung TVs in preparation</p>
              <h1>Your Samsung TV. <span>Within reach.</span></h1>
              <p className="hafa-hero-copy">Everyday controls on your iPhone, with a calm native interface and no account, advertising, tracking, or subscription.</p>
              <p className="hafa-availability">Hafa Remote is currently in private testing. It is not available on the App Store yet.</p>
              <div className="hafa-actions">
                <a href="/hafa-remote/support" className="hafa-button">Setup and support <ArrowRight size={18} aria-hidden="true" /></a>
                <a href="/hafa-remote/privacy" className="hafa-button hafa-button-secondary">Read the privacy policy</a>
              </div>
              <p className="hafa-network-note"><Wifi size={18} aria-hidden="true" /> Your iPhone uses Wi-Fi. Your TV can use Wi-Fi or Ethernet on the same home network.</p>
            </div>
            <RemotePreview />
          </div>
        </section>
        <section className="hafa-features">
          <div className="hafa-content-width">
            <p className="hafa-eyebrow">Made for the daily job</p>
            <h2>Open it. Connect. Control.</h2>
            <div className="hafa-feature-list">
              {landingFeatures.map(({ icon: Icon, title, copy }) => (
                <article key={title}>
                  <Icon size={24} aria-hidden="true" />
                  <h3>{title}</h3><p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="hafa-compatibility hafa-content-width">
          <Tv size={28} aria-hidden="true" />
          <div><h2>Compatible Samsung TVs. Model and firmware matter.</h2>
            <p>The planned public release supports compatible Samsung Tizen TVs. Available controls depend on the TV and its local-control service. Power-on varies with standby settings and the network, and is not guaranteed.</p>
            <p>Hafa Remote is independently developed by Shimizu Technology and is not affiliated with or endorsed by Samsung Electronics.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DocumentPage({ eyebrow, title, intro, children, metadata }: {
  eyebrow: string; title: string; intro: string; children: ReactNode;
  metadata: { title: string; description: string; path: string };
}) {
  usePageMetadata(metadata.title, metadata.description, metadata.path);
  return (
    <>
      <Header />
      <main id="hafa-main" tabIndex={-1}>
        <section className="hafa-document-heading">
          <div className="hafa-document-width">
            <a href="/hafa-remote" className="hafa-back-link"><ArrowLeft size={16} aria-hidden="true" /> Hafa Remote</a>
            <p className="hafa-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p>
          </div>
        </section>
        <div className="hafa-document-width hafa-document-wrap">
          <article className="hafa-document">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SupportPage() {
  return (
    <DocumentPage
      eyebrow="Samsung setup and support"
      title="Get connected and back to watching."
      intro="Start with a compatible Samsung TV on your home network. Help is available in the app before pairing."
      metadata={{ title: 'Hafa Remote Support', description: 'Samsung setup, connection recovery, offline demo, optional diagnostics, and support for Hafa Remote.', path: '/support' }}
    >
      <nav className="hafa-document-links" aria-label="Support topics">
        <a href="#setup">Set up</a><a href="#recovery">Connection help</a><a href="#diagnostics">Diagnostics</a><a href="#contact">Contact</a>
      </nav>
      <h2 id="setup" tabIndex={-1}>Set up your Samsung TV</h2>
      <ol>
        <li>Turn on your compatible Samsung TV. Connect this iPhone to home Wi-Fi; the TV can use Wi-Fi or Ethernet on the same non-guest local network.</li>
        <li>Open Hafa Remote, choose <strong>Add TV</strong>, and allow Local Network access when iOS asks.</li>
        <li>Choose the intended television from the nearby list, then approve Hafa Remote on the TV by choosing <strong>Allow</strong> when prompted.</li>
        <li>Wait for the connected status before using the remote. Connected describes the control connection; TV power is shown separately when it is known.</li>
      </ol>
      <h2 id="recovery" tabIndex={-1}>If the TV does not connect</h2>
      <ul>
        <li>Check that the iPhone uses home Wi-Fi and the TV is on the same local network. Guest Wi-Fi and client isolation can prevent devices from finding each other.</li>
        <li>Choose <strong>Scan Again</strong>. If discovery still cannot find the TV, open <strong>TV not showing up?</strong> and use its private address from the TV network settings.</li>
        <li>For a saved pairing that is no longer accepted, open <strong>My TVs</strong>, select the intended TV, choose <strong>Forget TV</strong>, then <strong>Add TV</strong> and approve pairing again. Forget applies to that selected TV.</li>
        <li>Foreground reconnect attempts are bounded. Use <strong>Retry Connection</strong> or <strong>Find TV</strong> when offered.</li>
        <li>Power-on is available only for eligible saved TVs. Settings such as <strong>Power On With Mobile</strong> can help, but model, firmware, network connection, and standby behavior still matter. Use the physical remote if wake is unavailable.</li>
      </ul>
      <h2>Controls and favorites</h2>
      <p>Use Buttons for individual directions or switch to Swipe for discrete movement and tap-to-select. <strong>More Controls &amp; Favorites</strong> offers available source and tuner controls and shortcuts from a TV-returned app list. Some Samsung TVs do not provide that list. A request described as sent does not confirm the TV carried it out.</p>
      <p>For text entry, focus a field on the TV first. TV apps and secure fields may reject remote text even while ordinary controls work.</p>
      <h2>Try the remote without a TV</h2>
      <p>Open <strong>Help → Try the Remote Offline</strong>. This clearly labeled demo changes only a preview on the phone; it does not discover, pair, or contact a TV, and it does not change your saved TVs.</p>
      <h2 id="diagnostics" tabIndex={-1}>Optional diagnostics</h2>
      <p><strong>Help → Diagnostics</strong> is off by default. Enabling it records up to <strong>100 recent semantic events</strong> and coarse timings in memory on the phone. It resets to off when the app restarts.</p>
      <ol>
        <li>Enable diagnostics and reproduce the problem.</li>
        <li>Choose <strong>Preview Support Report</strong> and read the report.</li>
        <li>If you want to send it, choose <strong>Share This Report</strong> and select a destination in the system share sheet. Nothing is uploaded automatically.</li>
      </ol>
      <p>The report contains app and iOS versions, optional TV model and firmware, and event/timing categories. It excludes network addresses, device identities, TV and Wi-Fi names, pairing credentials, and entered text.</p>
      <p><strong>Clear Events</strong> or disabling diagnostics clears the live event buffer. An existing preview stays unchanged, and a copy already sent remains with its recipient.</p>
      <h2 id="contact" tabIndex={-1}>Contact support</h2>
      <p>Email <a href={supportLink}>{supportEmail}</a>. If useful, include the TV model and firmware, iPhone model, iOS version, and connection message. Sending a support report is optional.</p>
      <p>Do not send passwords, pairing credentials, device identities, or network addresses. Information you choose to send to support is received with your message and email sender details; read the <a href="/hafa-remote/privacy#support">support privacy explanation</a> before sending.</p>
    </DocumentPage>
  );
}

function PrivacyPage() {
  return (
    <DocumentPage
      eyebrow="Privacy policy"
      title="Local control. Sharing is your choice."
      intro="Hafa Remote has no account, advertising, tracking, analytics SDK, backend, subscription, or automatic diagnostic uploader."
      metadata={{ title: 'Hafa Remote Privacy Policy', description: 'Local TV data, default-off in-memory diagnostics, optional report sharing, and support reception in Hafa Remote.', path: '/privacy' }}
    >
      <h2>Ordinary local control</h2>
      <p>Remote commands and text you choose to send travel from the iPhone to the selected compatible Samsung TV on your local network. Your iPhone uses Wi-Fi; the TV can use Wi-Fi or Ethernet. Ordinary control does not send app activity or pairing credentials to Shimizu Technology or an advertising or analytics service.</p>
      <p>Typed text is not saved by Hafa Remote or written to app logs. Local Network permission enables direct communication with your TV.</p>
      <h2>Information kept on your phone</h2>
      <p>Saved TV names, optional rooms, model details, cached local addresses, observed capabilities, and per-TV favorites/preferences stay in local app storage. Pairing credentials are stored separately in Apple Keychain. These records support reconnecting, TV selection, and the controls you choose.</p>
      <h2>Optional diagnostics on the phone</h2>
      <p>Diagnostics are off by default and reset to off when the app restarts. When you enable them, the app holds at most <strong>100 semantic connection, delivery, discovery, and lifecycle events</strong> with coarse timings in memory. This buffer is not an automatic upload or an analytics service.</p>
      <p>A report includes app and iOS versions and, when available, a TV model and firmware. It excludes addresses, device identities, TV and Wi-Fi names, credentials, and entered text.</p>
      <h2>Previewing and sharing a report</h2>
      <p><strong>Preview Support Report</strong> creates a fixed copy for you to review. <strong>Share This Report</strong> opens the system share sheet; you decide whether to send that exact report and choose the recipient. The chosen recipient receives the copy you send.</p>
      <p><strong>Clear Events</strong> or turning diagnostics off clears the live in-memory events. It does not change an already-open preview or erase a copy you have already sent. Shared copies are handled by their recipients.</p>
      <h2 id="support" tabIndex={-1}>Information you send to support</h2>
      <p>If you email Shimizu Technology or send a report to our support address, we receive the message/report and the sender information your email service provides. We use that information to understand the problem and respond to your request. Please omit passwords, pairing credentials, device identities, and network addresses.</p>
      <p>Information you choose to send may include your name, email address, support-message content, and app-interaction, performance, or other diagnostic information in an attached report. It is associated with the sender of the support request and used only to troubleshoot the app and respond to you, not for tracking or advertising. Nothing is uploaded automatically.</p>
      <p>We keep support messages and report copies we control for <strong>90 days after the support issue is resolved</strong>, then delete those copies. To request earlier deletion or ask about information you have sent, email <a href={supportLink}>{supportEmail}</a>.</p>
      <p>This deletion applies to support copies we control. It does not promise immediate erasure from an email provider's recovery systems or backups.</p>
      <h2>Removing saved TV information</h2>
      <p><strong>My TVs → Forget TV</strong> removes the selected TV's saved record and its scoped pairing credential. It does not erase unrelated records. Updates can preserve older saved information, including records that the current public version does not display.</p>
      <p>Uninstalling is not a guarantee that Apple Keychain credentials are removed. Use <strong>My TVs → Forget TV</strong> before uninstalling if you want the selected TV's stored pairing credential explicitly deleted. The saved TV can be offline.</p>
      <h2>Apple services and this website</h2>
      <p>Apple may process App Store, TestFlight, or opt-in diagnostic information under Apple's own policies. Hafa Remote does not add a third-party crash-reporting or analytics SDK.</p>
      <p>This policy describes the iOS app. The website's hosting and delivery providers may create routine delivery and security logs. These Hafa Remote pages do not load Shimizu Technology's product analytics provider.</p>
      <h2>Changes and contact</h2>
      <p>We update this policy and the App Store privacy answers when the app's privacy behavior changes. Privacy questions can be sent to <a href={'mailto:' + supportEmail + '?subject=Hafa%20Remote%20privacy'}>{supportEmail}</a>.</p>
    </DocumentPage>
  );
}

function NotFoundPage() {
  usePageMetadata('Page not found — Hafa Remote', 'The requested Hafa Remote page could not be found.', '/not-found');
  return (
    <><Header /><main id="hafa-main" tabIndex={-1} className="hafa-not-found">
      <p className="hafa-eyebrow">404</p><h1>That page is not on this remote.</h1>
      <a href="/hafa-remote" className="hafa-button">Return to Hafa Remote</a>
    </main><Footer /></>
  );
}

export default function HafaRemoteSite({ pathname }: HafaRemoteSiteProps) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const page = path === '/hafa-remote' ? <LandingPage />
    : path === '/hafa-remote/support' ? <SupportPage />
      : path === '/hafa-remote/privacy' ? <PrivacyPage /> : <NotFoundPage />;
  return <div className="hafa-site">{page}</div>;
}
