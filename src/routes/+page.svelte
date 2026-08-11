<script>
	import '$lib/styles/nurdle.css';
	import '$lib/styles/article.css';
	import StoryStage from '$lib/components/nurdle/StoryStage.svelte';
	import ChartPlaceholder from '$lib/components/article/ChartPlaceholder.svelte';

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let docHeight = $state(1);

	const progress = $derived.by(() => {
		const h = docHeight - innerHeight;
		return h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
	});

	function measure() {
		docHeight = document.documentElement.scrollHeight;
	}

	$effect(() => {
		measure();
	});
</script>

<svelte:window bind:scrollY bind:innerHeight onresize={measure} onscroll={measure} />

<svelte:head>
	<title>How Tiny Plastic Polymers Spilled from Supply Chains Pollute the World</title>
	<meta
		name="description"
		content="How primary plastic polymers used to manufacture plastic products accidentally escape the supply chain and end up in rivers, oceans and beaches."
	/>
</svelte:head>

<div class="progress" style="width: {(progress * 100).toFixed(2)}%" aria-hidden="true"></div>

<div class="nurdle-story">
	<!-- COVER -->
	<header class="cover is-visible">
		<svg class="cover__mark reveal" width="52" height="46" viewBox="0 0 52 46" aria-hidden="true">
			<circle cx="26" cy="23" r="17" fill="var(--pearl)" />
			<ellipse cx="20" cy="17" rx="5.5" ry="3.4" fill="#fff" opacity="0.6" />
		</svg>
		<div class="cover__kicker reveal d1">Plastic Pollution</div>
		<h1 class="reveal d1">
			How Tiny Plastic Polymers Spilled from Supply Chains Pollute the World
		</h1>
		<p class="dek reveal d2">
			How primary plastic polymers used to manufacture plastic products accidentally escape the
			supply chain and end up in rivers, oceans and beaches.
		</p>
		<div class="cover__by reveal d2">By Dimuthu Attanayake</div>
		<div class="scroll-cue reveal d2"><span class="dot"></span> Scroll to begin</div>
	</header>

	<!-- every storyboard beat, on one stage -->
	<StoryStage />
</div>

<!--
  THE WRITTEN STORY — everything below the scrolly.

  All copy here is placeholder. Replace the text inside each <p> and <h2>; the
  structure around it (measure-width column, figure blocks, credits) is the
  finished part. To add a chart, swap a <ChartPlaceholder /> for the real
  component and leave its <figure> wrapper in place so the title, caption and
  source line come with it.
-->
<article class="article">
	<div class="article__inner">
		<h2>PLACEHOLDER: first section heading</h2>

		<p class="lede">
			PLACEHOLDER: the opening paragraph of the written story, set a size larger than the body
			text. This is where the reader lands after the scrolly ends, so it should pick up the thread
			the globe left off on rather than start over.
		</p>

		<p>
			PLACEHOLDER: body paragraph. Two or three of these before the first chart, enough to set up
			what the chart is going to show.
		</p>

		<p>PLACEHOLDER: body paragraph.</p>
	</div>

	<!-- CHART 1 — wide -->
	<figure class="figure figure--wide">
		<div class="figure__head">
			<p class="figure__title">PLACEHOLDER: chart one title</p>
			<p class="figure__standfirst">
				PLACEHOLDER: one line saying what the reader should take from this chart.
			</p>
		</div>

		<ChartPlaceholder label="Chart 1" height={420} />

		<figcaption>
			PLACEHOLDER: caption — the detail that doesn't fit in the title.
			<span class="source">Source: PLACEHOLDER</span>
		</figcaption>
	</figure>

	<div class="article__inner">
		<h2>PLACEHOLDER: second section heading</h2>

		<p>PLACEHOLDER: body paragraph.</p>
		<p>PLACEHOLDER: body paragraph.</p>

		<blockquote>
			PLACEHOLDER: a pull quote, if the story has one worth lifting out.
			<cite>PLACEHOLDER: name, role</cite>
		</blockquote>

		<p>PLACEHOLDER: body paragraph.</p>
	</div>

	<!-- CHART 2 — column width -->
	<div class="article__inner">
		<figure class="figure">
			<div class="figure__head">
				<p class="figure__title">PLACEHOLDER: chart two title</p>
				<p class="figure__standfirst">PLACEHOLDER: one line on what this chart shows.</p>
			</div>

			<ChartPlaceholder label="Chart 2" height={340} />

			<figcaption>
				PLACEHOLDER: caption.
				<span class="source">Source: PLACEHOLDER</span>
			</figcaption>
		</figure>

		<h2>PLACEHOLDER: third section heading</h2>

		<p>PLACEHOLDER: body paragraph.</p>
		<p>PLACEHOLDER: closing paragraph.</p>
	</div>

	<footer class="credits">
		<h2>Notes and sources</h2>
		<p>PLACEHOLDER: where the data came from, how it was processed, what it does and doesn't cover.</p>
		<p>Reporting, analysis and graphics by Dimuthu Attanayake.</p>
	</footer>
</article>
