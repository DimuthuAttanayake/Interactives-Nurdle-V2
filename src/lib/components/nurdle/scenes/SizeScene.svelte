<!-- Fig. 02 — a measured diameter, not a caliper -->
<script>
	// The dimension line draws in as this scene arrives.
	let { vis = 0 } = $props();

	const LEN = 164;
	const dash = $derived(LEN * (1 - Math.min(1, vis * 1.4)));
</script>

<svg
	class="plate"
	viewBox="0 0 640 460"
	role="img"
	aria-label="A round nurdle with a diameter labelled 5 millimetres"
>
	<g class="float">
		<circle cx="320" cy="230" r="82" fill="var(--pearl)" />
		<circle cx="320" cy="230" r="82" fill="url(#pg2)" />
		<ellipse cx="298" cy="210" rx="22" ry="13" fill="#fff" opacity="0.55" />
	</g>
	<g style="opacity: {vis}">
		<line x1="238" y1="212" x2="238" y2="248" stroke="var(--amber)" stroke-width="1.2" />
		<line x1="402" y1="212" x2="402" y2="248" stroke="var(--amber)" stroke-width="1.2" />
	</g>
	<line
		x1="238"
		y1="230"
		x2="402"
		y2="230"
		stroke="var(--amber)"
		stroke-width="2"
		stroke-linecap="round"
		stroke-dasharray={LEN}
		stroke-dashoffset={dash}
	/>
	<g style="opacity: {vis}" fill="var(--amber)">
		<path d="M238 230 l11 -6 v12 Z" />
		<path d="M402 230 l-11 -6 v12 Z" />
	</g>
	<text
		x="320"
		y="206"
		text-anchor="middle"
		fill="var(--amber)"
		font-family="var(--sans)"
		font-size="20"
		font-weight="600"
		style="opacity: {vis}">5&#8202;mm</text
	>
	<defs>
		<radialGradient id="pg2" cx="40%" cy="34%" r="72%">
			<stop offset="0%" stop-color="#fff" stop-opacity="0.5" />
			<stop offset="55%" stop-color="#F2ECE0" stop-opacity="0" />
			<stop offset="100%" stop-color="#b9ad93" stop-opacity="0.5" />
		</radialGradient>
	</defs>
</svg>
