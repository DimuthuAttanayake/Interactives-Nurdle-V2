<script>
	import Scroller from '$lib/components/layout/Scroller.svelte';
	import GlobeBackground from '$lib/components/GlobeBackground.svelte';

	const steps = [
		{
			lat: 10.0,
			lon: -30.0,
			place: 'A global problem',
			text: 'From a single spill site to the most remote corners of the ocean, nurdles travel farther than most people realize.',
			highlight: false
		},
		{
			lat: 15.0,
			lon: -30.0,
			place: 'Nurdles, everywhere',
			text: 'Nurdles have been detected in all the continents by now.',
			highlight: false
		},
		{
			lat: -27.073869,
			lon: -109.323581,
			place: 'Easter Island (Rapa Nui), Chile',
			text: 'Nurdles are found from Easter Island (Rapa Nui), Chile, one of the most isolated inhabited islands on Earth.'
		},
		{
			lat: 55.539625,
			lon: -132.081234,
			place: 'Ketchikan, Alaska',
			text: 'Nurdles are found from Ketchikan, Alaska, on the edge of the Tongass National Forest, the largest national forest and temperate rainforest in the US.'
		},
		{
			lat: -0.760755,
			lon: -90.332014,
			place: 'Galápagos Islands (Isabela), Ecuador',
			text: 'Nurdles are found from the Galápagos Islands (Isabela), Ecuador, a UNESCO World Heritage Site and one of the most strictly protected marine reserves on Earth.'
		},
		{
			lat: -3.380916,
			lon: 39.986579,
			place: 'Zanzibar / Mombasa coast, Kenya/Tanzania',
			text: 'Nurdles are found from the Zanzibar / Mombasa coast, Kenya/Tanzania, home to some of the richest coral reef biodiversity in the Indian Ocean.'
		},
		{
			lat: 35.13,
			lon: 25.75,
			place: 'Crete / Cyclades, Greece',
			text: 'Aegean Sea, home to Natura 2000 marine sites and turtle and monk seal conservation zones in a region holding an outsized share of the Mediterranean’s endemic marine life.'
		}
	];

	let index = $state(0);
	let count = $state(0);
	let finalSettled = $state(false);
</script>

<div class="page">
	<header class="intro">
		<h1>Tracking Nurdle Spills Across the Globe</h1>
		<p class="byline">By <strong>Dimuthu Attanayake</strong></p>
	</header>

	<Scroller top={0} bottom={1} bind:index bind:count>
		{#snippet background()}
			<GlobeBackground {steps} {index} bind:finalSettled />
		{/snippet}

		{#snippet foreground()}
			{#each steps as step, i}
				<section class="step">
					<div class="card" class:hidden={i === steps.length - 1 && finalSettled}>
						<p class="place">{step.place}</p>
						<p class="text">{step.text}</p>
					</div>
				</section>
			{/each}
		{/snippet}
	</Scroller>
</div>

<style>
	.page {
		background: #000000;
	}

	.intro {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		height: 100vh;
		padding: 2rem 1.5rem;
		box-sizing: border-box;
		text-align: center;
		font-family: system-ui, sans-serif;
		background: #000000;
	}

	.intro h1 {
		margin: 0;
		max-width: 60rem;
		font-family: 'Lora', serif;
		font-size: 5rem;
		line-height: 1.05;
		font-weight: 700;
		color: #ffcc00;
	}

	.byline {
		margin: 0;
		font-size: 1.15rem;
		color: #999999;
	}

	.byline strong {
		font-weight: 600;
		color: #cccccc;
	}

	.step {
		display: flex;
		align-items: center;
		height: 100vh;
		max-width: 26rem;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		box-sizing: border-box;
		font-family: system-ui, sans-serif;
	}

	.card {
		padding: 1.25rem 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.5rem;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		color: #ffffff;
		opacity: 1;
		transition: opacity 1s ease;
	}

	.card.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.place {
		margin: 0 0 0.5rem;
		font-family: 'Lora', serif;
		font-size: 1.1rem;
		font-weight: 700;
		color: #ffcc00;
	}

	.text {
		margin: 0;
		line-height: 1.6;
		color: #e5e5e5;
	}
</style>
