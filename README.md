# HP Copywriter OS

**A professional, mobile-first AI writing workspace.**

HP Copywriter OS is being built to help a freelance writer manage client discovery, briefs, research, writing projects, revisions, and deliverables in one calm, polished workspace.

> Status: Foundation stage. The current repository establishes the product direction and initial static application shell; it is not yet a production-ready AI agent.

## Product principles

- **Professional before flashy:** editorial clarity, purposeful controls, refined typography, and restrained motion.
- **Mobile-first:** designed for a phone from the start, with desktop layouts as an enhancement.
- **Writer-led:** the AI supports judgment and execution; it does not replace client understanding or evidence.
- **Modular:** provider adapters, writing skills, project data, and evaluation rules stay separate.
- **Free-first:** avoid paid infrastructure until a real need is demonstrated.
- **Honest by design:** no invented research, unsupported claims, fake testimonials, or fabricated client results.
- **Security-conscious:** never commit API keys, tokens, client secrets, or private project data.

## Initial architecture

- Static, installable web-app foundation (HTML/CSS/JavaScript; no build step required for the initial shell).
- Device-local persistence for preferences and early personal-use project data.
- Separate modules planned for provider routing, writing skills, project management, and quality evaluation.
- GitHub is the source-of-truth repository; hosting is a separate deployment concern.

### Important security boundary

Browser storage is convenient but is **not a secure secrets vault**. A key saved in local storage can be read by JavaScript running on the same origin. The initial personal-use design may remember provider keys on this device, but keys must never enter source files, commits, logs, exports, or shared project records. A backend proxy with server-side secrets is the safer future option, but requires a backend host and additional security work.

## Repository map

- `index.html` — app entry point
- `assets/css/styles.css` — visual system and responsive styling
- `assets/js/app.js` — initial UI behavior
- `docs/PRODUCT_BRIEF.md` — product scope and users
- `docs/DESIGN_DNA.md` — visual and interaction rules
- `docs/ARCHITECTURE.md` — technical boundaries and planned modules
- `docs/SECURITY.md` — key handling and privacy rules
- `docs/ROADMAP.md` — staged implementation plan

## Run locally

Open `index.html` in a browser. For PWA installation and reliable service-worker behavior, serve the project over HTTPS (for example, through a supported static host).

## Current limitations

The initial shell is a visual foundation only. AI calls, provider-key storage, automatic fallback, client/project persistence, exports, and production PWA caching must be implemented and tested in later stages.

## License

No open-source license has been selected yet. Do not assume the code is licensed for reuse until a license is added.
