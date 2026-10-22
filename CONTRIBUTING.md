# Contribute to the public docs

Welcome: clearer explanations, corrected links, accessible visuals and minimal consumer examples. This repository intentionally contains documentation and user-facing examples only. Do not submit the library implementation, internal tests, private logs, credentials or proprietary app source.

Use [Discussions](https://github.com/ADIITJ/blinkrivet-docs/discussions) for sanitized usage questions and suggestions. Maintainer implementation work is tracked separately; this repo does not operate a duplicate issue backlog. Small documentation fixes may be submitted as pull requests.

Before proposing a change:

```sh
npm ci
npm run check
```

For example changes, also install the browser with `npx weartest setup` and run `npm test`. The example check deliberately verifies an expected regression and an unreviewed screenshot; it never auto-accepts baselines. Keep screenshots free of personal data.

Respect other contributors, discuss concrete behaviour, and avoid personal attacks. Documentation and examples use Apache-2.0; submit material you are entitled to share.
