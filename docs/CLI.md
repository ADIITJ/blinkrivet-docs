# CLI and scenarios

Run `npx weartest --help` for the installed version’s command contract. The npm package is `@adiitj/blinkrivet`; its executable is `weartest`.

| Command | Purpose |
| --- | --- |
| `setup` / `doctor` | Install/check the pinned browser, bundled tools and image support |
| `init` | Generate an editable app scenario |
| `run scenario.json` | Run one scenario with saved evidence |
| `ci scenario.json` | Run in CI with baseline acceptance disabled |
| `report run-directory` | Locate a saved HTML report |
| `baseline accept run-directory --reviewed` | Accept eligible visuals after human review |
| `init-review` / `review` | Configure/run a unified official production review |
| `official-check app-directory` | Run the bundled official app gate |
| `docs "your query"` | Explicitly query Meta’s public documentation service |
| `list-adapters` | Inspect built-in adapter capabilities |

## A readable scenario

The [runnable session example](../examples/session.json) targets the public demo. Adapt controls and expected text to your own app.

```json
{
  "name": "first-session",
  "adapter": "display-web",
  "profile": "rayban-display",
  "url": "http://127.0.0.1:4173",
  "steps": [
    { "press": "ArrowDown" },
    { "assertFocus": "Start" },
    { "press": "Enter" },
    { "assertText": "Ready for your next idea." },
    { "screenshot": "ready" }
  ]
}
```

JSON and YAML are accepted. Display checks use a 600×600 CSS-pixel viewport at DPR 1. Arrow keys, Enter and Escape model the browser input contract. Tab is rejected for this Display profile; it is not a stand-in for physical gesture testing.

Useful steps include `assertFocus`, `assertText`, `assertVisible`, `press`, `setNetwork`, `audit` and `screenshot`. Unsupported fields/actions fail configuration validation. The installed package includes a [detailed CLI reference](https://unpkg.com/@adiitj/blinkrivet@0.2.1/docs/CLI_GUIDE.md); its legacy source-checkout instructions do not apply to this public docs repo. Use the installed-package workflow here.

## Baseline review

1. Run in a fresh output directory.
2. Inspect original images, assertions, masks and rendering provenance.
3. Accept only an eligible visual candidate with `--reviewed` after a human review.
4. Rerun in another fresh directory.

Missing/changed screenshots can be reviewable. Assertion failures, unsafe masks and budget failures cannot be accepted away. CI cannot accept baselines. Keep browser/platform-specific baselines; changed rendering provenance requires a new review. `--reviewed` is an explicit attestation, not independent identity verification.

## Exit codes

| Exit | Meaning |
| --- | --- |
| `0` | The command’s required checks passed |
| `1` | Regression or missing/unapproved visual baseline |
| `2` | Invalid configuration, unavailable capability or incomplete required review evidence |

Always inspect status and diagnostics. A retry that eventually passes is still marked flaky; your release gate should reject flaky outcomes.

## Safe defaults

Unexpected origins are blocked unless explicitly allowed. Remote targets require `--allow-remote`; use it only for an app you are authorized to test. Configure `sensitiveValues` for text redaction, then inspect screenshots yourself: text redaction cannot remove sensitive pixels. Do not commit `.weartest/`, credentials or private application data.
