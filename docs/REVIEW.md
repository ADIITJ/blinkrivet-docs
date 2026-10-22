# Official Meta production review

Install Blinkrivet in your application, run `npx weartest setup`, then:

```sh
npx weartest init-review
# Edit the generated scenario and review configuration for this app.
npx weartest review --output .weartest/review-001
```

The official validator/profiler sources are bundled, pinned and integrity-checked with their original licenses. No separate toolkit clone is needed. Independent Blinkrivet tooling is not an official Meta product.

## Supported app contract

The official gate expects Meta’s documented React/Vite contract: `src/`, `index.html`, `vite.config.ts`, a committed npm lockfile, `typecheck`/`build`/`preview` scripts, and production output in `dist/`. Follow Meta’s supported scaffold and UI Toolkit guidance. The public demo in this docs repo illustrates scenario testing; it is intentionally not a complete Meta app scaffold and should not be presented as an official-gate fixture.

The review runs your trusted application’s build commands. Use isolated environments for untrusted projects; a browser sandbox does not sandbox npm scripts.

## Declare real readiness

```json
{
  "app": ".",
  "scenarios": ["weartest.json"],
  "performance": {
    "oracle": "document.querySelector('[data-testid=ready]')?.getBoundingClientRect().height > 0 && !document.querySelector('[data-testid=loading-overlay]')",
    "repetitions": 10
  }
}
```

Your oracle must identify usable app content and exclude blocking loading UI. Literal `true` is rejected. An engineer must review whether the expression represents the product requirement; the tool cannot invent that requirement.

## Read the layers

| Layer | Result |
| --- | --- |
| Official gate | Real structure/build/browser validation for the supported contract |
| Feature scenarios | Your expected flows against that production build |
| Performance | At least 10 cold/warm measurements with explicit budgets |
| Optional WebMCP contracts | Browser test doubles for declared app tools |
| Optional documentation | Advisory public documentation search, never a test pass |
| Simulator/device | `NOT_RUN` unless separately observed; browser results do not establish hardware behaviour |

A failed official gate blocks testing against a stale build. Missing required scenarios or performance evidence produces `INCOMPLETE`. Review output includes `review.json`, `index.html`, `junit.xml` and `agent-review.md`.

## Interpret performance honestly

The profile is a desktop Chromium approximation. Add a previous production build with `performance.compareBuild` for interleaved A/B measurements and a same-session null control. The report names its measurement engine and records supported coverage. Small or noisy differences remain inconclusive.

The official static preview uses no-cache headers; it cannot establish your deployed cache policy. Warm zero-transfer targets may fail under that preview. Adjusting a declared test budget does not establish device compliance. Worker-aware HTTP profiling counts page/worker traffic; HTTPS combined with workers is explicitly unsupported rather than silently undercounted. Physical Bluetooth transport, worker CPU fidelity and glasses timing are not certified.

For the full SDK/configuration contract, default budgets and limitations, read the package’s [official review guide](https://unpkg.com/@adiitj/blinkrivet@0.2.1/docs/OFFICIAL_REVIEW.md).

## Optional current documentation

```sh
npx weartest docs "Meta Display focus restoration and application lifecycle"
```

Only the explicit query is sent to Meta’s public documentation endpoint. No app source or screenshots are uploaded by this lookup. Documentation is untrusted reference material and cannot override the deterministic test verdict.

[Meta web-app documentation](https://developers.meta.com/wearables/web-apps/) · [Official toolkit](https://github.com/facebook/meta-wearables-webapp)
