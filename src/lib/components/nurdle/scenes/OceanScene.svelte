<!-- Fig. 07 — into the water → ingested → microplastics.
     One plate, revealed in three stages: the pellets reach the water (07.1),
     fish and birds take them in (07.2), and what is left breaks down into
     microplastics that outlast us (07.3). -->
<script>
	let { stage = 0 } = $props();

	const clamp01 = (v) => Math.max(0, Math.min(1, v));
	// stage 1 brings the animals in, stage 2 breaks the pellet down
	const eaten = $derived(clamp01(stage));
	const frag = $derived(clamp01(stage - 1));
	// the parent pellet gives itself up to the fragments
	const pelletR = $derived(20 - 13 * frag);

	const bits = [
		{ cx: 340, cy: 240, r: 3 },
		{ cx: 366, cy: 232, r: 2 },
		{ cx: 356, cy: 256, r: 2.4 },
		{ cx: 388, cy: 248, r: 1.6 },
		{ cx: 330, cy: 262, r: 2 },
		{ cx: 378, cy: 266, r: 1.8 },
		{ cx: 404, cy: 256, r: 1.5 },
		{ cx: 352, cy: 276, r: 1.6 },
		{ cx: 410, cy: 238, r: 1.4 },
		{ cx: 420, cy: 262, r: 1.3 }
	];
</script>

<svg
	class="plate plate--wide"
	viewBox="52 104 542 306"
	role="img"
	aria-label="Nurdles in the water, fragmenting into microplastics and being ingested by fish and birds"
>
	<path d="M120 200 q200 -40 400 0 q60 20 60 200 H60 q0 -180 60 -200 Z" fill="#0e2830" opacity="0.6" />
	<g stroke="var(--teal)" stroke-width="1.2" fill="none" opacity="0.35">
		<path d="M120 240 q40 -8 80 0 t80 0 t80 0 t80 0" />
		<path d="M140 286 q40 -8 80 0 t80 0 t80 0" />
	</g>

	<!-- Pellets already in the water. The spill sources used to be drawn in at
	     the left, but the reader has just come through those steps, so the
	     water is all this scene needs to carry. -->
	<g class="emit" fill="var(--pearl)">
		<circle cx="150" cy="228" r="3.6" /><circle cx="182" cy="252" r="3.2" /><circle
			cx="206"
			cy="222"
			r="3.4"
		/><circle cx="172" cy="286" r="3.2" /><circle cx="214" cy="268" r="3.4" /><circle
			cx="138"
			cy="262"
			r="3.2"
		/>
	</g>

	<!-- 07.2 fragmenting -->
	<circle cx="250" cy="250" r={pelletR} fill="var(--pearl)" />
	<path
		d="M280 250 l40 -6 M282 262 l44 8 M278 238 l40 -14"
		stroke="var(--teal)"
		stroke-width="1"
		opacity={0.5 * frag}
	/>
	<g fill="var(--pearl)">
		{#each bits as b, i}
			<circle cx={b.cx} cy={b.cy} r={b.r} opacity={clamp01(frag * bits.length - i)} />
		{/each}
	</g>

	<!-- 07.3 ingested: a fish below the surface and a seabird above it, both
	     taking fragments in. They swim/glide toward the microplastics as the
	     stage arrives, so the eating reads as an act, not a label. -->
	<g opacity={eaten} transform="translate({-26 * (1 - eaten)} 0)">
		<!-- tail -->
		<path d="M244 300 l-30 -22 q8 22 0 44 Z" fill="#1b2b32" stroke="var(--teal)" stroke-width="1.2" />
		<!-- body -->
		<path
			d="M244 300 q22 -32 62 -32 q44 0 66 32 q-22 32 -66 32 q-40 0 -62 -32 Z"
			fill="#20323a"
			stroke="var(--teal)"
			stroke-width="1.3"
		/>
		<!-- fins -->
		<path d="M292 269 q12 -20 30 -13" fill="none" stroke="var(--teal)" stroke-width="1.2" />
		<path d="M292 331 q10 16 26 11" fill="none" stroke="var(--teal)" stroke-width="1.2" />
		<!-- gill and eye -->
		<path d="M330 278 q-10 22 0 44" fill="none" stroke="var(--teal)" stroke-width="1" opacity="0.7" />
		<circle cx="352" cy="292" r="3.2" fill="var(--teal)" />
		<circle cx="353" cy="291" r="1.1" fill="#0d0f11" />
		<!-- open mouth, fragments going in -->
		<path d="M372 300 q-8 -6 -10 -12" fill="none" stroke="var(--teal)" stroke-width="1.2" />
		<circle cx="384" cy="298" r="2.6" fill="var(--pearl)" opacity={eaten} />
		<circle cx="396" cy="293" r="2" fill="var(--pearl)" opacity={eaten * 0.8} />
	</g>

	<g opacity={eaten} transform="translate(0 {-18 * (1 - eaten)})">
		<!-- seabird, wings out, head down to the water -->
		<path
			d="M424 156 q30 -14 62 -8 q10 2 18 -6 q-2 12 -14 18 q-22 10 -44 6 q-14 -2 -22 -10 Z"
			fill="#20323a"
			stroke="var(--teal)"
			stroke-width="1.3"
		/>
		<path
			d="M446 150 q16 -26 44 -22 q-16 10 -20 22 q-12 6 -24 0 Z"
			fill="#1b2b32"
			stroke="var(--teal)"
			stroke-width="1.1"
		/>
		<path d="M430 162 q14 14 34 12" fill="none" stroke="var(--teal)" stroke-width="1.1" opacity="0.8" />
		<circle cx="496" cy="142" r="7.5" fill="#20323a" stroke="var(--teal)" stroke-width="1.2" />
		<circle cx="499" cy="140" r="1.6" fill="var(--teal)" />
		<path d="M503 143 l18 -3 -14 11 Z" fill="var(--amber)" />
		<circle cx="526" cy="139" r="2.4" fill="var(--pearl)" opacity={eaten} />
		<circle cx="536" cy="146" r="1.8" fill="var(--pearl)" opacity={eaten * 0.8} />
	</g>
</svg>
