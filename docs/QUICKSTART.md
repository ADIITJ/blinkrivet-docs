# Your first Blinkrivet run

Use Node 22.14+ and a trusted local app. The scenario engine can check a browser-served app; the optional official review has a narrower Meta React/Vite app contract.

## In your application

```sh
npm install --save-dev @adiitj/blinkrivet
npx weartest setup
npx weartest doctor
npx weartest init
```

`setup` installs the pinned Chromium build and verifies the bundled tools/image pipeline. Linux runners may need `npx weartest setup --with-deps` to install system packages. There is no automatic browser download during npm installation.

Start the app using its normal command. Edit the generated `weartest.json`: replace the URL and steps with your actual app behaviour. Run it in a fresh directory, inspect the report, and review eligible screenshot candidates before accepting a baseline. See the [baseline workflow](CLI.md#baseline-review).

## Try the public demo

This example is an intentionally small consumer app. It uses the public npm package; no private repository access is needed.

```sh
 git clone https://github.com/ADIITJ/blinkrivet-docs.git
 cd blinkrivet-docs
 npm ci
 npx weartest setup
 npm run demo
```

Open `http://127.0.0.1:4173`. The app has Start and Reset controls, directional focus, and visible connection status. It binds to loopback only. If the port is busy, stop the existing local service first.

Leave the demo running. In a second terminal at the repository root:

```sh
npx weartest run examples/session.json --output .weartest/first-look
npx weartest report .weartest/first-look
```

Expected first-run exit: **1**, because no screenshot baseline exists. Inspect `.weartest/first-look/index.html` and its original PNG. Only after reviewing the visual candidate:

```sh
npx weartest baseline accept .weartest/first-look --reviewed
npx weartest run examples/session.json --output .weartest/verified
```

The second run should pass on the same browser/platform after explicit acceptance. If you rerun these instructions, choose new output names. Never delete a prior run just to disguise a failure.

## Make a regression visible

`http://127.0.0.1:4173/?broken=1` intentionally prevents the Start action from reaching the ready state. The included regression scenario expects that state and fails:

```sh
npx weartest run examples/regression.json --output .weartest/regression-001
```

Expected exit: **1**, with a failed text assertion. This scenario deliberately omits screenshot baselines, so its failure cannot be mistaken for a missing baseline. Read the actual report to distinguish the two.

## Verify the examples

Stop `npm run demo` first; the check owns port 4173 during execution.

```sh
npm run check
npm test
```

The consumer check starts the demo, confirms the healthy assertions pass, confirms the intentional regression fails, and confirms a first screenshot needs review. It never accepts baselines. It tests these public examples, not the library’s private test suite.

[Back to README](../README.md)
