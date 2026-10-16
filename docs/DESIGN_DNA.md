# Design DNA 1.0

## Creative direction
**Editorial Luxury × Creative Intelligence.**

HP Copywriter OS should feel like a professional writing studio and an elite freelance workspace—not a generic chatbot, a noisy CRM, or a clone of Knowvia.

Knowvia is a reference for craft and consistency only. Do not reuse its exact palette, gradients, visual assets, or screen compositions.

## Brand traits
- Intelligent, composed, commercially aware, creative, quietly confident.
- Premium through hierarchy, spacing, typography, and interaction quality—not decoration.
- Warm enough to invite creative work; precise enough to support professional delivery.

## Initial palette (provisional tokens)
- Obsidian Ink: `#17191D` — dark primary surfaces.
- Warm Porcelain: `#F6F3ED` — light-mode canvas.
- Muted Copper: `#BD8967` — restrained signature accent.
- Deep Forest: `#315C50` — positive states and selected emphasis.
- Slate: `#747982` — secondary text.
- Soft Graphite: `#30343A` — dark borders and separators.

These are starting tokens, not immutable brand law. Check contrast and adjust before production.

## Theme behavior
- Support dark and light themes.
- Initial default: dark editorial theme; remember the user's choice locally.
- Do not make important meaning depend on colour alone.
- Provide clear focus states, readable contrast, and accessible control sizes.

## Typography
- Use a restrained, legible sans-serif for interface controls.
- Use a highly readable text face for long-form writing; a subtle editorial serif may be used for selected display headings only if it improves clarity.
- Establish clear scale for page title, section title, body, metadata, labels, and helper text.
- Avoid tiny labels and overly condensed body copy.

## Layout
- Mobile-first, one-thumb-friendly navigation.
- Keep primary actions visible and reachable on phones.
- Desktop may add a persistent sidebar and wider editor layout.
- Use consistent spacing, alignment, border radii, and surface elevation.
- Protect the writing canvas from dashboard clutter.

## Components
- Navigation, buttons, form controls, status badges, cards, empty states, dialogs, toasts, tabs, draft editor, project list, provider cards, quality checklist.
- Every component must have default, hover/focus, active, disabled, loading, success, and error states where applicable.

## Motion and effects
- Use short, purposeful transitions.
- Avoid excessive glassmorphism, neon, giant gradients, constant animation, or ornamental charts.
- Respect reduced-motion preferences.

## Quality bar
- No placeholder links that look functional but do nothing.
- No dead buttons, clipped text, horizontal overflow, or inaccessible contrast.
- Empty states should explain the next useful action.
- Errors should say what happened and how to recover.
- Test at narrow phone widths before considering a screen complete.
