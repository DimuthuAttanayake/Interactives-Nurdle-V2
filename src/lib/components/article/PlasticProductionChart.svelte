<!--
  Global production of primary plastics, 1950–2030.

  Ported from the standalone "Plastic Production Numbers" project. Two changes
  were made on the way in:

  1. The data is imported rather than fetched from a CSV at runtime, so the
     chart renders server-side too and doesn't depend on the deploy path.
  2. It's recoloured for this story's dark page — the black lines are now
     pearl, the gridlines and labels use the story's own tokens. The shape,
     scales, annotations and tick choices are unchanged.

  The headline, standfirst and source line are NOT in here: they live in the
  <figure> wrapper in +page.svelte, alongside every other figure's furniture.
-->
<script>
	import * as d3 from 'd3';
	import { HISTORY, PROJECTION } from '$lib/data/plastic-production.js';

	const END_YEAR = 2030;

	// Drawn at a fixed size and scaled by the viewBox, so the type stays in
	// proportion with the chart at every width.
	const width = 680;
	const height = 420;
	const marginTop = 40;
	const marginRight = 20;
	const marginBottom = 55;
	const marginLeft = 50;

	const x = d3
		.scaleLinear()
		.domain([1950, END_YEAR])
		.range([marginLeft, width - marginRight]);

	const y = d3
		.scaleLinear()
		.domain([0, 600])
		.range([height - marginBottom, marginTop]);

	const areaGenerator = d3
		.area()
		.x((d) => x(d.year))
		.y0(y(0))
		.y1((d) => y(d.production));

	const lineGenerator = d3
		.line()
		.x((d) => x(d.year))
		.y((d) => y(d.production));

	const yTicks = y.ticks(6);
	const xTicks = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, END_YEAR];

	// The year the observed series stops and the projection takes over.
	const lastObserved = HISTORY[HISTORY.length - 1];
</script>

<svg
	viewBox="0 0 {width} {height}"
	style="width: 100%; height: auto;"
	role="img"
	aria-label="Line chart of global primary plastic production, rising from 2 million metric tons in 1950 to 460 million in 2019, with an OECD projection reaching 589 million by 2030."
>
	<!-- Gridlines -->
	{#each yTicks as tick}
		<line
			x1={marginLeft}
			x2={width - marginRight}
			y1={y(tick)}
			y2={y(tick)}
			stroke="var(--line)"
		/>
	{/each}

	<!-- Projection: no fill — solid line only -->
	<path fill="none" stroke="var(--amber)" stroke-width="1.5" d={lineGenerator(PROJECTION)} />

	<!-- History: solid fill + outline -->
	<path fill="rgba(241, 236, 224, 0.14)" d={areaGenerator(HISTORY)} />
	<path fill="none" stroke="var(--pearl)" stroke-width="1.5" d={lineGenerator(HISTORY)} />

	<!-- Divider at the last observed year -->
	<line
		x1={x(lastObserved.year)}
		x2={x(lastObserved.year)}
		y1={marginTop - 12}
		y2={height - marginBottom}
		stroke="var(--muted)"
		stroke-width="1"
		stroke-dasharray="2 3"
	/>
	<text x={x(lastObserved.year) - 6} y={marginTop - 16} text-anchor="end" class="annotation">
		Observed
	</text>
	<text x={x(lastObserved.year) + 6} y={marginTop - 16} text-anchor="start" class="annotation">
		Projected
	</text>

	<!-- Y-axis label -->
	<text x={marginLeft - 48} y={marginTop - 16} text-anchor="start" class="axis-label">
		Plastic production (million metric tons)
	</text>

	<!-- Y-axis tick labels -->
	{#each yTicks as tick}
		<text
			x={marginLeft - 8}
			y={y(tick)}
			text-anchor="end"
			dominant-baseline="middle"
			class="tick-label">{tick}</text
		>
	{/each}

	<!-- X-axis tick labels -->
	{#each xTicks as tick}
		<text x={x(tick)} y={height - marginBottom + 18} text-anchor="middle" class="tick-label"
			>{tick}</text
		>
	{/each}
</svg>

<style>
	.tick-label {
		font-family: var(--sans);
		font-size: 12px;
		fill: var(--muted);
	}

	.axis-label {
		font-family: var(--sans);
		font-size: 12px;
		fill: var(--muted);
	}

	.annotation {
		font-family: var(--sans);
		font-size: 11px;
		fill: var(--muted);
	}
</style>
