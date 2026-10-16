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
- [ ] Editable structured client profiles.
- [ ] Draft/editor persistence and project revision history.
- [ ] Robust import/restore, clear-data and reset controls.
- [ ] Test malformed data, quota and storage-failure behavior.

## Stage 3 — Writing engine
- [x] Draft core agent behavior contract.
- [x] Draft client discovery and delivery workflow.
- [x] Draft writing quality and factual-integrity standard.
- [x] Create specialist playbooks for direct response, website/product copy, email, editorial/long-form, business communication, and editing.
- [x] Add a modular skill registry and connect the Writing Skills catalogue to it.
- [ ] Pass selected skill instructions into live generation requests.
- [ ] Implement brief-completeness checks and clarification flow.
- [ ] Implement draft/revise workflow.
- [ ] Implement quality checks and unsupported-claim flags.
- [ ] Test realistic client scenarios.

## Stage 4 — Provider connections
- [ ] Provider settings UI with connect/test/disconnect flows.
- [ ] Separate adapter per supported provider.
- [ ] Local credential persistence with explicit security warnings.
- [ ] Normalized error handling.
- [ ] Task-aware model selection and bounded fallback.
- [ ] Verify model availability, free-tier constraints, CORS, and API behavior before implementing each adapter.

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

## Stage 7 — Security and release review
- [ ] Secret scan and repository diff review.
- [ ] Data handling and provider disclosure.
- [ ] Keyboard/accessibility and mobile QA.
- [ ] Known limitations documented.
- [ ] Production readiness only after real tests.
