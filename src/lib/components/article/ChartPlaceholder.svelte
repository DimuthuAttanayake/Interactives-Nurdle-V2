<!--
  A labelled empty frame standing in for a chart that hasn't been built yet.

  It exists so the article's rhythm — heading, prose, figure, prose — is real
  while the charts are still to come. When a chart is ready, replace the
  <ChartPlaceholder /> tag with the chart component and keep the surrounding
  <figure> markup in +page.svelte, so the title, caption and source line carry
  over unchanged.
-->
<script>
	let {
		// what the finished chart will show, so the gap is self-documenting
		label = 'Chart',
		// keeps the frame at the height the real chart will occupy, which stops
		// the page from reflowing when the chart lands
		height = 420
	} = $props();
</script>

<div class="chart-slot" style="min-height: {height}px" role="img" aria-label="{label} — placeholder">
	<span class="chart-slot__label">{label}</span>
	<span class="chart-slot__note">chart goes here</span>
</div>

<style>
	.chart-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 2rem 1.5rem;
		border: 1px dashed var(--line);
		border-radius: 0.35rem;
		background: var(--bg-2);
		text-align: center;
	}

	.chart-slot__label {
		font-family: var(--sans);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--ink);
	}

	.chart-slot__note {
		font-family: var(--sans);
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--muted);
	}
</style>
