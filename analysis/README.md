# Analysis

The data work behind the story. Everything here produced something that ships
in `src/` — this folder is the trail from raw download to what the page draws.

## `nurdle-globe/`

The 8,728 sighting points on the animated globe.

| File | What it is |
| --- | --- |
| `nurdle-patrol-export.csv` | Raw crowdsourced cleanup records exported from [Nurdle Patrol](https://nurdlepatrol.org), the volunteer network founded by Jace Tunnell. Originally saved as `Jace tunnel.csv`. |
| `slice-nurdle-patrol.ipynb` | Keeps latitude, longitude and amount collected; drops rows where nothing was collected; writes the JSON. |
| `sliced_data.json` | The notebook's output. |

`sliced_data.json` is byte-identical to `src/lib/data/nurdle_locations.json`,
which is what the globe reads. Re-running the notebook and copying the result
over that file is the whole update path.

Two things the site does to this data at runtime, not here:

- 49 records with out-of-range lat/lon are filtered out when the globe loads,
  leaving 8,679 drawn points.
- The 300 pellets that morph through the scrolly are a stratified sample across
  30° longitude bands, because ~98.6% of records sit in the Americas and a
  proportional sample would leave the globe empty when it rotates away.

`amount_collected` is carried through the pipeline but never drawn. Every dot is
the same size — the globe shows where nurdles were found, not how many.

## `plastic-production/`

The line chart of global primary plastic production, 1950–2030.

| File | What it is |
| --- | --- |
| `global-plastic-production-projections.csv` | Our World in Data grapher export: observed production plus the OECD projection. The one the chart uses. |
| `global-plastics-production.csv` | The earlier OWID series, 1950–2015 only. Superseded, kept for reference. |
| `METHODOLOGY.md` | Full provenance, and how the series were joined. |
| `original-chart.svelte` | The chart as first built, in its own standalone project. |

The version that ships is `src/lib/components/article/PlasticProductionChart.svelte`,
with the numbers inlined as `src/lib/data/plastic-production.js`. The data is
inlined rather than fetched because the site is served from a repo subpath on
GitHub Pages, where an absolute `/data/...` fetch would miss.

## Not represented here

The two locator maps — U.S. legal actions, and maritime spills 2020–2026 — were
built in Datawrapper from a small hand-compiled dataset, and are embedded as
iframes. Their data lives in Datawrapper, not in this repo.
