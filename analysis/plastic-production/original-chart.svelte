<script>
  import * as d3 from 'd3'
  import { onMount } from 'svelte'

  // 1. DATA — Our World in Data, "Global plastic production with projections"
  //    Column A: observed/estimated production, 1950–2019 (Geyer et al. 2017; OECD 2022)
  //    Column B: OECD business-as-usual projection, 2019–2060 (trimmed to END_YEAR here)
  const END_YEAR = 2030

  let history = $state([])
  let projection = $state([])

  onMount(async () => {
    const raw = await d3.csv('/data/global-plastic-production-projections.csv')
    const histKey = Object.keys(raw[0]).find(k => k.startsWith('Annual plastic production'))
    const projKey = Object.keys(raw[0]).find(k => k.startsWith('Plastic use - projections'))

    const world = raw.filter(d => d.Code === 'OWID_WRL' && +d.Year <= END_YEAR)

    history = world
      .filter(d => d[histKey] !== '')
      .map(d => ({ year: +d.Year, production: +d[histKey] / 1e6 })) // tonnes → Mt

    projection = world
      .filter(d => d[projKey] !== '')
      .map(d => ({ year: +d.Year, production: +d[projKey] / 1e6 }))
  })

  // 2. DIMENSIONS
  const width = 680
  const height = 420
  const marginTop = 70
  const marginRight = 20
  const marginBottom = 55
  const marginLeft = 50

  // 3. SCALES
  const x = d3.scaleLinear()
    .domain([1950, END_YEAR])
    .range([marginLeft, width - marginRight])

  const y = d3.scaleLinear()
    .domain([0, 600])
    .range([height - marginBottom, marginTop])

  // 4. GENERATORS
  const areaGenerator = d3.area()
    .x(d => x(d.year))
    .y0(y(0))
    .y1(d => y(d.production))

  const lineGenerator = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.production))

  const yTicks = y.ticks(6)
  const topTick = yTicks[yTicks.length - 1]

  // 5. HEADLINE NUMBERS
  let first = $derived(history[0])
  let lastObserved = $derived(history[history.length - 1])
  let lastProjected = $derived(projection[projection.length - 1])
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap" rel="stylesheet" />
</svelte:head>

<div class="wrapper">
  <h1>Global production of primary plastics is on track to reach
    <span class="black">{lastProjected ? Math.round(lastProjected.production) : 589} million metric tons</span>
    by {END_YEAR}</h1>
  <p class="subtitle">Figures after {lastObserved ? lastObserved.year : 2019} are an OECD projection.</p>

  <svg viewBox="0 0 {width} {height}" style="width: 100%;">
    <!-- Gridlines -->
    {#each yTicks as tick}
      <line
        x1={marginLeft}
        x2={width - marginRight}
        y1={y(tick)}
        y2={y(tick)}
        stroke="#e8e7e1"
      />
    {/each}

    <!-- Projection: no fill — solid line only -->
    {#if projection.length}
      <path
        fill="none"
        stroke="#2c2c2a"
        stroke-width="1"
        d={lineGenerator(projection)}
      />
    {/if}

    <!-- History: solid fill + outline -->
    {#if history.length}
      <path fill="#a8a7a0" d={areaGenerator(history)} />
      <path fill="none" stroke="#2c2c2a" stroke-width="1" d={lineGenerator(history)} />
    {/if}

    <!-- Divider at the last observed year -->
    {#if lastObserved}
      <line
        x1={x(lastObserved.year)}
        x2={x(lastObserved.year)}
        y1={marginTop - 12}
        y2={height - marginBottom}
        stroke="#8a8983"
        stroke-width="1"
        stroke-dasharray="2 3"
      />
      <text
        x={x(lastObserved.year) - 6}
        y={marginTop - 16}
        text-anchor="end"
        class="annotation"
      >Observed</text>
      <text
        x={x(lastObserved.year) + 6}
        y={marginTop - 16}
        text-anchor="start"
        class="annotation"
      >Projected</text>
    {/if}

    <!-- Y-axis label -->
    <text
      x={marginLeft - 48}
      y={y(topTick) - 16}
      text-anchor="start"
      class="axis-label"
    >Plastic production (million metric tons)</text>

    <!-- Y-axis tick labels -->
    {#each yTicks as tick}
      <text
        x={marginLeft - 8}
        y={y(tick)}
        text-anchor="end"
        dominant-baseline="middle"
        class="tick-label"
      >{tick}</text>
    {/each}

    <!-- X-axis tick labels -->
    {#each [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, END_YEAR] as tick}
      <text
        x={x(tick)}
        y={height - marginBottom + 18}
        text-anchor="middle"
        class="tick-label"
      >{tick}</text>
    {/each}

  </svg>

  <div class="footer">
    <span>Chart by: Dimuthu Attanayake</span>
    <span>Source: <a href="https://ourworldindata.org/grapher/global-plastic-production-projections" target="_blank" rel="noopener">Geyer et al. (2017); OECD (2022), via Our World in Data</a></span>
  </div>
</div>

<style>
  .wrapper {
    max-width: 680px;
    margin: 0 auto;
    padding: 2rem 2rem 2rem 7.4%;
    font-family: 'Inter', system-ui, sans-serif;
  }

  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #8a8983;
    margin: 0 0 6px 0;
    line-height: 1.3;
  }

  .black {
    color: #2c2c2a;
  }

  .subtitle {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #999;
    margin: 0 0 8px 0;
    max-width: 560px;
    line-height: 1.4;
  }

  .tick-label {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    fill: #aaa;
  }

  .axis-label {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    fill: #999;
  }

  .annotation {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 11px;
    fill: #8a8983;
  }

  .footer {
    display: flex;
    gap: 24px;
    margin-top: 2px;
    padding-left: 50px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 10px;
    color: #aaa;
  }

  .footer a {
    color: #aaa;
    text-decoration: underline;
  }
</style>
