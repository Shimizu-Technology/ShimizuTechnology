import { useEffect, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

type Product = 'workouts' | 'baby';
const email = 'shimizutechnology@gmail.com';
const products = {
  workouts: {
    name: 'Håfa Workouts',
    description: 'Save workouts from videos and other sources, build training plans, and record your sessions. Free while in beta.',
    introduction: 'Keep workout sources, review extracted exercises, plan your training, and record what you actually did. Optional AI helps extract workouts and discuss your training.',
  },
  baby: {
    name: 'Håfa Baby',
    description: 'A private pregnancy and baby-care companion for parents and caregivers: saved sources, a journal, care logs, routines, and optional AI answers.',
    introduction: 'Keep pregnancy and baby-care sources, write a journal with photos and documents, log feeding, sleep and diapers, and manage routines and reminders. Optional AI answers questions using your saved information.',
  },
};

function Contact({ name }: { name: string }) {
  return <a href={`mailto:${email}?subject=${encodeURIComponent(name + ' support')}`}>{email}</a>;
}

function Deletion({ product }: { product: Product }) {
  return <>
    <h2 id="deletion" tabIndex={-1}>Account and data deletion</h2>
    <p>Håfa Recipes, Håfa Workouts and Håfa Baby share one Håfa account. Deleting the entire account from any Håfa app removes saved data across all three apps and the shared sign-in. This includes your owned recipes, training records, Baby profiles and care records, saved sources, and conversations. Export anything you want to keep first.</p>
    {product === 'workouts' ? <>
      <p>In Workouts, open Account → Account data and deletion. Choose <strong>Review Workouts-only removal</strong> to remove training data while keeping your Håfa login, Recipes and Baby data. Choose <strong>Review whole-account deletion</strong> to delete the shared account, then read and confirm the deletion.</p>
      <p>Workouts removal clears local drafts and pending training first. If the server request fails, those local drafts stay erased; retry the saved-data deletion. Follow any device-cleanup retry instructions shown in the app.</p>
    </> : <p>In Baby, open Settings. <strong>Delete my Baby data</strong> removes Baby records, files, conversations and child profiles while keeping Recipes, Workouts and your Håfa login. <strong>Delete my entire Håfa account</strong> asks you to confirm permanent deletion across the Håfa apps.</p>}
    <p>Deleting the app from your phone does not delete your server account. Account deletion erases saved account data and queues cleanup of associated uploaded files and Clerk sign-in accounts. External cleanup can finish later. Deletion cannot recall exports, screenshots or independent copies another person has already saved. Limited deletion-status records and hashed sign-in identifiers remain to complete cleanup and prevent deleted identities from being reused.</p>
    <p>If you cannot use the app, contact <Contact name={products[product].name} /> with the account email and whether you want only this product’s data removed or the entire Håfa account deleted. Do not send passwords or sign-in codes. We may need to verify account ownership before acting.</p>
  </>;
}

function Support({ product }: { product: Product }) {
  const { name } = products[product];
  return <>
    <nav className="hafa-document-links" aria-label="Support topics">
      <a href="#setup">Get started</a><a href="#imports">Import help</a><a href="#deletion">Delete data</a><a href="#contact">Contact</a>
    </nav>
    <h2 id="setup" tabIndex={-1}>Get started</h2>
    <p>{products[product].introduction}</p>
    <p>The iOS app is in private testing; there is no public App Store download link here yet.{product === 'workouts' ? ' Workouts is free while in beta.' : ''}</p>
    <ol>
      <li>Open your installed app and sign in using the same Håfa account and sign-in method you use in Recipes or the other Håfa apps.</li>
      <li>{product === 'workouts' ? 'Save a workout link or create a workout manually. Review extracted exercises, sets, reps and missing details before training.' : 'Start your private Baby space. Add a child profile if useful, save a source or journal entry, or log a care event. Child profiles do not have their own login.'}</li>
      <li>{product === 'workouts' ? 'Add workouts to your plan, follow a session, and save what you actually completed.' : 'Choose routines and reminders yourself. Review original sources and any suggested changes before saving them.'}</li>
    </ol>
    <h2>If sign-in or saved information looks wrong</h2>
    <p>Check the account and original sign-in method. A different account can show a different library. Check your connection and any pending saves before signing out. Unsynced changes may be lost when local account data is cleared.</p>
    <h2 id="imports" tabIndex={-1}>Imports and sharing from other apps</h2>
    <p>Use the source app’s Share menu and choose {name}. If it is missing, look in the share sheet’s More options, open {name} once and check that you are signed in. You can also copy a supported public link and add it inside the app.</p>
    <p>Private, deleted, blocked or incomplete posts may not import. Check that the original opens, try again with an internet connection, or add the available text or screenshots yourself. AI processing needs your permission and may be temporarily unavailable. Review warnings and the original source; missing details are not reliable instructions.</p>
    {product === 'workouts' ? <p>Check the visibility choice before saving or sharing. Public Discover workouts can be seen and saved by others. Keep personal notes out of public workout titles, exercise descriptions and source links.</p> : <p>Sharing a post into Baby saves it to your private space. AI processing is optional. Settings → <strong>Automatically organize posts I share</strong> is a separate choice that requires AI permission. Existing originals stay saved if processing is unavailable. Imported advice does not activate a care schedule or reminder.</p>}
    <h2>{product === 'workouts' ? 'Training suggestions' : 'Care and AI answers'}</h2>
    <p>{product === 'workouts' ? 'Workouts supports adult general fitness. AI extraction and coaching can make mistakes and are not medical advice or clearance to exercise.' : 'Baby is used by parents and caregivers, rather than by children. AI answers are general information, not medical advice, diagnosis, treatment or an emergency service. Check care decisions with a qualified clinician.'}</p>
    <Deletion product={product} />
    <h2 id="contact" tabIndex={-1}>Contact support</h2>
    <p>Email <Contact name={name} />. Include the app name, device, app version, what you tried and the error message. Remove personal information from screenshots. Do not send passwords, sign-in codes, or sensitive health or child information.</p>
    <p>Read the <a href={`/hafa-${product}/privacy`}>privacy policy</a> for processing and deletion details.</p>
  </>;
}

function Privacy({ product }: { product: Product }) {
  const { name } = products[product];
  return <>
    <p>Last updated: October 24, 2026. Shimizu Technology develops {name}. This policy describes the app and these product pages. Questions or requests: <Contact name={name} />.</p>
    <h2>One Håfa account</h2>
    <p>Håfa Recipes, Håfa Workouts and Håfa Baby use the same account. Clerk processes sign-in information such as your email address and authentication identifiers. Our API links your sign-in to a stable Håfa account so your saved data belongs to that account.</p>
    {product === 'workouts' ? <>
      <h2>Training information you provide</h2>
      <p>Workouts saves your training profile, goals, equipment, declared limitations, optional measurements, saved workouts and source details, plans, sessions and training history. History can include actual reps, load, duration, effort and notes. We also save your permissions, sharing choices and coach conversations to provide those features. Drafts, unsynced training and preferences can be kept on your device.</p>
      <h2>Imports and optional AI coaching</h2>
      <p>You can submit social or website links, text, images and documents. Importing a link contacts the source platform or website to retrieve available content. With AI permission accepted, OpenAI receives relevant source text, images or audio for extraction and transcription, or permitted training context and messages for coaching. AI results may be incomplete or wrong; review them before use. Manual training remains available without AI permission.</p>
      <p>Using the shared account does not automatically send your Recipes library to the Workouts coach. Optional product connections have their own permission choices.</p>
      <h2>Public Discover and sharing links</h2>
      <p>When you choose to publish to Discover, the public workout includes its title, exercises, prescribed sets, reps, timing and other workout instructions, source link and creator credit, and your publisher display name. Source cover images may also be shown. Other people can view and save this information. Your private profile, measurements, training history, Health information, coach conversations, evidence and private notes are excluded from the public projection. Anything personal you put in a public title or instruction can still become public.</p>
      <p>Separately, publishing a reviewed workout or program snapshot creates a link others can read until it expires or is revoked. Review the preview and source-link choice. Unpublishing or revoking access stops future access to that publication, but cannot remove independent copies people already saved.</p>
      <h2>Retention and Workouts-only removal</h2>
      <p>Saved workouts, source evidence, versions, plans and history remain until removed. Temporary extraction and coach uploads have expiry and cleanup controls; removing an upload does not automatically remove saved extracted text or workout versions. Workouts-only removal erases saved training data and retires sharing links. Content-free import allowance records may remain for up to 48 hours; they contain no source text, images or workout content. Whole-account deletion removes those allowance records too.</p>
      <p>Workouts is for adults pursuing general fitness. It does not diagnose, treat or provide medical clearance.</p>
    </> : <>
      <h2>Pregnancy, child and caregiver information</h2>
      <p>Baby saves the information you choose to enter: your display name and time zone; child names, birth dates or due dates; pregnancy and baby-care sources; journal entries; photos and documents; feeding, sleep and diaper logs; routines, reminders and questions; and AI conversations and results. This can include sensitive health and child information. We use it to organize, retrieve and sync your records and provide the features you request.</p>
      <p>The app is used by parents and caregivers, rather than by children. Child profiles are records within the adult’s Håfa account, not accounts or separate logins. Each application user owns their Baby data; sharing a Håfa login across apps does not create a shared caregiver household or give another account access.</p>
      <h2>Imported and shared content</h2>
      <p>Links, text and files you share into Baby are saved as private sources. Fetching a link contacts the source website or platform. Originals and available evidence are retained with saved sources; incomplete processing does not mean the original was discarded. Only submit information you are entitled to use. Baby does not publish these records to a public feed.</p>
      <p>Saving a source does not require AI permission. Automatic organization of new shares is a separate opt-in that also needs AI permission. Imported creator advice stays distinct from your observations and clinician-entered instructions. Importing never activates a medical schedule; proposed changes need your review.</p>
      <h2>Optional AI processing</h2>
      <p>AI is off until you give permission. When requested, OpenAI receives selected source text, images, audio or sampled video frames for processing. When you ask a question, it receives your question, relevant authorized Baby records and recent conversation context. Recipes and Workouts data are not included in Baby’s assistant context.</p>
      <p>You can withdraw AI permission in Settings to stop new requests. Previously saved summaries and conversations remain until deleted. AI answers are general information, not medical advice, diagnosis or treatment. AI can make mistakes. Consult a qualified clinician for care decisions; the assistant is not an emergency service.</p>
      <h2>Device storage, reminders and retention</h2>
      <p>Native apps keep private drafts, cached records, queued changes and selected files on the device for offline use. Signing out clears this account’s local files and reminders; sync or export unsaved work first. Notifications use general wording instead of journal or care details. Exports and files you share outside the app create copies under your control.</p>
      <p>Saved sources, journal entries, care records, files and conversations remain until you remove them or delete Baby data or the account. Deleting a child profile removes its name and dates and detaches its records; it does not delete the associated journal or care content. Delete those records separately, or remove your whole Baby space in Settings.</p>
    </>}
    <h2>Storage and service providers</h2>
    <p>The shared API runs on Render and uses a Neon PostgreSQL database for saved account and product records. Amazon S3 stores uploaded files and images used by these features. Your device also keeps local data as described above. These providers process information to deliver the service. Retrieving social videos may use a configured download proxy, which receives the requested source link and network requests.</p>
    <p>OpenAI processes the content needed for AI features when you permit them. Our text-generation requests disable provider response storage, but that is not a promise of zero provider retention, and audio processing has separate provider controls. Provider retention is governed by the provider’s applicable policies and service settings. We do not promise a fixed deletion time for provider logs or backups.</p>
    <p>The shared API can use Sentry for error and performance monitoring when configured. Hosting and delivery providers process request metadata to operate the service. These product pages are hosted on Netlify and do not initialize the company site’s product analytics.</p>
    <Deletion product={product} />
    <h2>Support and policy changes</h2>
    <p>If you email support, we receive your message, sender details and any attachments you choose to send, and use them to respond. Ask us about access, correction or deletion at <Contact name={name} />. We update this page when the policy changes.</p>
  </>;
}

function useMetadata(name: string, description: string, path: string, icon: string) {
  useEffect(() => {
    document.title = name;
    const values = [
      ['name', 'description', description], ['property', 'og:title', name],
      ['property', 'og:description', description], ['property', 'og:url', 'https://shimizu-technology.com' + path],
      ['property', 'og:image', 'https://shimizu-technology.com' + icon],
      ['name', 'twitter:title', name], ['name', 'twitter:description', description],
      ['name', 'twitter:image', 'https://shimizu-technology.com' + icon],
    ];
    for (const [attribute, key, value] of values) {
      let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attribute, key); document.head.appendChild(meta); }
      meta.content = value;
    }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = 'https://shimizu-technology.com' + path;
    document.querySelectorAll('meta[name="theme-color"]').forEach((element) => element.remove());
    for (const [scheme, color] of [['light', '#ffffff'], ['dark', '#1c292b']]) {
      const meta = document.createElement('meta'); meta.name = 'theme-color'; meta.media = `(prefers-color-scheme: ${scheme})`; meta.content = color; document.head.appendChild(meta);
    }
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) { target.scrollIntoView({ block: 'start', behavior: 'instant' }); target.focus({ preventScroll: true }); }
  }, [description, icon, name, path]);
}

