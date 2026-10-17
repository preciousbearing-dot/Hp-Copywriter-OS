# Security and Privacy Rules

## Non-negotiable rules
1. Never commit provider API keys, access tokens, passwords, cookies, or private client secrets.
2. Never place secrets in HTML, JavaScript source, GitHub Pages configuration, screenshots, bug reports, or sample data.
3. Never print full keys in logs, error messages, or telemetry.
4. Do not include API keys in exported client briefs or writing deliverables.
5. Do not send client information to an AI provider without the user's deliberate action and an appropriate privacy warning.
6. Do not claim local storage is encrypted or equivalent to a secrets vault.

## Device-local persistence
The current personal-use prototype remembers each provider key in a separate browser-storage namespace so the user does not paste it each session. This is a convenience feature, not strong secret protection: JavaScript executing on the same origin can access local storage.

Mitigations:
- Mask key values in the interface.
- Keep credentials in a separate settings namespace.
- Provide replace/disconnect controls.
- Send provider credentials in API headers rather than placing keys in request URLs. Gemini uses `x-goog-api-key`; bearer-token APIs use the `Authorization` header; Anthropic uses `x-api-key`.
- Keep provider error messages normalized; do not echo raw response bodies or keys into the interface.
- Avoid third-party scripts and unnecessary dependencies.
- Use HTTPS.
- Do not store keys in project records, drafts, exports, or diagnostic output.
- Explain that clearing site data may erase saved settings and that local keys do not automatically sync to another device.

Direct browser requests can be blocked by provider CORS or security policy. A connection error is not conclusive proof that a key is invalid. Do not expose keys to public source code as a workaround.\n\n## Safer future option
A backend proxy can keep provider keys server-side, but requires secure authentication, access controls, rate limiting, abuse prevention, secret management, and a backend host. Do not introduce a backend and imply it is secure without implementing and testing these controls.

## Public repository
Treat the repository as public unless verified otherwise. Only use fake sample data. Before each release, inspect diffs for secrets and accidental personal information.

## Data loss
Local data can be cleared by browser settings, storage eviction, uninstall/reset actions, or device loss. Add export/backup and clear-data confirmation before the app becomes a reliable daily workspace.
