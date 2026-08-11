<!-- Fig. 00 — what a bottle, a polyester top and a car battery have in common.
     They are made of nurdles, so they melt into them: a line rises through each
     object, and everything below it has already come apart into loose pellets
     that fall and collect in a heap. The heap is the shared layout in
     $lib/data/pile.js and the camera pushes in on it, so what is on screen at
     the end of this scene is exactly what Fig. 01 shows. -->
<script>
	import * as d3 from 'd3';
	import {
		FALLERS,
		ITEMS,
		SHIFT,
		WIDE,
		CLOSEUP,
		boxOf,
		meltLine,
		MELT_START,
		MELT_SPAN
	} from '$lib/data/pile.js';

	// 0 while the question is on screen, 1 once the heap has formed
	let { spill = 0 } = $props();

	const clamp01 = (v) => Math.max(0, Math.min(1, v));

	const at = (p) => {
		if (spill < p.melt) return null; // still part of the solid object
		const t = clamp01((spill - p.start) / (p.end - p.start));
		return {
			// eases out of the object, then accelerates down into the heap
			x: p.x + (p.tx - p.x) * d3.easePolyIn.exponent(1.6)(t) + p.drift * t * (1 - t),
			y: p.y + (p.ty - p.y) * d3.easeCubicIn(t),
			r: p.r + (p.tr - p.r) * t
		};
	};

	// the solid artwork is eaten away from the bottom as the melt line rises
	const lines = $derived(ITEMS.map((item) => meltLine(item, spill)));
	const melting = $derived(clamp01((spill - MELT_START) / MELT_SPAN));

	// once it has all landed, push in on the heap to hand over to Fig. 01
	const push = $derived(d3.easeCubicInOut(clamp01((spill - 0.7) / 0.3)));
	const viewBox = $derived(boxOf(WIDE.map((v, i) => v + (CLOSEUP[i] - v) * push)));
	const settled = $derived(clamp01((spill - 0.74) / 0.26));
</script>

<svg
	class="plate"
	{viewBox}
	role="img"
	aria-label="A plastic bottle, a polyester top and a car battery melting into the individual plastic pellets they are made of, which collect in a heap below"
>
	<defs>
		<radialGradient id="pgFall" cx="34%" cy="30%" r="72%">
			<stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
			<stop offset="46%" stop-color="#f6f1e6" stop-opacity="0.12" />
			<stop offset="100%" stop-color="#a89a7e" stop-opacity="0.6" />
		</radialGradient>
		<!-- everything below each melt line is hidden: that part of the object
		     has already become loose pellets. Mask coordinates are in artwork
		     space, before the group is lifted. -->
		<mask id="melt">
			<rect x="-40" y="-40" width="720" height="560" fill="#fff" />
			{#each ITEMS as item, i (item.key)}
				<rect
					x={item.x0 - 6}
					y={lines[i]}
					width={item.x1 - item.x0 + 12}
					height={item.bottom - lines[i] + 8}
					fill="#000"
				/>
			{/each}
		</mask>
	</defs>

	<g mask="url(#melt)" transform="translate(0 {-SHIFT})">
		<!-- plastic bottle -->
		<path
			d="M112 150 h36 v20 q22 12 22 40 v90 q0 20 -20 20 h-40 q-20 0 -20 -20 v-90 q0 -28 22 -40 Z"
			fill="#20323a"
			stroke="var(--amber)"
			stroke-width="1.5"
		/>
		<rect x="116" y="132" width="28" height="18" fill="#16262c" stroke="#2a454e" />
		<path d="M100 244 h60" stroke="#2a454e" stroke-width="1.4" />
		<path d="M100 268 h60" stroke="#2a454e" stroke-width="1.4" />

		<!-- polyester top -->
		<path
			d="M296 150 h48 l40 26 -18 26 -14 -9 v127 h-64 v-127 l-14 9 -18 -26 Z"
			fill="#20323a"
			stroke="var(--amber)"
			stroke-width="1.5"
		/>
		<path d="M296 150 q24 22 48 0" fill="none" stroke="#2a454e" stroke-width="1.4" />

		<!-- car battery -->
		<rect
			x="452"
			y="196"
			width="116"
			height="102"
			rx="4"
			fill="#20323a"
			stroke="var(--amber)"
			stroke-width="1.5"
		/>
		<rect x="470" y="182" width="18" height="14" fill="#16262c" stroke="#2a454e" />
		<rect x="532" y="182" width="18" height="14" fill="#16262c" stroke="#2a454e" />
		<path d="M470 232 h30 M485 217 v30" stroke="var(--pearl)" stroke-width="2" opacity="0.7" />
		<path d="M522 232 h30" stroke="var(--pearl)" stroke-width="2" opacity="0.7" />
		<path d="M452 262 h116" stroke="#2a454e" stroke-width="1.4" />
	</g>

	<!-- the melt fronts themselves, so the change of state is legible -->
	{#if melting > 0 && melting < 1}
		<g opacity={0.5 * (1 - melting)} transform="translate(0 {-SHIFT})">
			{#each ITEMS as item, i (item.key)}
				<line
					x1={item.x0}
					y1={lines[i]}
					x2={item.x1}
					y2={lines[i]}
					stroke="var(--amber)"
					stroke-width="1.2"
				/>
			{/each}
		</g>
	{/if}

	<!-- the heap's shadow, arriving as the pellets settle -->
	<ellipse cx="320" cy="388" rx="88" ry="8" fill="#000" opacity={settled * 0.5} />

	<!-- every pellet the objects were made of -->
	{#each FALLERS as p (p.i)}
		{@const s = at(p)}
		{#if s}
			<g>
				<circle cx={s.x} cy={s.y} r={s.r} fill="var(--pearl)" />
				<circle cx={s.x} cy={s.y} r={s.r} fill="url(#pgFall)" />
				<ellipse
					cx={s.x - s.r * 0.32}
					cy={s.y - s.r * 0.36}
					rx={s.r * 0.3}
					ry={s.r * 0.2}
					fill="#fff"
					opacity="0.7"
				/>
			</g>
		{/if}
	{/each}
</svg>
