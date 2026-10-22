# Frequently asked questions

## Is Blinkrivet an official Meta product?

No. It is independent tooling. Licensed, pinned official Meta sources are included in npm with their notices; that does not imply endorsement.

## Why is this repository public while the development repo is private?

This repository gives everyone a stable place to read docs, try consumer examples and discuss usage. It contains no library implementation or private development history. The npm package itself is public and includes its runtime TypeScript and compiled JavaScript. Anyone can download that runtime; repository privacy does not hide already-published files.

## Do I need access to the private repo?

No. Install `@adiitj/blinkrivet` from npm. This public repo’s demo and checks work with that installed package alone.

## Does it upload my application?

Scenarios run on your machine or your CI, with the app/browser requests your scenario requires. There is no Blinkrivet cloud test service in this workflow. `weartest docs` is an opt-in network request to Meta’s public documentation service and sends your explicit query. Inspect app-owned third-party traffic and screenshots separately.

## Why did my first screenshot fail?

A screenshot without an accepted baseline is an unreviewed candidate. Inspect it before explicit approval. Assertion and performance failures are not eligible for baseline acceptance. See [CLI baseline review](CLI.md#baseline-review).

## Why did a previously accepted screenshot need another review?

Browser/platform, rendering, font or mask provenance may have changed. Use consistent environments and platform-specific baselines. Raising pixel tolerances is not a substitute for inspecting the cause.

## Why does a warm zero-byte budget fail locally?

The official preview uses no-cache headers. It cannot establish the cache headers of your eventual host. Make the measurement environment explicit; a relaxed budget is not proof of the original target. See [review measurements](REVIEW.md#interpret-performance-honestly).

## Does installation prove my app is correct?

No. Install the tool, describe your app’s expected behaviour, run the checks, and review evidence. Actual glasses remain necessary for hardware-dependent observations.

## Where do I ask questions or report a security problem?

Use public [Discussions](https://github.com/ADIITJ/blinkrivet-docs/discussions) for sanitized usage questions and documentation feedback. Do not publish vulnerabilities, secrets or private artifacts; see [security guidance](../SECURITY.md).
