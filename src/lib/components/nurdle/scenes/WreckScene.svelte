<!-- Fig. 05.2 — a listing container ship spills pellets into the sea -->
<script>
	let { vis = 0 } = $props();

	const rand = (i, s) => {
		const v = Math.sin(i * 71.3 + s * 39.1) * 43758.5453;
		return v - Math.floor(v);
	};

	// Pellets tip off the listing deck and drop into the sea, one after another.
	const DECK = { x: 458, y: 306 };
	const spilled = Array.from({ length: 18 }, (_, i) => ({
		i,
		cx: 448 + rand(i, 1) * 120,
		cy: 382 + rand(i, 2) * 20,
		r: 3 + rand(i, 3) * 1.3,
		delay: (i / 18) * 0.62,
		arc: 12 + rand(i, 4) * 20
	}));

	const at = (p) => {
		const t = Math.max(0, Math.min(1, (vis - p.delay) / Math.max(0.001, 1 - p.delay)));
		const e = t * t * (3 - 2 * t);
		return {
			x: DECK.x + (p.cx - DECK.x) * e,
			y: DECK.y + (p.cy - DECK.y) * e - Math.sin(Math.PI * e) * p.arc,
			o: Math.min(1, t * 8)
		};
	};
</script>

<svg
	class="plate plate--wide"
	viewBox="40 220 560 210"
	role="img"
	aria-label="A listing container ship spills pellets into the sea"
>
	<rect x="40" y="250" width="560" height="180" fill="#0e2830" opacity="0.6" />
	<g transform="rotate({-6 - vis * 7} 330 300)">
		<path d="M150 300 h330 l-40 46 h-250 Z" fill="#1a2a31" stroke="var(--amber)" stroke-width="1.5" />
		<rect x="176" y="258" width="52" height="42" fill="#16262c" stroke="#2a454e" />
		<rect x="188" y="234" width="16" height="24" fill="#16262c" stroke="#2a454e" />
		<g fill="#122026" stroke="#2a454e">
			<rect x="244" y="272" width="44" height="28" /><rect x="292" y="272" width="44" height="28" />
			<rect x="340" y="272" width="44" height="28" /><rect x="244" y="246" width="44" height="26" />
			<rect x="292" y="246" width="44" height="26" /><rect x="392" y="276" width="40" height="24" />
		</g>
	</g>
	<!-- a container overboard -->
	<rect
		x="470"
		y="316"
		width="40"
		height="26"
		rx="2"
		fill="#20323a"
		stroke="var(--amber)"
		transform="rotate({12 + vis * 12} 490 329)"
		opacity={vis}
	/>
	<ellipse cx="508" cy="392" rx="72" ry="10" fill="var(--pearl)" opacity={0.26 * vis} />
	<g fill="var(--pearl)">
		{#each spilled as p (p.i)}
			{@const s = at(p)}
			{#if s.o > 0.01}
				<circle cx={s.x} cy={s.y} r={p.r} opacity={s.o} />
			{/if}
		{/each}
	</g>
	<path
		d="M40 402 q30 -6 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0"
		fill="none"
		stroke="var(--line)"
		stroke-width="1.4"
	/>
</svg>
