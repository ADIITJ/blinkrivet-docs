# Coverage and limits

Blinkrivet focuses on Meta Display **web apps**. The scenario engine can check browser-served applications; the official gate additionally requires its supported React/Vite app contract.

| Layer | Supported use | Boundary |
| --- | --- | --- |
| DOM scenarios | Expected text, visibility, labels, overflow and focus | Requires semantic DOM; internal canvas state is not inferred |
| Input | Browser arrow keys, Enter, Escape and declared traversal | Physical gestures and neural-band recognition require hardware |
| Visuals | Reviewed screenshots, pixel diffs, bounded masks, provenance | Desktop rasterization is not optical readability on glasses |
| Connectivity | Declared offline/reconnect and network conditions | Not a physical Bluetooth-link model |
| Official gate | Bundled, pinned Meta validator execution | Meta’s supported app scaffold, trusted build commands |
| Performance | Repeated production browser measurements with explicit readiness | Worker CPU, transport overhead and device timing remain approximations |
| WebMCP | Declared app tools tested with isolated browser doubles | Not real speech recognition, Meta AI or on-device transport |
| Documentation | Opt-in public MCP search | Advisory reference; never a passing test |
| Simulator/device | Manual guidance and explicit unobserved status | No automatic hardware certification |

Display rendering uses 600×600 CSS pixels/DPR 1 and recorded environment provenance. Keep platform-specific baselines. This does not instruct responsive Toolkit apps to hardcode their layout.

HTTP worker profiling uses independent accounting. Worker-free HTTPS has explicitly labeled page counters; HTTPS combined with workers fails closed because encrypted worker traffic cannot be certified there. No-byte warm targets depend on the hosting/cache policy under measurement.

Built-in adapters are not a supported third-party plugin registry. Native companion-app automation, Unity, physical EMG and universal device testing are not promised. One passing flow does not establish every route, state or product requirement.

[Official Meta review](REVIEW.md) · [Detailed package capability matrix](https://unpkg.com/@adiitj/blinkrivet@0.2.1/docs/ADAPTER_CAPABILITIES.md)
