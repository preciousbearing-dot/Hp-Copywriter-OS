# Roadmap

## Stage 0 — Foundation
- [x] Establish product brief.
- [x] Establish Design DNA 1.0.
- [x] Document architecture and security boundaries.
- [x] Create initial responsive app shell.
- [x] Confirm repository and hosting setup.

## Stage 1 — Usable shell
- [x] Mobile-first dashboard and navigation.
- [x] Dark/light theme switch and local preference.
- [x] Client and project list with empty states.
- [x] Project brief form and project detail view.
- [x] Accessible focus states and responsive styling.
- [x] Owner-reported manual smoke test passes; no automated QA suite yet.

## Stage 2 — Local data
- [x] Basic local persistence for clients, projects, and theme preference.
- [x] Basic workspace JSON export.
- [ ] Versioned storage adapter and schema migrations.
- [x] Editable structured client profiles for business, audience, offer, brand voice, proof, and notes.
- [x] Manual project draft persistence with a basic previous-draft snapshot when replacing an existing draft.
- [ ] Dedicated revision history UI and restore controls.
- [ ] Robust import/restore, clear-data and reset controls.
- [ ] Test malformed data, quota and storage-failure behavior.

## Stage 3 — Writing engine
- [x] Draft core agent behavior contract.
- [x] Draft client discovery and delivery workflow.
- [x] Draft writing quality and factual-integrity standard.
- [x] Create specialist playbooks for direct response, website/product copy, email, editorial/long-form, business communication, and editing.
- [x] Add a modular skill registry and connect the Writing Skills catalogue to it.
- [x] Pass selected skill instructions into Gemini generation requests using the compact skill registry.
- [x] Implement a local heuristic brief-completeness check and an initial AI clarification behavior for critical missing details.
- [x] Implement first-draft generation and revise-current-draft workflow.
- [ ] Implement automated quality checks and unsupported-claim flags.
- [ ] Test realistic client scenarios and manually review generated output.

## Stage 4 — Provider connections
- [x] First provider settings UI with save, connection test, and disconnect flows (Gemini only).
- [x] First provider adapter for Gemini REST text generation.
- [x] Device-local credential persistence with explicit non-encrypted-storage and data-disclosure warnings.
- [x] Initial normalized handling for authentication, model, quota, server, timeout, and network errors.
- [x] Discover models dynamically from the connected Gemini key; only list models advertising `generateContent` support.
- [x] Keep the Gemini key in the request header rather than the URL; normalize errors without echoing provider response details or credentials.
- [x] Add automated browser tests for dynamic model discovery, connection testing, and quota-error messaging.
- [ ] Add separate adapters for two additional providers.
- [x] Research current Gemini model options, free-tier caveats, and browser-prototype security guidance.
- [ ] Verify actual API/CORS behavior, model access, and end-to-end generation in the live browser.
- [ ] Task-aware model selection and bounded fallback across providers.

## Stage 5 — Evaluation
- [ ] Simulate vague, demanding, uncertain, and changing clients.
- [ ] Evaluate discovery, strategic fit, factual integrity, voice, structure, revision quality, and delivery.
- [ ] Track failures and regression-test fixes.
- [ ] Do not claim reliability until tests support it.

## Stage 6 — PWA and deployment
- [ ] Manifest, icons, service worker, offline shell.
- [ ] Cache-version/update behavior.
- [x] HTTPS hosting through GitHub Pages.
- [x] Owner confirmed live shell loads and initial manual smoke test passes.
- [ ] Confirm updates appear without corrupting local data.
- [ ] Re-test provider setup, generated drafts, revisions, and storage after live deployment.

## Stage 7 — Security and release review
- [ ] Secret scan and repository diff review.
- [ ] Data handling and provider disclosure.
- [ ] Keyboard/accessibility and mobile QA.
- [ ] Known limitations documented.
- [ ] Production readiness only after real tests.
