# AI provider setup guide

HP Copywriter OS currently includes browser-side adapters for Google Gemini, GroqCloud, Cerebras Inference, OpenRouter, the OpenAI API, and Anthropic Claude.

## Connect a provider

1. Open **Settings → AI provider connections**.
2. Expand **Step-by-step setup guide** on the provider card.
3. Open the official provider account/API-key page from that card and sign in or create an account.
4. Create an API key in the provider's own console. Review usage limits, billing, and data-use terms before enabling it.
5. Return to HP Copywriter OS and paste the key into that provider's own key field. Never paste it into a public issue, source file, or chat.
6. Select **Discover models & test**. The app attempts to list models available to the key and make a small generation request.
7. If the test passes, choose **Use for writing** if you want to make that provider active. Draft generation and revision use the active saved provider.
8. Repeat for any other provider you want to configure.

The provider card includes the official links and a setup checklist:
- Google Gemini: https://aistudio.google.com/app/apikey
- GroqCloud: https://console.groq.com/keys
- Cerebras: https://cloud.cerebras.ai/
- OpenRouter: https://openrouter.ai/settings/keys
- OpenAI API: https://platform.openai.com/api-keys
- Anthropic Claude: https://console.anthropic.com/settings/keys

## What connection testing means

The test first requests the model catalogue exposed by the provider's API, filters/normalizes model entries where applicable, then submits a short generation request. A successful test confirms that these two requests worked at that moment. It does not guarantee future availability, free usage, a particular quality level, or that all models support every task.

The app includes fallback model suggestions so a card has a starting state before discovery. Those suggestions are not proof that a model is available to your account. A successful discovery replaces them with models returned by the provider.

## Provider support and browser limitations

Gemini uses its native generateContent REST endpoint. Groq, Cerebras, OpenRouter, and OpenAI use OpenAI-compatible chat-completions request formats. Anthropic uses its Messages API. These APIs are similar but not identical, so provider-specific adapters remain separate.

This version calls provider APIs directly from the browser. A provider may block a request because of CORS, browser security, key restrictions, account permissions, or endpoint policy. A network/CORS error does not prove that the key is invalid. Do not work around it by placing a key in the URL or committing a key to source code. Providers that disallow direct browser calls need a backend connector with server-side secret management and access controls.

## Credential and privacy warning

Provider keys are stored separately per provider in this browser's local storage. Local storage is not encrypted and is not a secure secrets vault; same-origin JavaScript and people with access to this browser profile may read it. This prototype has no server-side key vault and keys do not automatically sync to other devices. Disconnecting removes the saved local copy; it does not revoke the key at the provider. Revoke a key in the provider console if you suspect exposure.

When you generate or revise copy, the brief, relevant client context, current draft, and writing instructions are sent to the selected provider. Review that provider's privacy/data-use terms and avoid sending confidential client data without permission. API usage may incur charges, and ChatGPT subscriptions are separate from OpenAI API billing.

## Adding another provider

Add a definition in assets/js/provider-manager.js with its official signup/docs links, onboarding steps, API style, endpoint, and a conservative default model suggestion. Implement or extend a dedicated adapter branch for its authentication, model-list response, generation payload, response parsing, and error handling. Add mocked browser regression tests for model discovery, generation, key isolation, and failure handling. Verify official API documentation and live browser/CORS behavior before marking a new provider as validated.
