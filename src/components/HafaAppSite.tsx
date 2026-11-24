import { useEffect, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

type Product = 'workouts' | 'baby';
const email = 'shimizutechnology@gmail.com';
const products = {
  workouts: {
    name: 'Håfa Workouts',
    homeTitle: 'Håfa Workouts — Workout Plans & Guided Sessions | Shimizu Technology',
    description: 'Save workouts from videos and other sources, build training plans, and log your sessions on iPhone and Apple Watch. From Shimizu Technology.',
    introduction: 'Keep workout sources, review extracted exercises, plan your training, and record what you actually did on iPhone or Apple Watch. Optional AI helps extract workouts and discuss your training.',
  },
  baby: {
    name: 'Håfa Baby',
    homeTitle: 'Håfa Baby — Pregnancy & Baby Care Companion | Shimizu Technology',
    description: 'A private iPhone pregnancy and baby-care companion from Shimizu Technology: saved sources, journal, feeding and sleep logs, routines, and optional AI answers.',
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
      <p>In Workouts, tap your account icon to open Settings, then choose Account data and deletion. Choose <strong>Review Workouts-only removal</strong> to remove training data while keeping your Håfa login, Recipes and Baby data. Choose <strong>Review whole-account deletion</strong> to delete the shared account, then read and confirm the deletion.</p>
      <p>Workouts removal clears local drafts and pending training first. If the server request fails, those local drafts stay erased; retry the saved-data deletion. Follow any device-cleanup retry instructions shown in the app.</p>
      <p>Neither option deletes workouts already saved in Apple Health. Manage those in the Health app on your iPhone. To export your saved Workouts records first, use <strong>Export saved Workouts records</strong> on the same screen; it creates a JSON file you can save or share.</p>
    </> : <p>In Baby, open More, then Profiles &amp; settings. <strong>Delete my Baby data</strong> removes Baby records, files, conversations and child profiles while keeping Recipes, Workouts and your Håfa login. <strong>Delete my entire Håfa account</strong> asks you to confirm permanent deletion across the Håfa apps.</p>}
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
    <p>{product === 'workouts' ? 'Håfa Workouts is coming to the App Store for iPhone, with an Apple Watch app included. There is no App Store download link here yet. You must be 18 or older to use it.' : 'The iOS app is in private testing; there is no public App Store download link here yet.'}</p>
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
    {product === 'workouts' ? <>
      <p>Check the visibility choice before saving or sharing. Link imports start as <strong>Public in Discover</strong>; switch to Private if you want to keep one to yourself. Public Discover workouts show your Håfa account name and can be seen and saved by other Workouts members. Keep personal notes out of public workout titles, exercise descriptions and source links.</p>
      <p>To report a Discover workout or block the person who shared it, open the workout’s options menu. Manage blocked contributors in Settings → Safety Center. The <a href="/hafa-workouts/terms">terms of use</a> list what may not be shared.</p>
    </> :<p>Sharing a post into Baby saves it to your private space. AI processing is optional. Settings → <strong>Automatically organize posts I share</strong> is a separate choice that requires AI permission. Existing originals stay saved if processing is unavailable. Imported advice does not activate a care schedule or reminder.</p>}
    <h2>{product === 'workouts' ? 'Training suggestions' : 'Care and AI answers'}</h2>
    <p>{product === 'workouts' ? 'Workouts supports adult general fitness. AI extraction and coaching can make mistakes and are not medical advice or clearance to exercise. Check with a doctor before starting a new exercise program.' :'Baby is used by parents and caregivers, rather than by children. AI answers are general information, not medical advice, diagnosis, treatment or an emergency service. Check care decisions with a qualified clinician.'}</p>
    <Deletion product={product} />
    <h2 id="contact" tabIndex={-1}>Contact support</h2>
    <p>Email <Contact name={name} />. Include the app name, device, app version, what you tried and the error message. Remove personal information from screenshots. Do not send passwords, sign-in codes, or sensitive health or child information.</p>
    <p>Read the <a href={`/hafa-${product}/privacy`}>privacy policy</a> for processing and deletion details{product === 'workouts' ? <>, and the <a href="/hafa-workouts/terms">terms of use</a> for the rules on using the app and sharing to Discover</> : ''}.</p>
  </>;
}

function Privacy({ product }: { product: Product }) {
  const { name } = products[product];
  return <>
    <p>Last updated: {product === 'workouts' ? 'November 24, 2026' : 'October 24, 2026'}. Shimizu Technology, in Guam, develops {name}. This policy describes the {product === 'workouts' ? 'iPhone and Apple Watch apps' : 'app'} and these product pages. Questions or requests: <Contact name={name} />.</p>
    {product === 'workouts' && <p>The short version: we use your information to run the app’s fitness features. We do not show ads, we do not sell your information, and we never use Apple Health data for advertising or marketing. See also the <a href="/hafa-workouts/terms">terms of use</a>.</p>}
    <h2>One Håfa account</h2>
    <p>Håfa Recipes, Håfa Workouts and Håfa Baby use the same account. Clerk processes sign-in information such as your email address and authentication identifiers. Our API links your sign-in to a stable Håfa account so your saved data belongs to that account.</p>
    {product === 'workouts' ? <>
      <p>You can sign in to Workouts with Apple, Google, or an email address and password. You must be 18 or older to use Workouts; the app asks you to confirm this during setup. If you believe someone under 18 has given us information, contact us.</p>
      <h2>Training information you provide</h2>
      <p>Workouts saves the training profile you fill in. It can include your goals, experience, equipment, available days and session length, age, weight, height, limitations and movements to avoid, a running baseline and other activities you play. Optional details can be left blank. We also save the weight and height history you enter in Measurements, your saved workouts and their sources, plans, sessions and training history (reps, load, time, distance, effort, pain you report and notes), Coach conversations, and your permissions and sharing choices.</p>
      <p>Drafts, unsynced training and preferences are kept on your device, tied to your signed-in account. Workout reminders are scheduled on your phone as local notifications with general wording; we do not collect a push notification token.</p>
      <h2>Imports and the processors they use</h2>
      <p>Importing a workout needs your AI permission (see below). You can always write a workout yourself instead. What happens depends on what you share:</p>
      <ul>
        <li><strong>Website links:</strong> our server fetches the page and sends its text to OpenAI to pick out the exercises.</li>
        <li><strong>YouTube, Instagram and TikTok links:</strong> our server retrieves the post’s caption and details, its audio and a few still frames. YouTube and Instagram requests can go through a download proxy service, which receives the link and the network requests. The audio goes to OpenAI for transcription, and the frames and text go to OpenAI for extraction.</li>
        <li><strong>Screenshots and photos:</strong> up to eight images, resized on your phone, are sent through our server to OpenAI.</li>
        <li><strong>PDFs:</strong> our server reads the text out of the PDF itself, and only that text goes to OpenAI.</li>
        <li><strong>Pasted text and text files:</strong> the text goes to OpenAI.</li>
      </ul>
      <p>Your training profile is not sent with an import. The import request, including any photos or documents, is held on our server only until the workout is saved or cancelled, and at most 24 hours. A saved workout keeps its source link, the original creator’s name, a cover image, short quotes from the source, and up to about 30,000 characters of source text such as the caption, transcript or page text. Saved workouts do not keep your screenshots or PDFs. Cover images are stored on Amazon S3 at web addresses that anyone who has the address can open.</p>
      <h2>AI features and Coach</h2>
      <p>AI is off until you accept the AI disclosure, in the app or in Settings → AI preferences. OpenAI is the AI provider for imports and Coach. Turning AI off in Settings stops new imports and Coach replies; it cannot recall what OpenAI has already processed. Manual workouts, your library, plans and training all work without AI.</p>
      <p>When you send Coach a message, OpenAI receives your message, recent messages from the same conversation, your training profile (including age, weight, height and limitations if you entered them), and your recent workouts, plans, sessions and activities. Asking Coach to explain one workout sends only that workout. Coach does not receive Apple Health data, heart rate or your Håfa Recipes data.</p>
      <p>You can attach one photo from your photo library to a Coach message. It is stored privately on Amazon S3, shared with OpenAI through a link that works for about a minute, and deleted after 24 hours. If you dictate a message, your iPhone’s speech recognition turns it into text, which may use Apple’s speech service; we do not receive or keep the recording. Read-aloud uses your phone’s built-in voice.</p>
      <p>Coach conversations stay in your account until you clear them, change or remove a measurement, remove your Workouts data, or delete your account. AI results can be incomplete or wrong; review them before you train.</p>
      <h2 id="health" tabIndex={-1}>Apple Health and Apple Watch</h2>
      <p>Health data is used only to provide the app’s fitness features: recording your classes, showing your training history and avoiding duplicate workouts. We never use Health data for advertising or marketing, we never sell it, and we do not share it with data brokers or advertisers. Håfa Workouts does not store Health data in iCloud. Health data is never sent to OpenAI or Coach, and it is never shown in Discover or in sharing links.</p>
      <p><strong>Apple Watch app.</strong> The watch app asks for Health permission before your first class. During a class it reads your heart rate and active energy during the class and saves the class to Apple Health as a workout, with your heart rate and active energy. The watch shows your heart rate live and keeps only the average and maximum heart rate for the class and each part. The watch does not connect to our servers. It sends the result to your iPhone over Apple’s watch connection: times, parts, rounds, scores, the average and maximum heart rate, and the ID Apple Health gave the workout. Your iPhone sends the watch your planned classes for the next few days so you can start them there.</p>
      <p><strong>What reaches our server from the watch.</strong> When the phone saves a watch class to your account, it sends the times, parts, scores and results, the fact that it was recorded on the watch, and the Apple Health workout ID, which we use to avoid saving the same class twice. Heart rate stays on your iPhone and is not sent to our server.</p>
      <p><strong>Health connections on iPhone.</strong> Settings → Health connections is a separate, optional connection. Until it is available for your account, the iPhone app does not ask for Apple Health access. When you connect, you choose separately whether Workouts may read workouts from Health on your phone, upload them to your account, and save your completed Håfa sessions to Health. Reading covers only workouts: their start and end time, duration, activity type and the app that recorded them, not heart rate, calories, routes or body measurements. Uploaded workouts are kept in your account so you can see them alongside your training. Workouts the iPhone saves to Health contain the session’s time and activity type, without heart rate, calories or routes. Disconnecting stops new access and removes the uploaded copies from our server.</p>
      <p><strong>Heart-rate summaries.</strong> Settings → Heart-rate summaries is off unless you turn it on. Only if it is on may we save the average and maximum heart rate for a workout and its parts with your results, never a continuous heart-rate trace. Turning it off stops new summaries, and you can choose to delete every saved summary.</p>
      <p>You can change Health permissions at any time in the Health app or in your iPhone’s Settings. Removing Workouts data or your account does not delete workouts already saved in Apple Health; manage those in the Health app.</p>
      <h2>Public Discover, reporting and blocking</h2>
      <p>Discover is a feed of workouts that members chose to share. Only people signed in to Håfa Workouts can see it. Link imports start as Public in Discover, and other imports start as private; you can change this before saving, and the app shows what will be shared before your first post. Only complete workouts can be shared.</p>
      <p>A Discover workout shows the workout itself and credit: its title, blocks and exercises with sets, reps, time, distance, load and rest, the equipment, the workout instructions, an estimated time, the source link and platform, the original creator’s name, a cover image if there is one, the date it was shared, and your contributor name. Your contributor name is the name on your Håfa account. Your training profile, measurements, limitations, private notes, effort, training history, Health data and Coach conversations are never included. Anything personal you put in a title or instruction becomes public with it.</p>
      <p>Other members can open a public workout and save their own copy. You can remove a workout from Discover at any time, but copies people already saved stay in their libraries. The same publishing agreement covers recipes you make public in Håfa Recipes.</p>
      <p>You can report a Discover workout as spam, unsafe, inappropriate, a copyright problem, impersonation or something else, with optional details. Reports go to the Håfa team, who review them; the person who shared it is not told who reported it. We keep the report, its category and details, which workout and contributor it concerns, who sent it, and how it was resolved. If you delete your account, the report is kept without the link to your account. We can hide a workout from Discover or hide all of an account’s public content, and we keep a record of those actions.</p>
      <p>You can block a contributor from a workout’s options menu. Blocking hides their public workouts and recipes from you in both Håfa Workouts and Håfa Recipes. They are not told, and you can unblock them in Settings → Safety Center.</p>
      <h2>Sharing links</h2>
      <p>Separately from Discover, you can create a link to one workout or program. Anyone who has the link can read it without signing in, until it expires (after 1 to 30 days, 7 by default) or you revoke it in Settings → Sharing links. It shows the name you choose and the workout or program, without your profile, history, notes or Health data. The source link and cover image are included only if you choose. Saving a copy requires a Håfa account. Revoking a link stops future access but cannot remove copies people already saved.</p>
      <h2>Export, retention and Workouts-only removal</h2>
      <p>Settings → Account data and deletion → <strong>Export saved Workouts records</strong> creates a JSON file of your saved library, plans, training, profile, measurements, Coach conversations, permissions and sharing records. The private export snapshot on our server expires within 10 minutes. Files you save or share are under your control.</p>
      <p>Saved workouts, source text, versions, plans and history remain until you remove them, your Workouts data or your account. Import requests and Coach photos are deleted within 24 hours, as described above. Workouts-only removal erases saved training data and stops your sharing links. Content-free import allowance records may remain for up to 48 hours; they contain no source text, images or workout content. Whole-account deletion removes those allowance records too.</p>
      <h2>No ads, tracking or sale of data</h2>
      <p>Håfa Workouts shows no ads. The app has no advertising, analytics or tracking software, does not use Apple’s advertising identifier, and does not track you across other companies’ apps or websites. We do not sell your personal information or share it for advertising.</p>
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
    <p>The shared API can use Sentry for error and performance monitoring when configured.{product === 'workouts' ? ' For Workouts requests, Sentry receives only a short failure notice and technical tags such as the route and status code, not request content or training details.' : ''} Hosting and delivery providers process request metadata to operate the service. These product pages are hosted on Netlify and do not initialize the company site’s product analytics.</p>
    <Deletion product={product} />
    <h2>Support and policy changes</h2>
    <p>If you email support, we receive your message, sender details and any attachments you choose to send, and use them to respond. Ask us about access, correction or deletion at <Contact name={name} />. We update this page when the policy changes.</p>
  </>;
}

function Terms() {
  const name = products.workouts.name;
  return <>
    <p>Last updated: November 24, 2026. These terms cover your use of the {name} iPhone and Apple Watch apps and these pages, made by Shimizu Technology in Guam. By creating an account or using {name}, you agree to them. If you do not agree, please do not use {name}.</p>
    <h2>Who can use it</h2>
    <p>You must be 18 or older. {name} uses the same Håfa account as Håfa Recipes and Håfa Baby. Keep your sign-in details to yourself; you are responsible for what happens under your account. You can delete your Workouts data or your whole account at any time in Settings → Account data and deletion.</p>
    <h2>Not medical advice</h2>
    <p>{name} is for general fitness. It is not medical advice and it does not diagnose, treat or clear you to exercise. Check with a doctor before you start a new exercise program, especially if you have a health condition, an injury, are pregnant, or have not exercised in a while. Stop and get help if you feel pain, dizziness, chest pain or shortness of breath.</p>
    <p>You choose the workouts, weights and effort that are right for you. You use the app and do any workout at your own risk.</p>
    <h2>AI features can be wrong</h2>
    <p>{name} uses AI to pull workouts out of videos, posts, photos and documents, and to answer questions in Coach. AI can miss or misread details, and Coach suggestions can be wrong or unsuitable for you. Check an imported workout against the original source and use your own judgment before training. Coach is not a personal trainer or a clinician.</p>
    <h2>Your workouts</h2>
    <p>Workouts you import or write are private unless you share them. Importing a workout does not give you any rights to the creator’s video, post or text.</p>
    <p>When you share a workout to Discover, other signed-in members can find it, view it and save their own copy. You allow us to show it, with the details listed when you share, inside {name} for as long as it stays in Discover. You can remove it at any time; copies other people already saved stay with them. A sharing link lets anyone who has it view that workout or program until it expires or you revoke it.</p>
    <h2>What isn’t allowed</h2>
    <p>{name} has no tolerance for objectionable content or abusive users. Do not share, publish or upload:</p>
    <ul>
      <li>Workouts, videos, photos or text you do not have the right to share, or that infringe someone else’s copyright or other rights</li>
      <li>Content that is offensive, hateful, harassing, threatening or discriminatory</li>
      <li>Sexual or violent content</li>
      <li>Content that encourages dangerous activity, including unsafe training presented as safe, or illegal activity</li>
      <li>Other people’s personal information</li>
      <li>Spam, advertising, impersonation or misleading content</li>
    </ul>
    <p>Also do not misuse the service, get around its limits, or try to access other people’s accounts or data.</p>
    <h2>Reporting and blocking</h2>
    <p>You can report any Discover workout, or block the person who shared it, from the workout’s options menu. Blocking hides their public workouts and recipes from you in Håfa Workouts and Håfa Recipes, and you can unblock them in Settings → Safety Center. You can also email us about content at the address below.</p>
    <p>We review reports and remove content that breaks these terms. We may hide workouts, hide all of an account’s public content, stop an account from sharing, or suspend or close accounts that break these terms.</p>
    <h2>The service</h2>
    <p>We work to keep {name} available and your data safe, but the service is provided as is, and features may change. Imports depend on other websites and apps, which can change or block access. To the extent the law allows, Shimizu Technology is not liable for injuries, or for indirect or consequential losses, from using {name} or doing a workout from it.</p>
    <p>If we make important changes to these terms, we will update this page and, where it matters, tell you in the app.</p>
    <h2>Privacy</h2>
    <p>The <a href="/hafa-workouts/privacy">privacy policy</a> explains what we collect, including Apple Health data, and how we use it.</p>
    <h2>Contact</h2>
    <p>Questions about these terms or content in Discover: <Contact name={name} />.</p>
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
  const { name, homeTitle, description, introduction } = products[product];
  const base = '/hafa-' + product;
  const path = pathname.replace(/\/+$/, '');
  const hasTerms = product === 'workouts';
  const page = path === base ? 'home' : path === base + '/support' ? 'support' : path === base + '/privacy' ? 'privacy' : hasTerms && path === base + '/terms' ? 'terms' : '404';
  const pageName = { support: 'Support', privacy: 'Privacy Policy', terms: 'Terms of Use' } as Record<string, string>;
  const title = page === 'home' ? homeTitle : page === '404' ? 'Page not found — ' + name : `${name} ${pageName[page]} | Shimizu Technology`;
  const summary = page === 'home' ? description : page === 'support' ? `Getting started, import help, account deletion and contact details for ${name}.` : page === 'privacy' ? `Information collected, optional AI processing, storage, sharing and deletion in ${name}.` : page === 'terms' ? `Rules for using ${name}, sharing workouts to Discover, and training safely.` : `The requested ${name} page could not be found.`;
  const icon = base + '-icon.png';
  useMetadata(title, summary, page === '404' ? base + '/not-found' : path, icon);
  const heading = page === 'home' ? name : page === 'support' ? name + ' support' : page === 'privacy' ? name + ' privacy policy' : page === 'terms' ? name + ' terms of use' : 'Page not found';
  let content: ReactNode;
  if (page === 'support') content = <Support product={product} />;
  else if (page === 'privacy') content = <Privacy product={product} />;
  else if (page === 'terms') content = <Terms />;
  else if (page === '404') content = <a className="hafa-button" href={base}>Return to {name}</a>;
  else content = <>
    <h2>{product === 'workouts' ? 'Save a workout. Make it your routine.' : 'Keep your sources and daily observations together.'}</h2>
    <p>{introduction}</p>
    <p>{product === 'workouts' ? 'Coming to the App Store for iPhone, with an Apple Watch app included. There is no App Store download link here yet.' : 'Currently in private testing. There is no public App Store download yet.'}</p>
    <p>Use the same Håfa account as Recipes and {product === 'workouts' ? 'Baby' : 'Workouts'}.</p>
    <p>{product === 'workouts' ? 'For adult general fitness. Review extracted details and AI suggestions before training; they are not medical advice.' : 'For parents and caregivers. Child profiles are not accounts. AI answers are general information, not medical advice; imported advice does not activate care schedules.'}</p>
    <div className="hafa-actions"><a className="hafa-button" href={base + '/support'}>Setup and support</a><a className="hafa-button hafa-button-secondary" href={base + '/privacy'}>Read the privacy policy</a></div>
  </>;
  return <div className="hafa-site">
    <header className="hafa-header">
      <a className="hafa-skip-link" href="#hafa-main">Skip to content</a>
      <nav className="hafa-header-inner" aria-label={name}>
        <a href={base} className="hafa-brand" aria-label={name + ' home'}><img src={icon} width="44" height="44" alt="" /><span><strong>{name}</strong><small>by Shimizu Technology</small></span></a>
        <div className="hafa-nav-links"><a href={base + '/support'} aria-current={page === 'support' ? 'page' : undefined}>Support</a><a href={base + '/privacy'} aria-current={page === 'privacy' ? 'page' : undefined}>Privacy</a>{hasTerms && <a href={base + '/terms'} aria-current={page === 'terms' ? 'page' : undefined}>Terms</a>}</div>
      </nav>
    </header>
    <main id="hafa-main" tabIndex={-1}>
      <section className="hafa-document-heading"><div className="hafa-document-width">
        {page !== 'home' && <a href={base} className="hafa-back-link"><ArrowLeft size={16} aria-hidden="true" /> {name}</a>}
        <p className="hafa-eyebrow">{page === 'home' ? 'By Shimizu Technology' : page === '404' ? '404' : page === 'privacy' ? 'Privacy policy' : page === 'terms' ? 'Terms of use' : 'Support'}</p><h1>{heading}</h1><p>{summary}</p>
      </div></section>
      <div className="hafa-document-width hafa-document-wrap"><article className="hafa-document">{content}</article></div>
    </main>
    <footer className="hafa-footer"><div className="hafa-footer-inner"><a href="/">Shimizu Technology</a><nav aria-label="Product information"><a href={base}>{name}</a><a href={base + '/support'}>Support</a><a href={base + '/privacy'}>Privacy</a>{hasTerms && <a href={base + '/terms'}>Terms</a>}</nav><small>© {new Date().getFullYear()} Shimizu Technology</small></div></footer>
  </div>;
}
