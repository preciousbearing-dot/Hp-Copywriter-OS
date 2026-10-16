# Product Brief

## Working name
HP Copywriter OS

## Product vision
A polished, mobile-first workspace that helps a freelance writer run the work behind professional writing: understand clients, clarify briefs, research responsibly, create strong drafts, revise with purpose, and deliver clean assets.

## Primary user
Initially, one writer using an Android phone and later a laptop. The product should remain usable on a small screen and should not depend on a paid development stack during the proof-of-concept phase.

## Core user journey
1. Start or open a client workspace.
2. Capture the business, audience, offer, voice, proof, constraints, and goal.
3. Create a project and clarify missing information.
4. Choose a writing workflow or specialist skill.
5. Research or work from user-provided evidence.
6. Draft, review, revise, and run quality checks.
7. Save and export a deliverable.
8. Preserve useful project context for the next session.

## Writing coverage
The product should be a generalist professional writer with specialist workflows, not a one-format copy generator. Planned categories include:
- Direct-response copy: landing pages, sales pages, ads, email sequences, offers.
- Website and product copy.
- Brand messaging and positioning.
- Business communication, proposals, and reports.
- Educational content, articles, scripts, and social content.
- Editing, rewriting, proofreading, and content repurposing.

Quality and suitability vary by task; the agent should ask questions when the brief lacks information that materially affects the result.

## Agent behavior
- Discover the actual objective before writing when the brief is ambiguous.
- Distinguish facts, user-provided claims, hypotheses, and recommendations.
- Never invent sources, testimonials, statistics, credentials, or results.
- Match format, audience, voice, channel, and constraints.
- Explain material assumptions and flag unsupported claims.
- Critique drafts against the brief, not only grammar.
- Keep client/project context scoped to the relevant workspace.
- Ask for confirmation before irreversible external actions; the first version does not autonomously publish or contact clients.

## Initial MVP boundaries
**In scope:** responsive shell, local preferences, client/project model, brief capture, draft workspace, provider settings UI, modular skill registry, manual save/export, evaluation checklist.

**Later:** real model calls, tested provider adapters, fallback routing, robust offline/PWA caching, richer export formats, automated tests, optional backend, multi-user accounts.

**Out of scope for the first MVP:** autonomous outreach, email sending, payments, CRM integrations, multi-agent orchestration, subscription billing, permanent server-side storage of personal API keys.

## Success criteria
- Works comfortably on the user's phone.
- Core navigation and forms are understandable without a tutorial.
- Reloading does not unexpectedly erase saved local project data once persistence is implemented.
- No secrets are committed to GitHub.
- Writing tasks produce outputs aligned with the brief and pass explicit quality checks.
- Provider errors are understandable and do not silently lose the user's draft.
