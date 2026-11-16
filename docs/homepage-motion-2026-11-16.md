# Homepage motion release

## Brief and acceptance

Public marketing site for Guam businesses evaluating websites, business software and automation. Primary journey: understand the offer, inspect real products, reach the Gmail/phone contact. Source: approved `site-motion-2026-11-16/DECISIONS.md` and Shimizu concept, production browser baseline, repository `src/data/index.tsx`, target `origin/main` at 9a44761. No customer data or authenticated services needed. Agent executes affected-homepage acceptance and the complete existing regression suite.

Keep white/graphite/cobalt, local fonts, native scrolling, readable content without animation, existing routes/fragments and the held Work page inventory. The two main motion moments are the headline rise and scroll-driven product-frame tilt; downstream sections use restrained fill/line/parallax. No added dependencies. Reduced motion disables movement and renders the poster without requesting video.

Ruleset Protect Main requires PRs and prohibits deletion/force pushes; zero required approvals and no required status contexts. We still require quality CI, functional acceptance and completed CodeRabbit coverage before merge. Previous PR shows automatic CodeRabbit and Netlify previews.

## Re-review changes

| Before (concept) | After (implementation) | Reason |
| --- | --- | --- |
| Hardcoded 22/4/4 | Total and App Store count from existing portfolio data; AI count retained from current production | Avoid inventory drift; no new claims |
| Hafaloha simplified description | Reuse held project description | Preserve seasonal/event context; source inventory and order untouched |
| Floating chip near recording | Chip in flow below recording, hidden on phones | Never obscure product content |
| Logo loop, hover-only pause | Static six-logo strip | Accessible without another perpetual animation or pause control |
| Screenshot crops/scale | Contain full images with padding | No mid-word crops on phone or desktop |
| Faint scroll-fill words | Muted text with at least 4.5:1 contrast fills to graphite | All words remain readable throughout |
| External fonts and GSAP | Existing self-hosted fonts; CSS, IntersectionObserver and one rAF-scheduled scroll handler | No library/CDN added |
| Both video encodings, WebM preferred | 1.9 MB MP4 preferred over 3.3 MB WebM; preload none, in-view start and offscreen/background pause | Reduce transfer; pause persists across scrolling |
| Motion off freezes video | Poster image only, no video element, responds to preference changes | No autoplay or video transfer with reduced motion |
| Review notes and control pill | Omitted | Review aids only |

Contact retains Gmail, phone and analytics. Homepage selection becomes Payroll, Marianas Open, Hafaloha; CSG and every other project remain on Work in their existing order. Existing `#projects` plus approved `#work` alias work. Work page contact retains its existing version. No new pricing, testimonials or offers.

## Acceptance ledger

Fresh anonymous browser, fictional demo assets only. Chromium bundled Playwright 1.62.1, one worker on Mac mini. No real iPhone hardware available; resized Chromium and WebKit are stand-ins, not hardware acceptance.

| ID | Steps and expected outcome | Coverage/result |
| --- | --- | --- |
| H01 | Load homepage; primary action visible; scroll each section without overflow or script errors | Passed Chromium 390×844 and 1280×800; overflow regression also 320/800/1280 |
| H02 | Scroll video into view, watch time advance, pause, scroll away/back, verify pause persists, play again | Passed desktop/phone Chromium; muted and playsinline verified |
| H03 | Load with reduced motion; poster visible, no video element or media requests; change preference in both directions | Passed Chromium |
| H04 | Keyboard activate payroll contact link; contact heading in viewport; phone navigation restores scroll/focus | Passed Chromium |
| H05 | Load all three images at 390/800/1280; verify decoded dimensions and contain; inspect phone product imagery | Passed Chromium |
| H06 | Navigate Work, support, privacy, app and invitation paths; verify held inventory statuses, counts, links and isolation | Passed complete local route suite |
| H07 | Contrast: primary action normal/hover, small badges, focus rings; statement muted text remains #536070 on #f5f6f8 | Passed Chromium assertions and design review |

Local complete suite: 60 passed after updating assertions for replaced homepage content. Initial run: 57 passed, three obsolete-selector/preload failures; fixed and rerun. Lint, TypeScript, Vite build pass. Audit has seven existing moderate findings and no high findings. Impeccable 4.6.0 advisory across changed UI returns `[]`. No dependency changes. WebKit runner attempt with `--with-deps` hit sudo-required OS installation; retry uses the runner's existing OS dependencies.

Host setup: lifecycle command wasn't on PATH and no mini profile existed; created a local protective profile and used the canonical helper directly. Shared-context read-only check cannot run because this account lacks `agent-context.json`; applicable canonical synced skills read directly. No shared skill changed.

Deployment, final review, WebKit outcome and cleanup are recorded in the PR/release handoff after execution.

## Pause acceptance blocker: reproduction and fix

2026-11-16 resume verified worktree branch `feat/home-motion-20261116`, local and PR head `59e4b999`, target `main`, green quality/Netlify preview checks. Netlify connector reauthentication did not indicate a failed site deployment; no Netlify login, settings or billing changes are needed.

WebKit reproduced the desktop failure. Instrumented media calls on the deployed preview showed: observer `pause()` while scrolling to the control, then a click on a button whose label had changed to Play, then `play()` from the click handler. The video-only observer excluded the control bar. The handler inferred user intent from transient `video.paused`, so an intended Pause became Play. The same boundary could interrupt a manual resume.

The observer now tracks the untransformed frame including its controls. Visibility pauses preserve the control's playback intent; explicit Pause sets the persistent user-pause flag. Aborted autoplay promises do not reset intent, and late play events respect user pause. The regression checks actual paused state and frozen time after scrolling away/back before explicit Play.

Retest history: original desktop WebKit failed (phone/poster passed); initial intent-only fix exposed a desktop resume failure in Chromium; adding frame visibility tracking passes the full 60-test Chromium suite at 390×844 and 1280×800. Full WebKit retest and final deployment acceptance follow before merge. Local lint/typecheck/build and high-severity audit pass; seven pre-existing moderate audit findings remain. Impeccable advisory on changed Hero returns no findings. Real iPhone is not tested.

Final local fix validation: 60/60 Chromium on Mac mini and 60/60 WebKit on ASUS passed with the frame observer and persistent user pause, including H01–H07 and existing support/privacy/app/invitation regressions. Exact-source WorkPage checksum matches `origin/main`; portfolio data, redirects and sitemap have no diff. Both test phases exited and task-owned local preview server was cleaned. Deployed-head results and release commit are recorded on PR #25.

CodeRabbit round 1 reviewed original head `59e4b999`: (1) valid missing About h2 breaks phone-menu focus, fixed by making the existing visible section label an h2 plus keyboard regression; (2) original 25% observer semantics finding is outdated because the pause fix intentionally observes any intersection of the complete frame/controls, avoiding control/video boundary races; (3) accepted reduced-motion test improvement now verifies tilt/process/portrait inline transforms clear and stay cleared after scrolling. Chromium rerun passes 61/61. CodeRabbit reports the next included review is rate-limited for approximately 51 minutes; its green status on `f443999` is not completed review coverage. Final-head review remains pending and is not represented as clean.

Round-1 fixes validated: full Chromium 61/61 and full WebKit 61/61 passed, including the new About keyboard/focus scenario and transform cleanup assertions. UI advisory returns no findings for About/Hero. No runtime resources intentionally left running.
