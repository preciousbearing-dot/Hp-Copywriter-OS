# Roadmap

## Stage 0 — Foundation
- [x] Establish product brief.
- [x] Establish Design DNA 1.0.
- [x] Document architecture and security boundaries.
- [ ] Create initial responsive app shell.
- [ ] Confirm repository and hosting setup.

## Stage 1 — Usable shell
- Mobile-first dashboard and navigation.
- Dark/light theme switch and local preference.
- Client and project list with empty states.
- Project brief form and draft workspace.
- Accessible focus states and responsive checks.

## Stage 2 — Local data
- Versioned storage adapter.
- Client/project/draft persistence.
- Safe import/export or backup.
- Clear-data and reset controls.
- Test reload and storage-failure behavior.

## Stage 3 — Writing engine
- Core agent behavior contract.
- Discovery questionnaire and brief completeness checks.
- Modular writing skills.
- Draft/revise workflow.
- Quality checklist and unsupported-claim detection.

## Stage 4 — Provider connections
- Provider settings UI.
- Separate adapter per supported provider.
- Connect/test/disconnect flows.
- Local credential persistence with clear warnings.
- Normalized error handling.
- Task-aware model selection and bounded fallback.

## Stage 5 — Evaluation
- Simulate vague, demanding, uncertain, and changing clients.
- Evaluate discovery, strategic fit, factual integrity, voice, structure, revision quality, and delivery.
- Track failures and regression-test fixes.
- Do not claim reliability until tests support it.

## Stage 6 — PWA and deployment
- Manifest, app icon, service worker, offline shell.
- Cache-version/update behavior.
- HTTPS hosting and phone installation.
- Confirm updates appear without corrupting local data.

## Stage 7 — Security and release review
- Secret scan and repository diff review.
- Data handling and provider disclosure.
- Keyboard/accessibility and mobile QA.
- Known limitations documented.
- Production readiness only after real tests.
