<!-- Fig. 01 — the handful: the pile the pellets from Fig. 00 just landed in.
     Same pellets, same coordinates, same camera as the end of that scene, so
     the two plates cross-fade without anything moving. -->
<script>
	import { PILE, CLOSEUP, boxOf } from '$lib/data/pile.js';

	const viewBox = boxOf(CLOSEUP);
</script>

<svg
	class="plate"
	{viewBox}
	role="img"
	aria-label="A handful of small, round, translucent plastic nurdle pellets in a pile"
>
	<defs>
		<radialGradient id="pgPile" cx="34%" cy="30%" r="72%">
			<stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
			<stop offset="46%" stop-color="#f6f1e6" stop-opacity="0.12" />
			<stop offset="100%" stop-color="#a89a7e" stop-opacity="0.6" />
		</radialGradient>
		<radialGradient id="pgPileWarm" cx="34%" cy="30%" r="72%">
			<stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
			<stop offset="48%" stop-color="#f0e4cd" stop-opacity="0.14" />
			<stop offset="100%" stop-color="#9c8b6d" stop-opacity="0.62" />
		</radialGradient>
	</defs>

	<ellipse cx="320" cy="388" rx="88" ry="8" fill="#000" opacity="0.5" />

	{#each PILE as p (p.i)}
		<g>
			<circle cx={p.x} cy={p.y} r={p.r} fill="var(--pearl)" />
			<circle cx={p.x} cy={p.y} r={p.r} fill="url({p.tint > 0.55 ? '#pgPileWarm' : '#pgPile'})" />
			<!-- light wrapping the far edge, at this scale it reads as translucency -->
			<circle cx={p.x} cy={p.y} r={p.r - 0.25} fill="none" stroke="#fffaf0" stroke-width="0.3" opacity="0.3" />
			<ellipse
				cx={p.x - p.r * 0.32}
				cy={p.y - p.r * 0.36}
				rx={p.r * 0.3}
				ry={p.r * 0.2}
				fill="#fff"
				opacity="0.7"
			/>
			<circle cx={p.x + p.r * 0.26} cy={p.y + p.r * 0.3} r={p.r * 0.1} fill="#fff" opacity="0.26" />
		</g>
	{/each}
</svg>
