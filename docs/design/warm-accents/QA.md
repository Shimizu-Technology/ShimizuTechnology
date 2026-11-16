# Homepage warmth — acceptance record

Source: latest main bff0999 (motion PR #25), user brief and Tåno y Tåsi reference inspected in shared browser. Agent execution on Mac mini, 2026-11-16. Audience: Guam business owners assessing the studio and contacting it. No backend or saved-data changes.

Visual direction: ivory #faf8f4, sand #f3eee6, cool #eef3f6; terracotta #a4432b complements cobalt #2455d6. Deep ocean #123e52 holds the existing client logos. Three small wave section markers plus one in the proof band; no invented map or illustrations. The band is static to avoid competing with the shipped motion.

Required affected flows:

| Case | Coverage | Result |
| --- | --- | --- |
| Hero, proof band, work, About readable with no horizontal overflow | 1280×800 and 390×844, shared Chromium browser | Passed; before/after PNGs alongside this record |
| View actual projects and reach contact email/phone | Existing homepage journey tests, desktop and phone | Passed |
| Payroll plays muted, pauses, stays paused after scrolling, resumes on request | Existing motion tests at both widths | Passed |
| Reduced motion uses poster, sends no video request, clears scroll transforms on live preference change | Existing motion tests | Passed |
| Mobile About navigation closes menu, releases scroll lock and transfers focus | Keyboard interaction test | Passed |
| Work stacking, responsive cards, portrait and service/process sections | Shared browser scroll; desktop sticky / phone normal flow; existing hook unchanged | Passed |
| Other routes, metadata, portfolio statuses and ordering, analytics, support and join paths | Full existing browser suites | Passed |

Local gate: lint, typecheck, production build, npm audit (no high vulnerabilities), Chromium 61/61. WebKit 61/61 on ASUS (including the final theme metadata update); this Mac has no window session. Impeccable 4.6.0 advisory over changed UI: `[]`. No dependencies added.

Contrast: terracotta text is at least 5.32:1 against all three light surfaces; white on ocean is over 10:1. Cobalt buttons and existing dark-card/status treatments preserved. Focus stays a visible 3px ring; contact retains its contrasting ring. Product-specific Håfa palettes remain isolated.

Screenshots show public production before and the built local candidate after at the same CSS dimensions (PNG capture uses device scale 2). Phone About starts with the portrait; scroll onward for its quote and marker. These resized desktop-browser checks and Linux WebKit do not establish real iPhone/Safari hardware behavior. Leon and Kami's visual acceptance is pending. Explicit HOLD: do not merge.
