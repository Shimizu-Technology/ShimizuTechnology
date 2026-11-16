# Three cool directions — held for Leon and Kami

Public studio site for Guam businesses evaluating work/services and starting a conversation. Source: user feedback, PR #25 motion implementation, held PR #26 handoff, homepage components and route tests. Copy, project order, video lifecycle and scroll hooks are preserved. No backend or stored customer data changes.

| Direction | Primary / hover | Accent on navy | Approach |
| --- | --- | --- | --- |
| A — Dark rhythm | #285b65 / #204a53 | #b8dfe5 | Navy #10151f repeats in logo band, statement, process and CTA; cool pale surfaces separate the work. |
| B — Soft glow | #4c4e85 / #3b3d6b | #c8cef3 | Indigo actions, static diffused glows around the hero/product, pale logo band, one gradient headline (#343859 → #595b8d). |
| C — Ink & silver | #34465a / #253548 | #ced8e2 | White and silver surfaces, hairline rules, squared work cards, restrained ink actions; original project imagery supplies color. |

Recommend A: it directly answers Leon’s request for navy throughout the page and creates contrast on a phone without adding decorative motion. B is softer and more atmospheric; C is quieter and more editorial. Visual acceptance belongs to Leon and Kami; HOLD, no merge. After selection remove the comparison UI and unused variants.

## Reference research
Actually visited in the shared Chromium browser on 2026-11-16:

