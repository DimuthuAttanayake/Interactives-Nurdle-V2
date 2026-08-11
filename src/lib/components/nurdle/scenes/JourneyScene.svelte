<!-- Fig. 04 — one continuous journey: plant → rail → ship.
     The route runs vertically: pellets leave the plant at the top, descend the
     production line to the rail cars, and carry on down to the ship. The camera
     tracks down the plate as the reader scrolls, so 04.1, 04.2 and 04.3 are
     three views of one drawing rather than three drawings. -->
<script>
	import * as d3 from 'd3';

	let { pan = 0 } = $props();

	// three camera stops down the plate: plant, rail, ship
	const camera = d3.scaleLinear().domain([0, 0.5, 1]).range([10, 430, 730]).clamp(true);
	const viewBox = $derived(`0 ${camera(pan).toFixed(1)} 520 330`);
</script>

<svg
	class="plate plate--wide"
	{viewBox}
	role="img"
	aria-label="Nurdles flow down from the factory along a production line onto rail cars and then a ship"
>
	<!-- ---------- 04.1 the polymer plant ---------- -->
	<g fill="#1c333b" stroke="#2a454e">
		<rect x="196" y="118" width="128" height="124" />
		<rect x="222" y="86" width="14" height="32" />
		<rect x="258" y="76" width="14" height="42" />
		<rect x="212" y="150" width="26" height="26" fill="#20323a" />
		<rect x="256" y="150" width="26" height="26" fill="#20323a" />
	</g>
	<!-- chimney output as tendrils, not puffs -->
	<g fill="none" stroke="#7d8486" stroke-width="2" stroke-linecap="round" opacity="0.6">
		<path d="M229 86 q-8 -14 2 -26 q8 -11 -1 -24" />
		<path d="M265 76 q9 -15 -2 -28 q-8 -11 2 -24" />
	</g>

	<!-- routine loss: the factory perimeter, and pellets escaping to it -->
	<ellipse cx="260" cy="246" rx="150" ry="34" fill="var(--amber)" opacity="0.05" />
	<ellipse
		class="pulsering"
		cx="260"
		cy="246"
		rx="150"
		ry="34"
		fill="none"
		stroke="var(--amber)"
		stroke-width="1.2"
		opacity="0.5"
	/>
	<g class="spillout" fill="var(--pearl)">
		<circle cx="128" cy="244" r="4" /><circle cx="392" cy="244" r="4" /><circle
			cx="164"
			cy="264"
			r="3.5"
		/><circle cx="356" cy="264" r="3.5" /><circle cx="260" cy="272" r="4" />
	</g>

	<!-- ---------- the production line, plant → rail ---------- -->
	<line x1="242" y1="248" x2="242" y2="470" stroke="#2a454e" stroke-width="2" />
	<line x1="278" y1="248" x2="278" y2="470" stroke="#2a454e" stroke-width="2" />
	<g fill="#16262c" stroke="#2a454e">
		<circle cx="260" cy="254" r="7" />
		<circle cx="260" cy="464" r="7" />
	</g>
	<g class="streamdown" style="--cvy:34px;animation-duration:1.4s" fill="var(--pearl)">
		<circle cx="260" cy="266" r="3.6" /><circle cx="260" cy="300" r="3.6" /><circle
			cx="260"
			cy="334"
			r="3.6"
		/><circle cx="260" cy="368" r="3.6" /><circle cx="260" cy="402" r="3.6" /><circle
			cx="260"
			cy="436"
			r="3.6"
		/>
	</g>

	<!-- ---------- 04.2 the rail cars: loaded, no spilling ---------- -->
	<line x1="40" y1="600" x2="480" y2="600" stroke="#2a454e" stroke-width="2" />
	<g stroke="#2a454e" stroke-width="1.4">
		<line x1="80" y1="596" x2="80" y2="604" /><line x1="140" y1="596" x2="140" y2="604" /><line
			x1="200"
			y1="596"
			x2="200"
			y2="604"
		/><line x1="320" y1="596" x2="320" y2="604" /><line x1="380" y1="596" x2="380" y2="604" /><line
			x1="440"
			y1="596"
			x2="440"
			y2="604"
		/>
	</g>
	<g fill="#20323a" stroke="var(--amber)">
		<path d="M148 598 v-40 h96 v40 Z" />
		<path d="M264 598 v-40 h96 v40 Z" />
	</g>
	<g fill="var(--pearl)">
		<path d="M150 558 q46 -22 92 0 Z" />
		<path d="M266 558 q46 -22 92 0 Z" />
	</g>
	<g fill="#e6ddc9">
		<circle cx="176" cy="554" r="3" /><circle cx="196" cy="550" r="3" /><circle
			cx="216"
			cy="554"
			r="3"
		/><circle cx="292" cy="554" r="3" /><circle cx="312" cy="550" r="3" /><circle
			cx="332"
			cy="554"
			r="3"
		/>
	</g>
	<g fill="#16262c" stroke="#2a454e">
		<circle cx="168" cy="600" r="7" /><circle cx="224" cy="600" r="7" /><circle
			cx="284"
			cy="600"
			r="7"
		/><circle cx="340" cy="600" r="7" />
	</g>

	<!-- ---------- the line carries on down, rail → ship ---------- -->
	<line x1="242" y1="612" x2="242" y2="784" stroke="#2a454e" stroke-width="2" />
	<line x1="278" y1="612" x2="278" y2="784" stroke="#2a454e" stroke-width="2" />
	<g class="streamdown" style="--cvy:36px;animation-duration:1.5s" fill="var(--pearl)">
		<circle cx="260" cy="628" r="3.6" /><circle cx="260" cy="664" r="3.6" /><circle
			cx="260"
			cy="700"
			r="3.6"
		/><circle cx="260" cy="736" r="3.6" /><circle cx="260" cy="772" r="3.6" />
	</g>

	<!-- ---------- 04.3 the ship: loaded, no spilling ---------- -->
	<rect x="0" y="880" width="520" height="200" fill="#0e2830" opacity="0.6" />
	<path d="M96 880 h330 l-40 46 h-250 Z" fill="#1a2a31" stroke="var(--amber)" stroke-width="1.5" />
	<rect x="120" y="838" width="52" height="42" fill="#16262c" stroke="#2a454e" />
	<rect x="132" y="814" width="16" height="24" fill="#16262c" stroke="#2a454e" />
	<g fill="#122026" stroke="#2a454e">
		<rect x="190" y="852" width="44" height="28" /><rect x="238" y="852" width="44" height="28" />
		<rect x="286" y="852" width="44" height="28" /><rect x="190" y="826" width="44" height="26" />
		<rect x="238" y="826" width="44" height="26" /><rect x="338" y="856" width="40" height="24" />
	</g>
	<g fill="var(--pearl)">
		<path d="M192 852 q20 -12 40 0 Z" />
		<path d="M240 852 q20 -12 40 0 Z" />
	</g>
	<g fill="#e6ddc9">
		<circle cx="204" cy="850" r="2.6" /><circle cx="218" cy="848" r="2.6" /><circle
			cx="252"
			cy="850"
			r="2.6"
		/>
	</g>
	<g stroke="var(--line)" stroke-width="1.4" fill="none">
		<path d="M0 946 q26 -6 52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0" />
		<path d="M0 986 q26 -6 52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0" />
	</g>
</svg>
