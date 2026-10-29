# Validation — 29 October 2026

## Passed

- Next.js optimized production build and static export.
- Strict TypeScript checking.
- Dependency audit: zero reported vulnerabilities after updating sharp to 0.35.5.
- Export inspection: 14 links have valid section targets, 23 unique referenced assets exist, 16 images have alt attributes and dimensions, and the page has one H1 with no duplicate IDs.
- React DOM interaction checks: All/Movement/Heritage filter counts, selected filter state, viewer opening, next/previous and arrow-key navigation, wraparound, dialog close, focus restoration, body scroll restoration, experience details, mobile menu open/close, and section anchors.
- Source inspection confirms no Three.js import, GLB reference, WebGL renderer, or model viewer.
- Generated WebP derivatives preserve original source assets. The hero background is 46 KB and dancer approximately 220 KB.
- Main text color contrast checks: gold on Obsidian 6.81:1, white on terracotta 5.48:1, muted body text on Obsidian 8.54:1. Small text on teal/burgundy uses a lighter gold.

## Not verified

Desktop/mobile visual layout and real-browser native-dialog behavior could not be checked because the browser tool repeatedly reported "Local browser use is disabled in Work settings." DOM tests use jsdom and a native-dialog polyfill; they do not substitute for browser testing.

## Hosting handoff

The original Sites publishing attempt failed with a service-side project-not-found error. The user subsequently chose GitHub and Vercel. Sites-specific local state is excluded from this repository, and metadata now uses the Vercel hostname or an optional `SITE_URL` override. This source upload does not itself deploy the website.

The local application and `out/` production export are complete. Event booking, payments, a contact submission service, and an event schedule are outside this edition because real business data and destinations were not supplied.
