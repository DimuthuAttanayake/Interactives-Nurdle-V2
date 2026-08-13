# Methodology — Global plastic production, 1950–2030

**Chart by:** Dimuthu Attanayake
**Built:** 11 August 2026
**Source file:** `src/routes/+page.svelte`
**Data file:** `static/data/global-plastic-production-projections.csv`

---

## 1. The question

The chart answers one question: how much plastic does the world produce each year, and where is that heading? It began as a 1950–2015 chart and was rebuilt to extend the series to 2030.

---

## 2. Data provenance

### Source

Our World in Data, ["Global plastic production with projections"](https://ourworldindata.org/grapher/global-plastic-production-projections).

OWID is an aggregator, not the originating researcher. The underlying sources are:

| Source | Contribution |
| --- | --- |
| Geyer, Jambeck & Law (2017), *Production, use, and fate of all plastics ever made*, Science Advances | Historical series, 1950–2015 |
| OECD (2022), *Global Plastics Outlook — Plastics use by application* | 2019 actual, plus the projection to 2060 |

Recommended citation: *Geyer et al. (2017); OECD (2022) — with major processing by Our World in Data.*

### How the data was retrieved

Every OWID grapher page exposes a CSV at the same URL with `.csv` appended. No scraping, no manual transcription:

```bash
curl -sL "https://ourworldindata.org/grapher/global-plastic-production-projections.csv" \
  -o static/data/global-plastic-production-projections.csv
```

Downloaded 11 August 2026. The companion `.metadata.json` endpoint on the same URL supplied the citation and the per-column processing notes quoted below, and was the basis for the vintage audit in §3.

### Why this dataset rather than the original one

The first version of the chart drew from `global-plastics-production`, which stops at 2019. Extending to 2030 required a series carrying projections. A sweep of OWID's sitemap for plastics-related graphers surfaced `global-plastic-production-projections`, which carries both the history and the OECD forecast **as two separate columns in one file** — the reason it was chosen over stitching two downloads together.

### Shape of the file

Four identifying columns plus two value columns:

```
Entity, Code, Year, "Annual plastic production between 1950 and 2019", "Plastic use - projections (Projected)"
```

- Values are in **tonnes**
- The file covers many regions (Americas, Asia, China, India, …); only `World` is charted
- The history column runs 1950–2019, the projection column 2019–2060
- The two overlap at exactly one year, 2019, at 459,746,016 t and 459,745,920 t — a 96-tonne rounding difference, i.e. 0.00002%. They join seamlessly, which is what makes a single continuous line honest.

---

## 3. Data vintage — what is measured and what is modelled

This is the most important caveat in the chart, and it is more layered than the strapline admits. From OWID's own column metadata:

| Years | Status | Origin |
| --- | --- | --- |
| 1950–2015 | Research figures | Geyer et al. (2017) |
| 2016–2018 | **Modelled** | Flat 5% annual growth applied to 2015, matching Geyer's own growth estimate |
| 2019 | Actual | OECD Global Plastics Outlook |
| 2020–2030 | **Projected** | OECD business-as-usual scenario |

**Known compromise:** the chart's divider is drawn at 2019 and labels everything to its left "Observed". Strictly, 2016–2018 are extrapolations sitting inside that region — three modelled years presented as observed. The alternative strapline, *"Figures after 2015 are estimates; those after 2019 are an OECD projection,"* is more accurate and was rejected on brevity grounds. Flagged here so the choice is on the record.

**Scenario definition:** the OECD projection is "business-as-usual" — it assumes current policies remain unchanged. It is not a prediction, and it is not the only OECD scenario. The page no longer states this after the strapline was cut; if the chart is published standalone rather than inside an article, this assumption should be restored somewhere on the page.

**A real feature, not a glitch:** the projection dips at 2020 (449.5 Mt, below 2019's 459.7 Mt) because OECD modelled the COVID-19 contraction. The line ticks down before resuming its climb.

**A gap in the earlier file:** the original `global-plastics-production` CSV is missing 1974 entirely — it jumps 1973 → 1975 — while the hardcoded array in the first version of this chart had `1974: 52`. That value came from somewhere other than this CSV. The projections file used now is not affected.

---

## 4. Transformations

All processing happens client-side at load, in `onMount` (`+page.svelte:13–27`). There is no build step, no notebook, no cleaned intermediate file — the CSV ships exactly as downloaded, so the chart is always one `diff` away from its source.

1. **Filter to World.** `d.Code === 'OWID_WRL'` — the ISO-style code rather than the `Entity` name string, which is more robust to label changes.
2. **Truncate at `END_YEAR`.** `+d.Year <= 2030`. The source runs to 2060.
3. **Split into two series** on which value column is non-empty. A row belongs to `history` if the history column has a value, to `projection` if the projection column does. 2019 has both, so it appears in both series — which is deliberate: it makes the projection line start exactly where the filled area ends, with no visual gap.
4. **Convert units.** Tonnes ÷ 1e6 → million tonnes (Mt). Done once at load so every downstream number is already in display units.
5. **Coerce types.** CSV values arrive as strings; `+d.Year` and `+d[key]` force numbers.

Column keys are matched by prefix (`startsWith('Annual plastic production')`) rather than by exact string. The full header embeds a year range — "Annual plastic production between 1950 and 2019" — which will change when OWID next updates the dataset. Prefix matching survives that.

No smoothing, interpolation, per-capita normalisation, or inflation-style adjustment is applied. Values are as published.

---

## 5. Design choices

### Chart form

**Area chart with a line outline.** Production is a cumulative-feeling quantity measured from a true zero, and the story is the shape of the growth curve — an area fill carries the "sheer volume" reading that a bare line does not. The outline keeps the year-to-year detail crisp where the fill alone would blur it.

### Encoding the forecast

This went through three iterations, which is worth recording because the final answer is the least decorated one:

1. **Diagonal hatching** over the projected area — conventional, but visually noisy at this size and it fought with the gridlines.
2. **Lighter solid fill** (`#d8d7d2`) — quieter, but read as a second data category rather than as "same series, less certain".
3. **No fill at all** (final) — the area simply stops at 2019 and continues as a line.

The final form makes the argument structurally: the fill *is* the evidence, so where evidence stops, fill stops. The projection was briefly dashed, then made solid at the same weight and colour as the historical outline, so the eye reads one continuous series rather than two things bolted together.

Redundant cues still mark the boundary, so the distinction does not rest on the fill alone:

- The fill terminates at 2019
- A dotted vertical divider sits at 2019
- "Observed" / "Projected" labels flank that divider
- The strapline states it in words

### Scales

- **Y axis anchored at zero**, domain `[0, 600]`. Mandatory for an area chart — a truncated baseline would exaggerate the growth, and growth is the entire claim. The 600 Mt ceiling is a round number above the 2030 peak of 589 Mt, leaving headroom so the line does not collide with the top gridline.
- **X axis linear over `[1950, 2030]`**, with the domain hardcoded rather than derived from `d3.extent`. Deliberate: the axis should show the full intended range even before data loads, and should not silently reshape if the CSV changes.
- **Y ticks** via `y.ticks(6)` → 0, 100 … 600. The unit "Mt" is appended to the topmost tick only, rather than repeated on every label or exiled to a rotated axis title.
- **X ticks** hardcoded as `[1950, 1960 … 2020, 2030]`. `d3.ticks` produced an awkward set that omitted the 2030 endpoint; since 2030 is the whole point of the extension, it is pinned explicitly.

### Layout

- 680 × 420 viewBox, rendered at `width: 100%` — the SVG scales fluidly while all internal coordinates stay in fixed units, which keeps the geometry readable in source.
- `marginTop: 70` is unusually deep because it houses the Observed/Projected annotations above the plot.
- Wrapper capped at 680px to match the SVG's natural width, so text measure and chart width agree.

### Colour and type

Deliberately restrained, near-monochrome — one series, no categorical encoding, so colour carries no data and is free to be purely structural.

| Role | Value |
| --- | --- |
| Area fill (observed) | `#a8a7a0` |
| Line / emphasised headline text | `#2c2c2a` |
| Headline body, annotations | `#8a8983` |
| Gridlines | `#e8e7e1` |
| Tick labels | `#aaa` |

Type: Arial bold 28px for the headline (changed from Playfair Display to match the typography of the accompanying document), Inter for the subtitle, ticks and furniture. Gridlines are set well below the data in contrast so they inform without competing.

### Headline

Written as a sentence that states the finding — 2 → 460 Mt by 2019, on track for 589 Mt by 2030 — with the two numbers emphasised in darker text. The numbers are **derived from the data at runtime**, not typed in: `lastObserved` and `lastProjected` read the last element of each series. Change `END_YEAR` and the headline, the strapline, the x-axis and the plotted range all follow. This removes an entire class of error where a hand-edited headline drifts from the chart beneath it.

---

## 6. Technology choices

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | SvelteKit 2 (Svelte 5) | Class starter template; component model suits a self-contained graphic |
| Reactivity | Svelte 5 runes — `$state`, `$derived` | Data arrives asynchronously; runes re-render the chart when `history` / `projection` populate, without manual subscription code |
| Data / geometry | D3 v7 — `d3.csv`, `scaleLinear`, `area`, `line` | Used **only** for parsing, scales and path generation |
| Rendering | Native Svelte SVG markup | See below |
| Build / dev server | Vite 8 | Comes with SvelteKit; HMR gave instant feedback across design iterations |
| Data hosting | Static CSV in `static/data/` | Served at `/data/…`; no API, no key, no runtime dependency on OWID being up |
| Fonts | Google Fonts (Inter, Playfair Display) | Loaded via `<svelte:head>` |

### The one architectural decision worth calling out

**D3 for maths, Svelte for the DOM.** D3 computes the scales and returns SVG path strings; every element is then declared in Svelte template markup (`{#each}` over ticks, `<path d={...}>`). No `d3.select`, no `.append()`, no enter/update/exit anywhere in the file.

This matters because the two libraries otherwise fight over ownership of the DOM. Letting Svelte own the DOM means the chart is declarative and diffable, the markup reads as the structure it produces, and reactivity comes free — when `projection` populates, the paths re-render because Svelte tracks them, not because an update function was called.

### Client-side loading

Data is fetched in `onMount`, so it does not run during server-side rendering. Consequence: the first paint shows axes, gridlines and fallback headline numbers with an empty plot area, then the paths appear on hydration. Acceptable for a graphic of this size. The `{#if history.length}` guards prevent D3's generators from being handed an empty array.

The fallback values in the headline (`460`, `589`, `2019`) are hardcoded so the SSR pass renders sensible text rather than blanks or `undefined` — but they are a maintenance trap: if the data changes and the fallbacks are not updated, the pre-hydration text will be silently wrong.

---

## 7. Reproducing this chart

```bash
cd "Plastic Production Numbers"
npm install
npm run dev          # → http://localhost:5173
```

To re-download the data:

```bash
curl -sL "https://ourworldindata.org/grapher/global-plastic-production-projections.csv" \
  -o static/data/global-plastic-production-projections.csv
```

To change the horizon, edit one line — `const END_YEAR = 2030` (`+page.svelte:8`). The source supports anything up to 2060. The y-domain (`[0, 600]`) and the x-tick array will need adjusting for a materially different horizon.

---

## 8. Known limitations

1. **2016–2018 are modelled but labelled "Observed"** (§3). The most substantive accuracy compromise in the chart.
2. **The business-as-usual assumption is no longer stated on the page** after the strapline was shortened. It is a scenario, not a forecast.
3. **Nothing marks the 2019 seam between sources** — Geyer-derived history and OECD projection meet there and are drawn as one line. They agree to within 96 tonnes at the join, but they are different methodologies.
4. **The projection is a single scenario.** OECD publishes alternative policy scenarios; a fan or range would represent uncertainty more honestly than one line, at the cost of considerable complexity.
5. **No interactivity** — no tooltip, no hover readout. Values between labelled ticks must be estimated from the gridlines.
6. **Accessibility gaps** — the SVG has no `<title>`, `<desc>`, or `role="img"`, so it is opaque to screen readers. The headline carries the finding in text, which mitigates but does not fix this.
7. **Dead font dependency** — Playfair Display is still requested in `<svelte:head>` but no longer used by any rule since the headline moved to Arial. Harmless, but it is an unnecessary network request.
8. **Google Fonts is an external dependency** — the graphic degrades to system fonts offline or behind a restrictive network.
9. **The superseded CSV** `static/data/global-plastics-production.csv` remains in the repo and is no longer referenced.
