# HP Copywriter OS

**A professional, mobile-first AI writing workspace.**

HP Copywriter OS is being built to help a freelance writer manage client discovery, briefs, research, writing projects, revisions, and deliverables in one calm, polished workspace.

> Status: Live foundation prototype. The owner has confirmed that the shell loads and the initial manual smoke test passes. This is not yet a connected AI agent or production-ready service.

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

## Agent specification added

The first agent design documents now live under agent/:

- agent/CORE_BEHAVIOR.md — role, operating principles, default task loop, and boundaries.
- agent/WORKFLOW.md — client-to-deliverable workflow.
- agent/QUALITY_STANDARD.md — quality dimensions and mandatory review flags.
- agent/skills/ — initial playbooks for direct-response, website/product, email, editorial/long-form, business communication, and editing/revision.

These are specifications, not yet wired into a live model call. The next step is to implement a skill registry and use these playbooks as structured context for generation and evaluation.

## Important security boundary

Browser storage is convenient but is **not a secure secrets vault**. A key saved in local storage can be read by JavaScript running on the same origin. The initial personal-use design may remember provider keys on this device, but keys must never enter source files, commits, logs, exports, or shared project records. A backend proxy with server-side secrets is the safer future option, but requires a backend host and additional security work.

## Repository map

- index.html — app entry point
- assets/css/styles.css — visual system and responsive styling
- assets/js/app.js — initial UI behavior
- agent/ — agent behavior contract, workflow, quality standard, and specialist playbooks
- docs/PRODUCT_BRIEF.md — product scope and users
- docs/DESIGN_DNA.md — visual and interaction rules
- docs/ARCHITECTURE.md — technical boundaries and planned modules
- docs/SECURITY.md — key handling and privacy rules
- docs/ROADMAP.md — staged implementation plan

## Run locally

Open index.html in a browser. For PWA installation and reliable service-worker behavior, serve the project over HTTPS (for example, through a supported static host).

## Current limitations

The current UI is an early shell. AI generation, provider-key storage, automatic fallback, structured client profiles, draft/revision persistence, import/restore, and production PWA caching still need implementation and testing.

## License

No open-source license has been selected yet. Do not assume the code is licensed for reuse until a license is added.
