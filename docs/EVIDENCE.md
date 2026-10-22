# Evidence you can review

A scenario run saves a static HTML report plus machine-readable results and relevant images. Open the report path printed by the command. Keep each run in a fresh output directory so a later result cannot overwrite a failure.

| Artifact | Use it for |
| --- | --- |
| `index.html` | Review step outcomes and available visual comparisons |
| `results.json` | Read statuses, failures, attempts and environment details |
| `junit.xml` | Attach results to your own CI |
| Original PNGs | Inspect actual captured pixels before baseline approval |
| Baseline/diff artifacts | Review eligible changed pixels and mask policy |
| `review.json` / `agent-review.md` | Inspect unified review layers and the coding-agent handoff |

Artifacts may contain sensitive application data. Text redaction does not redact screenshot pixels. Generated demo evidence stays ignored locally; only selected, inspected demo PNGs are intentionally published here.

## Release verification

These are maintainer release results for the published 0.2 runtime:

| Platform | Tests passed | Explicit skips |
| --- | ---: | ---: |
| macOS arm64 | 41 | 0 |
| Ubuntu 22.04 | 41 | 0 |
| Windows 2022 | 38 | 3 |

The Windows skips cover platform-specific POSIX/file-symlink cases. All 13 macOS quality gates and both platform CI workflows passed. Coverage included real supported UI Toolkit validation, complete production reviews, intentional feature failures, cold/warm measurements, comparison/null controls, worker HTTP accounting and installed CLI/SDK checks.

Version 0.2.1 changed only metadata and docs. Its runtime matched verified 0.2.0 byte for byte. Its packed install passed 21 checks; independently downloading its public tarball matched the tested SHA-512 integrity, and a fresh registry install passed 7 checks.

The full test implementation, engineering evidence and development history remain private. These counts are release verification claims, not a public reproduction of that internal suite. The public [docs workflow](https://github.com/ADIITJ/blinkrivet-docs/actions/workflows/docs.yml) validates this repository’s links, package integration and consumer examples only.

## Interpret a result precisely

- **Passed:** the declared, supported check passed in the recorded environment.
- **Failed:** inspect the assertion, setup, policy or measured budget that failed.
- **Incomplete:** required review evidence was not supplied or obtained.
- **Not run:** the layer was not observed; it must not be inferred as passing.

No physical optics, voice/EMG recognition, actual device timing or complete defect absence is certified. See [capabilities](CAPABILITIES.md).