export default function HafaAppSite({ pathname }: { pathname: string }) {
  const product: Product = pathname === '/hafa-baby' || pathname.startsWith('/hafa-baby/') ? 'baby' : 'workouts';
  const { name, description, introduction } = products[product];
  const base = '/hafa-' + product;
  const path = pathname.replace(/\/+$/, '');
  const page = path === base ? 'home' : path === base + '/support' ? 'support' : path === base + '/privacy' ? 'privacy' : '404';
  const title = page === 'home' ? name : page === '404' ? 'Page not found — ' + name : name + (page === 'support' ? ' Support' : ' Privacy Policy');
  const summary = page === 'home' ? description : page === 'support' ? `Getting started, import help, account deletion and contact details for ${name}.` : page === 'privacy' ? `Information collected, optional AI processing, storage, sharing and deletion in ${name}.` : `The requested ${name} page could not be found.`;
  const icon = base + '-icon.png';
  useMetadata(title, summary, page === '404' ? base + '/not-found' : path, icon);
  const heading = page === 'home' ? name : page === 'support' ? name + ' support' : page === 'privacy' ? name + ' privacy policy' : 'Page not found';
  let content: ReactNode;
  if (page === 'support') content = <Support product={product} />;
  else if (page === 'privacy') content = <Privacy product={product} />;
  else if (page === '404') content = <a className="hafa-button" href={base}>Return to {name}</a>;
  else content = <>
    <h2>{product === 'workouts' ? 'Save a workout. Make it your routine.' : 'Keep your sources and daily observations together.'}</h2>
    <p>{introduction}</p>
    <p>{product === 'workouts' ? 'Free while in beta. Available to invited testers; there is no public App Store download yet.' : 'Currently in private testing. There is no public App Store download yet.'}</p>
    <p>Use the same Håfa account as Recipes and {product === 'workouts' ? 'Baby' : 'Workouts'}.</p>
    <p>{product === 'workouts' ? 'For adult general fitness. Review extracted details and AI suggestions before training; they are not medical advice.' : 'For parents and caregivers. Child profiles are not accounts. AI answers are general information, not medical advice; imported advice does not activate care schedules.'}</p>
    <div className="hafa-actions"><a className="hafa-button" href={base + '/support'}>Setup and support</a><a className="hafa-button hafa-button-secondary" href={base + '/privacy'}>Read the privacy policy</a></div>
  </>;
  return <div className="hafa-site">
    <header className="hafa-header">
      <a className="hafa-skip-link" href="#hafa-main">Skip to content</a>
      <nav className="hafa-header-inner" aria-label={name}>
        <a href={base} className="hafa-brand" aria-label={name + ' home'}><img src={icon} width="44" height="44" alt="" /><span><strong>{name}</strong><small>by Shimizu Technology</small></span></a>
        <div className="hafa-nav-links"><a href={base + '/support'} aria-current={page === 'support' ? 'page' : undefined}>Support</a><a href={base + '/privacy'} aria-current={page === 'privacy' ? 'page' : undefined}>Privacy</a></div>
      </nav>
    </header>
    <main id="hafa-main" tabIndex={-1}>
      <section className="hafa-document-heading"><div className="hafa-document-width">
        {page !== 'home' && <a href={base} className="hafa-back-link"><ArrowLeft size={16} aria-hidden="true" /> {name}</a>}
        <p className="hafa-eyebrow">{page === 'home' ? 'By Shimizu Technology' : page === '404' ? '404' : page === 'privacy' ? 'Privacy policy' : 'Support'}</p><h1>{heading}</h1><p>{summary}</p>
      </div></section>
      <div className="hafa-document-width hafa-document-wrap"><article className="hafa-document">{content}</article></div>
    </main>
    <footer className="hafa-footer"><div className="hafa-footer-inner"><a href="/">Shimizu Technology</a><nav aria-label="Product information"><a href={base}>{name}</a><a href={base + '/support'}>Support</a><a href={base + '/privacy'}>Privacy</a></nav><small>© {new Date().getFullYear()} Shimizu Technology</small></div></footer>
  </div>;
}