- [Linear](https://linear.app/): nearly black canvas, subtle hairline header/frame borders and a large product frame. Borrow frame hierarchy and restrained rules, translated to navy rather than an entirely dark site.
- [Resend](https://resend.com/): monochrome hero, small outlined badge, low-contrast glow behind its dimensional object. Borrow localized depth around real product imagery, with static gradients instead of another animation.
- [Mercury](https://mercury.com/): large atmospheric visual with sparse text and simple rounded controls. Borrow restraint around the focal visual; do not borrow its warm image or cobalt actions.
- [Vercel](https://vercel.com/): neutral hero, strong black action, generous whitespace, a single visual object above the logo row. Borrow a neutral-first hierarchy and spacing in C.

The A section alternation is our adaptation to this page’s existing CTA and content, rather than a claim that every reference uses alternating sections. Client logos keep their original brand colors/backgrounds.

## Acceptance and verification
Agent executes affected-flow QA on built production assets, desktop 1280×800 and phone-sized 390×844 Chromium; Linux WebKit through ASUS. Real iPhone hardware is not available; Leon/Kami’s phone comparison remains required for final visual choice.

Required scenarios: each query selects its theme; switcher is reachable with 44px targets, keeps scroll/video pause, and browser Back restores choice; production/apex/www/Netlify production/unrelated hosts show no switcher and ignore direction queries; all requested sections have no overflow; contact links and keyboard focus remain available; payroll playback/pause, reduced motion and live preference change, stacking cards and mobile navigation remain working; existing work and product routes keep working.

The contrast tests enforce 4.5:1 for white text on each action color, colored text against each direction’s light surfaces (including darkest glow), ice text on navy, muted dark-section text, and both ends of B’s headline gradient. Original project imagery and client brand colors are not recolored.

Initial QA found a route test hardcoded to the old cobalt hover and a gradient applied above the animated word span. Updated the hover expectation, moved the gradient onto the visible span and darkened its light endpoint to meet the stricter 4.5:1 normal-text threshold. Final reruns recorded below supersede those attempts.

Impeccable advisory flags the grid and gradient headline. Both are deliberate comparison choices requested in the brief: low-opacity static grid in A/B, one gradient phrase only in B; C has neither. No dependency changes.

## Screenshots
Built candidate, same CSS viewport sizes, paused demo for deterministic section comparison. Each work card is captured separately to show the stacking content. These screenshots accompany, rather than replace, the interactive journey checks.

### Direction A

| Section | Desktop 1280×800 | Phone 390×844 |
| --- | --- | --- |
| Hero | [PNG](a-1280-motionhero.png) | [PNG](a-390-motionhero.png) |
| Logo band | [PNG](a-1280-motionlogos.png) | [PNG](a-390-motionlogos.png) |
| Work / Payroll | [PNG](a-1280-projects.png) | [PNG](a-390-projects.png) |
| Work / Marianas Open | [PNG](a-1280-motioncardnthchild2.png) | [PNG](a-390-motioncardnthchild2.png) |
| Work / Hafaloha | [PNG](a-1280-motioncardnthchild3.png) | [PNG](a-390-motioncardnthchild3.png) |
| Services | [PNG](a-1280-services.png) | [PNG](a-390-services.png) |
| Process | [PNG](a-1280-process.png) | [PNG](a-390-process.png) |
| CTA | [PNG](a-1280-contact.png) | [PNG](a-390-contact.png) |

### Direction B

| Section | Desktop 1280×800 | Phone 390×844 |
| --- | --- | --- |
| Hero | [PNG](b-1280-motionhero.png) | [PNG](b-390-motionhero.png) |
| Logo band | [PNG](b-1280-motionlogos.png) | [PNG](b-390-motionlogos.png) |
| Work / Payroll | [PNG](b-1280-projects.png) | [PNG](b-390-projects.png) |
| Work / Marianas Open | [PNG](b-1280-motioncardnthchild2.png) | [PNG](b-390-motioncardnthchild2.png) |
| Work / Hafaloha | [PNG](b-1280-motioncardnthchild3.png) | [PNG](b-390-motioncardnthchild3.png) |
| Services | [PNG](b-1280-services.png) | [PNG](b-390-services.png) |
| Process | [PNG](b-1280-process.png) | [PNG](b-390-process.png) |
| CTA | [PNG](b-1280-contact.png) | [PNG](b-390-contact.png) |

### Direction C

| Section | Desktop 1280×800 | Phone 390×844 |
| --- | --- | --- |
| Hero | [PNG](c-1280-motionhero.png) | [PNG](c-390-motionhero.png) |
| Logo band | [PNG](c-1280-motionlogos.png) | [PNG](c-390-motionlogos.png) |
| Work / Payroll | [PNG](c-1280-projects.png) | [PNG](c-390-projects.png) |
| Work / Marianas Open | [PNG](c-1280-motioncardnthchild2.png) | [PNG](c-390-motioncardnthchild2.png) |
| Work / Hafaloha | [PNG](c-1280-motioncardnthchild3.png) | [PNG](c-390-motioncardnthchild3.png) |
| Services | [PNG](c-1280-services.png) | [PNG](c-390-services.png) |
| Process | [PNG](c-1280-process.png) | [PNG](c-390-process.png) |
| CTA | [PNG](c-1280-contact.png) | [PNG](c-390-contact.png) |

## Gate record

2026-11-16, final candidate: lint, TypeScript, Vite production build and audit at the high-severity threshold pass (seven pre-existing moderate tooling advisories, no high/critical). Chromium 80/80 passed, including all three directions at both sizes, full existing routes/analytics, production-host isolation and AA palette checks. 48 screenshots reviewed for layout, loaded imagery and contrast; shared-browser checks also confirmed the hero, process, services, CTA and phone switcher.

White/action contrast: A 7.57:1, B 7.68:1, C 9.68:1. Ice/navy contrast: A 12.81:1, B 11.82:1, C 12.66:1. Gradient endpoints tested against the darkest hero glow at ≥4.5:1.

WebKit: 80/80 passed on the ASUS Linux runner against the final source after the shared lock became available. Real Safari/iPhone hardware and Leon/Kami’s final visual acceptance remain not run. No merge authorized.

### Deployed toolbar regression (requires corrective publication)

Final deployed head bb182cde0e07dba1b5e0de3748384af6ad2631ae passed CI, but deployed Chromium had 76 passed, 3 failed and 1 not run: Netlify’s injected Drawer intercepted phone switcher taps for A/B/C. This is a material preview usability failure, despite the passing local suites. Netlify’s connected app requires reauthentication and its dashboard is logged out, so the documented collaboration setting could not be changed. No hosting configuration was modified.

A local correction raises the floating switcher above a 72px hosting toolbar while preserving the safe-area inset. A regression overlays a real blocking toolbar and clicks all three choices at both widths; all 48 screenshots have been refreshed. This change is held locally because the user authorized a single push batch, which was already used. A second corrective push needs explicit authorization. Recheck the real deployed Drawer interaction after publication; do not mark that deployed case passed from local simulation alone.

Corrective candidate gate: lint, types, production build pass; Chromium 82/82 and ASUS WebKit 82/82 pass, including the blocking-toolbar interaction at both widths. Forwarded-request teardown now drains before page close. Logs: `/tmp/shimizu-toolbar-chromium-final.log`, `/tmp/shimizu-toolbar-webkit-final.log`. Deployed retest remains blocked until authorization/publication; no second push made.
