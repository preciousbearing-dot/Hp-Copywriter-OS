# Architecture Notes

## Guiding principle
Keep the first release small and inspectable. Separate UI, persisted data, writing workflows, provider integrations, and quality evaluation so each can evolve without rewriting the entire app.

## Planned layers

### 1. Presentation
Responsive HTML/CSS/JavaScript shell. Components render views and emit user actions; they should not contain provider-specific API logic.

### 2. Local data layer
A versioned storage adapter for preferences, clients, projects, briefs, drafts, and local history. Start with browser storage for a single-user prototype. Include schema versioning, defensive parsing, and export/backup capability before relying on it for important work.

Do not store API keys inside client records, drafts, exports, or logs. If local key persistence is enabled, keep provider credentials in a separate settings namespace and make the security trade-off explicit.

### 3. Writing engine
- Core agent instructions and behavior rules.
- Brief discovery and clarification.
- Specialist skill/playbook registry.
- Draft generation and revision workflows.
- Quality evaluation and claim/proof checks.

Keep prompts and skills versioned as files rather than one enormous hard-coded prompt.

### 4. Provider adapters
Each provider adapter owns its endpoint format, authentication header, model listing, request payload, response parsing, and error normalization. Do not assume all providers have identical APIs or identical rate-limit behavior.

### 5. Routing and fallback
Routing chooses a suitable configured model based on task needs, known capabilities, user preference, and availability. It should:
- Respect an explicit user-selected model when possible.
- Distinguish authentication failures, quota exhaustion, rate limits, timeouts, network failures, and provider outages.
- Retry only when appropriate, with bounded backoff.
- Fall back only to configured, compatible providers.
- Preserve the brief and draft when switching providers.
- Notify the user when the provider/model changes.
- Never imply that a task succeeded when all attempts failed.

### 6. Deployment
A static host can serve the frontend but cannot safely provide server-side secret storage by itself. Direct browser-to-provider calls may expose keys to same-origin JavaScript and may encounter CORS or provider-specific restrictions. A future backend proxy requires a backend-capable host, server-side secrets, access controls, request limits, and careful logging policy.

## Proposed module boundaries
- `assets/js/app.js` — app boot and view coordination.
- `assets/js/storage.js` — versioned local persistence.
- `assets/js/projects.js` — client/project data operations.
- `assets/js/skills.js` — writing skill registry.
- `assets/js/providers/` — provider adapters and normalized errors.
- `assets/js/router.js` — model selection, retries, fallback.
- `assets/js/quality.js` — evaluation checks.
- `assets/css/styles.css` — design tokens and responsive components.

Only add modules when they have a clear responsibility; avoid premature complexity.

## Progressive Web App
Add manifest, icons, and service worker only after the shell is stable. Cache static assets deliberately; never cache API keys or model responses by default. A deployment update must account for service-worker cache versioning and stale-client behavior.
