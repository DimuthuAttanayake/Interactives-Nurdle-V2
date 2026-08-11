<!-- Fig. 05.1 — a hopper tips off the track, pellets spilling out one by one -->
<script>
	let { vis = 0 } = $props();

	const rand = (i, s) => {
		const v = Math.sin(i * 71.3 + s * 39.1) * 43758.5453;
		return v - Math.floor(v);
	};

	// Pellets pour out of the tipped car's mouth and land on the ground beside
	// it, one after another, building the spill as the beat lands.
	const MOUTH = { x: 322, y: 286 };
	const spilled = Array.from({ length: 16 }, (_, i) => ({
		i,
		cx: 322 + rand(i, 1) * 92,
		cy: 348 + rand(i, 2) * 14,
		r: 3.2 + rand(i, 3) * 1.2,
		delay: (i / 16) * 0.62,
		arc: 16 + rand(i, 4) * 18
	}));

	// each pellet flies from the mouth to its resting place on a short arc
	const at = (p) => {
		const t = Math.max(0, Math.min(1, (vis - p.delay) / Math.max(0.001, 1 - p.delay)));
		const e = t * t * (3 - 2 * t);
		return {
			x: MOUTH.x + (p.cx - MOUTH.x) * e,
			y: MOUTH.y + (p.cy - MOUTH.y) * e - Math.sin(Math.PI * e) * p.arc,
			o: Math.min(1, t * 8)
		};
	};
</script>

<svg
	class="plate"
	viewBox="40 246 400 170"
	role="img"
	aria-label="A rail hopper tips off the track, pellets spilling out"
>
	<line x1="60" y1="322" x2="360" y2="322" stroke="#2a454e" stroke-width="2" />
	<g stroke="#2a454e" stroke-width="1.4">
		<line x1="90" y1="318" x2="90" y2="328" /><line x1="140" y1="318" x2="140" y2="328" /><line
			x1="190"
			y1="318"
			x2="190"
			y2="328"
		/><line x1="240" y1="318" x2="240" y2="328" />
	</g>
	<g fill="#20323a" stroke="#2a454e">
		<path d="M80 318 h74 v-30 l-10 -12 h-54 l-10 12 Z" />
		<path d="M164 318 h74 v-30 l-10 -12 h-54 l-10 12 Z" />
	</g>
	<g fill="#16262c" stroke="#2a454e">
		<circle cx="98" cy="322" r="6" /><circle cx="140" cy="322" r="6" /><circle
			cx="182"
			cy="322"
			r="6"
		/><circle cx="224" cy="322" r="6" />
	</g>
	<!-- the derailed car -->
	<g transform="rotate({20 + vis * 24} 300 300)">
		<path d="M262 300 h74 v-30 l-10 -12 h-54 l-10 12 Z" fill="#20323a" stroke="var(--amber)" />
	</g>
	<ellipse cx="368" cy="358" rx="58" ry="11" fill="var(--pearl)" opacity={0.3 * vis} />
	<g fill="var(--pearl)">
		{#each spilled as p (p.i)}
			{@const s = at(p)}
			{#if s.o > 0.01}
				<circle cx={s.x} cy={s.y} r={p.r} opacity={s.o} />
			{/if}
		{/each}
	</g>
</svg>
