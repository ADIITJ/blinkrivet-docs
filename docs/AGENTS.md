# Give your coding agent evidence

Blinkrivet’s CLI and ESM library use the same scenario engine. No proprietary agent plugin, testing account or hosted service is required.

## A useful repair loop

1. Define the app’s actual user flow, including applicable loading/error/offline states.
2. Start its production preview and run the scenario or official review in a fresh directory.
3. Inspect the result JSON, failed steps, screenshots and diffs.
4. Fix application code and rerun. Keep prior evidence.
5. Bring visual candidates to a human for review. Gate on passing, non-flaky outcomes.

A passing scenario establishes only its declared checks. Neither an agent nor a library can infer all product requirements.

## Run a scenario from JavaScript

```js
import { runScenario } from "@adiitj/blinkrivet";

const { result, reportPath } = await runScenario({
  name: "first-session",
  adapter: "display-web",
  profile: "rayban-display",
  url: "http://127.0.0.1:4173",
  steps: [
    { press: "ArrowDown" },
    { assertFocus: "Start" },
    { press: "Enter" },
    { assertText: "Ready for your next idea." }
  ]
});
if (result.status !== "passed" || result.flaky) {
  throw new Error(`Inspect the evidence: ${reportPath}`);
}
```

With the public demo running, execute the [consumer example](../examples/run-agent.mjs):

```sh
node examples/run-agent.mjs examples/assertions.json
```

The SDK returns regression results; invalid configuration/setup can reject the promise. `runScenario`, `scenarioSchema`, `acceptReviewedBaseline`, `reviewApp`, `reviewSchema`, `profileProduction`, `performanceSchema` and `searchOfficialDocs` are public ESM exports. TypeScript declarations ship in npm.

## Baseline policy

`acceptReviewedBaseline(runDirectory, { reviewed: true, baselines })` requires explicit human review and is prohibited in CI. An agent must not approve changes, broaden a mask, relax an assertion or raise a budget merely to make a run pass. A retry that passes remains flaky and should not satisfy this example’s gate.

## Suggested instruction for your own agent

> Run the declared Blinkrivet scenarios against the production preview. Inspect failures and saved evidence, fix the app, and rerun in fresh output directories. Preserve failures. Treat new visual baselines as requiring human review. Report any incomplete or unsupported layer explicitly, including simulator/device evidence. Do not equate a passing browser result with whole-app or physical-glasses correctness.

Keep app secrets out of prompts and public reports. Explicitly review screenshots before sharing them.
