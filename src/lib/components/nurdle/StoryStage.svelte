<!--
  The whole story on one sticky stage.

  Two layers share a single scroll progress `p`:
    · the SVG plates (the storyboard figures), cross-faded beat to beat
    · a canvas of 300 pellets that are real Nurdle Patrol sightings, which
      scatter out of the spill scenes and assemble into the orthographic globe

  The pellet → globe morph is the hinge of the piece, so the particles and the
  plates are deliberately kept in the same stage: the pellets you watch spill
  off the derailed hopper are the pellets that become the map.
-->
<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { feature } from 'topojson-client';
	import nurdleLocations from '$lib/data/nurdle_locations.json';
	import { BEATS, STEP_SLOTS, TOTAL_SLOTS, phase, tourStops } from '$lib/data/nurdle-story.js';

	import ProductsScene from './scenes/ProductsScene.svelte';
	import NurdleScene from './scenes/NurdleScene.svelte';
	import SizeScene from './scenes/SizeScene.svelte';
	import RefineryScene from './scenes/RefineryScene.svelte';
	import JourneyScene from './scenes/JourneyScene.svelte';
	import DerailScene from './scenes/DerailScene.svelte';
	import WreckScene from './scenes/WreckScene.svelte';
	import OceanScene from './scenes/OceanScene.svelte';

	// a handful of rows have out-of-range lat/lon (data entry errors); drop them
	const sightings = nurdleLocations.filter((d) => Math.abs(d.lat) <= 90 && Math.abs(d.lon) <= 180);

	const N = 300;

	// cheap deterministic hash so layouts and sampling are stable across resizes
	const rand = (i, s) => {
		const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
		return x - Math.floor(x);
	};

	/**
	 * The particles that morph through the story ARE real sightings, but they
	 * can't be a plain stride sample: 98.6% of Nurdle Patrol records sit in the
	 * Americas, so a proportional sample leaves the globe empty whenever it
	 * rotates away from the Gulf. Instead we round-robin across 30° longitude
	 * bands, taking every point sparse regions have and topping up from dense
	 * ones. Every particle is still a distinct real sighting — the honest
	 * density is carried by the full 8,679-point field drawn underneath.
	 */
	function stratifiedSample(points, n) {
		const bands = d3.group(points, (d) => Math.floor(d.lon / 30));
		// spread the picks within each band instead of clustering at its start
		const queues = [...bands.values()].map((list) =>
			list
				.map((d, i) => ({ d, k: rand(i, 9) }))
				.sort((a, b) => a.k - b.k)
				.map((o) => o.d)
		);

		const out = [];
		for (let round = 0; out.length < n; round++) {
			let added = false;
			for (const q of queues) {
				if (round >= q.length) continue;
				out.push(q[round]);
				added = true;
				if (out.length === n) return out;
			}
			if (!added) break;
		}
		return out;
	}

	const sample = stratifiedSample(sightings, N);
	const sampleCoords = sample.map((d) => [d.lon, d.lat]);
	const allCoords = sightings.map((d) => [d.lon, d.lat]);

	let storyEl;
	let canvasEl;

	// what the plate layer is showing — driven from the draw loop
	const NO_PLATES = {
		products: 0,
		nurdle: 0,
		size: 0,
		refinery: 0,
		journey: 0,
		derail: 0,
		wreck: 0,
		ocean: 0
	};
	let vis = $state({ ...NO_PLATES });
	let pan = $state(0);
	let oceanStage = $state(0);
	let spill = $state(0);

	let W = 0;
	let H = 0;
	let ctx = null;
	let projection = null;
	let land = null;
	const graticule = d3.geoGraticule10();

	let scatter = [];
	let ocean = [];
	let cx = 0;
	let cy = 0;
	let R = 0;
	// R at the current beat's zoom: the globe keeps its centre and grows, so a
	// stop can be approached at the same projection and then pushed in on
	let Rz = 0;
	// device pixel ratio of the current screen, kept so strokes can be given a
	// floor of one real pixel — a 0.5 hairline is crisp at dpr 2 but washes out
	// to nothing on a large dpr-1 monitor, which is where the coastlines vanish
	let dpr = 1;
	const globe = Array.from({ length: N }, () => ({ x: 0, y: 0, r: 0, a: 0 }));
	// pellets are invisible until the spills start, but they wait in their
	// scatter positions so the first beat of 05 is a fade-up, not a fly-in
	let hidden = [];

	const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
	const lerp = (a, b, t) => a + (b - a) * t;
	const bump = (p, m, w) => Math.max(0, 1 - Math.abs(p - m) / w);

	const reduceMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function build() {
		const m = Math.min(W, H);
		cx = W / 2;
		cy = H / 2;
		R = m * 0.42;

		scatter = [];
		ocean = [];
		hidden = [];

		for (let i = 0; i < N; i++) {
			const ang = rand(i, 1) * Math.PI * 2;
			const rad = Math.sqrt(rand(i, 2)) * m * 0.44;
			const sx = cx + Math.cos(ang) * rad * 1.25;
			const sy = cy + Math.sin(ang) * rad;
			scatter.push({ x: sx, y: sy, r: 2.4 + rand(i, 3) * 1.6, a: 0.9 });
			hidden.push({ x: sx, y: sy, r: 2.4, a: 0 });

			ocean.push({
				x: rand(i, 4) * W,
				y: H * 0.42 + rand(i, 5) * H * 0.52,
				r: 1.2 + rand(i, 6) * 1.5,
				a: 0.45 + rand(i, 7) * 0.45
			});
		}

		Rz = R;
		projection = d3.geoOrthographic().scale(R).translate([cx, cy]).clipAngle(90);
	}

	function resize() {
		dpr = Math.min(2, window.devicePixelRatio || 1);
		W = window.innerWidth;
		H = window.innerHeight;
		canvasEl.width = W * dpr;
		canvasEl.height = H * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		build();
	}

	// --- scroll progress across the whole sticky section -------------------
	let target = 0;
	let cur = 0;

	function computeTarget() {
		const total = storyEl.offsetHeight - window.innerHeight;
		const scrolled = -storyEl.getBoundingClientRect().top;
		target = clamp(scrolled / total, 0, 1);
	}

	function shortestDelta(from, to) {
		// pick the -180..180 delta so longitude eases the short way around
		let d = ((to - from + 180) % 360) - 180;
		return d < -180 ? d + 360 : d;
	}

	// Scroll-driven rotation through the sighting tour. Held at the first stop
	// while the globe is still assembling, and at the last while it disperses.
	function rotationAt(p) {
		const first = tourStops[0];
		const last = tourStops[tourStops.length - 1];
		if (p <= first.p) return [-first.lon, -first.lat];
		if (p >= last.p) return [-last.lon, -last.lat];

		let i = 0;
		while (i < tourStops.length - 1 && p > tourStops[i + 1].p) i++;
		const a = tourStops[i];
		const b = tourStops[i + 1];
		const t = d3.easeCubicInOut((p - a.p) / (b.p - a.p));
		const dLambda = shortestDelta(-a.lon, -b.lon);
		return [-a.lon + dLambda * t, lerp(-a.lat, -b.lat, t)];
	}

	function updateGlobeLayout() {
		const rot = projection.rotate();
		const center = [-rot[0], -rot[1]];
		for (let i = 0; i < N; i++) {
			const c = sampleCoords[i];
			const pt = projection(c);
			const g = globe[i];

			if (d3.geoDistance(c, center) <= Math.PI / 2) {
				g.x = pt[0];
				g.y = pt[1];
				g.r = 2.2;
				g.a = 0.95;
				continue;
			}

			// Far-side points project to a mirrored spot inside the disk, which
			// would read as sightings floating over the wrong hemisphere. Park
			// them on the silhouette along the same bearing instead: the particle
			// mass you have been following is conserved, and it reads as points
			// wrapped around the back rather than as half the globe blinking out.
			const dx = pt[0] - cx;
			const dy = pt[1] - cy;
			const len = Math.hypot(dx, dy) || 1;
			g.x = cx + (dx / len) * Rz;
			g.y = cy + (dy / len) * Rz;
			g.r = 1.4;
			g.a = 0.22;
		}
	}

	function layoutFor(name) {
		// `scatter` is the loose field the pellets fade up from on their way
		// into the globe; `hidden` is that same field at zero alpha
		if (name === 'scatter') return scatter;
		if (name === 'globe') return globe;
		if (name === 'ocean') return ocean;
		return hidden;
	}

	function drawGlobe(strength, p) {
		const path = d3.geoPath(projection, ctx);
		const sphere = { type: 'Sphere' };

		ctx.save();
		ctx.globalAlpha = strength;

		ctx.beginPath();
		path(sphere);
		ctx.fillStyle = '#0a0c0e';
		ctx.fill();

		// Line weights are authored against a laptop-sized globe and scale with
		// the radius, so the drawing keeps its proportions on a large display
		// instead of turning into hairlines around a much longer coastline.
		// The floor of one device pixel is what stops them disappearing on a
		// big dpr-1 monitor.
		const k = R / 340;
		const hair = (w) => Math.max(w * k, 1 / dpr);

		ctx.beginPath();
		path(graticule);
		ctx.strokeStyle = 'rgba(79, 191, 166, 0.16)';
		ctx.lineWidth = hair(0.6);
		ctx.stroke();

		if (land) {
			ctx.beginPath();
			path(land);
			ctx.fillStyle = '#181c1f';
			ctx.fill();
			// Deliberately kept a step dimmer than the sighting dots above, which
			// sit at rgba(241, 236, 224, 0.5) — roughly #7d7a74 once composited.
			// The coastline has to read without competing with them.
			ctx.strokeStyle = '#6b7780';
			ctx.lineWidth = hair(0.6);
			ctx.stroke();
		}

		// the full 8,700-point sighting field, under the morphing sample
		const rot = projection.rotate();
		const center = [-rot[0], -rot[1]];
		ctx.fillStyle = 'rgba(241, 236, 224, 0.5)';
		for (const c of allCoords) {
			if (d3.geoDistance(c, center) > Math.PI / 2) continue;
			const pt = projection(c);
			ctx.beginPath();
			ctx.arc(pt[0], pt[1], 1.2, 0, 6.283);
			ctx.fill();
		}

		ctx.beginPath();
		path(sphere);
		ctx.strokeStyle = 'rgba(79, 191, 166, 0.4)';
		ctx.lineWidth = hair(1);
		ctx.stroke();

		// pulsing ring on whichever tour stop the copy is currently about
		for (const stop of tourStops) {
			if (!stop.highlight) continue;
			const near = bump(p, stop.p, 0.035);
			if (near < 0.01) continue;
			const c = [stop.lon, stop.lat];
			if (d3.geoDistance(c, center) > Math.PI / 2) continue;
			const pt = projection(c);

			ctx.globalAlpha = strength * near;

			// Built like a lit bulb rather than a flat dot: a wide additive bloom,
			// the lamp body inside it, and a white-hot centre. Real light sources
			// blow out to white at the middle — that highlight is what sells it
			// as shining rather than merely being a bright yellow circle.
			const r = 4.6;

			ctx.save();

			// the bloom. 'lighter' adds to what's underneath instead of painting
			// over it, which is how emitted light behaves.
			ctx.globalCompositeOperation = 'lighter';
			const halo = ctx.createRadialGradient(pt[0], pt[1], 0, pt[0], pt[1], r * 5);
			halo.addColorStop(0, 'rgba(255, 236, 140, 0.55)');
			halo.addColorStop(0.3, 'rgba(255, 214, 20, 0.26)');
			halo.addColorStop(1, 'rgba(255, 200, 0, 0)');
			ctx.fillStyle = halo;
			ctx.beginPath();
			ctx.arc(pt[0], pt[1], r * 5, 0, 6.283);
			ctx.fill();

			// the lamp body
			ctx.shadowColor = 'rgba(255, 226, 70, 1)';
			ctx.shadowBlur = 24;
			ctx.beginPath();
			ctx.arc(pt[0], pt[1], r, 0, 6.283);
			ctx.fillStyle = '#ffe93a';
			ctx.fill();

			// the hot centre
			ctx.shadowBlur = 0;
			ctx.beginPath();
			ctx.arc(pt[0], pt[1], r * 0.42, 0, 6.283);
			ctx.fillStyle = '#fffdf0';
			ctx.fill();

			ctx.restore();

			// the ring still pulses outward, now reading as the bulb's falloff
			ctx.beginPath();
			ctx.arc(pt[0], pt[1], 10 + (1 - near) * 7, 0, 6.283);
			ctx.strokeStyle = 'rgba(255, 214, 40, 0.8)';
			ctx.lineWidth = 1.4;
			ctx.stroke();
		}

		ctx.restore();
	}

	function drawWaves(strength) {
		ctx.strokeStyle = `rgba(42, 46, 49, ${strength})`;
		ctx.lineWidth = 1.2;
		for (let k = 0; k < 3; k++) {
			const yy = H * 0.72 + k * 26;
			ctx.beginPath();
			ctx.moveTo(0, yy);
			for (let x = 0; x <= W; x += 48) ctx.quadraticCurveTo(x + 12, yy - 6, x + 24, yy);
			ctx.stroke();
		}
	}

	// blend of a per-beat value across the current morph
	const mix = (a, b, t, key, fallback) =>
		lerp(BEATS[a][key] ?? fallback, BEATS[b][key] ?? fallback, t);

	function syncPlates(ai, bi, t) {
		// Cross-dissolve with overlap rather than a straight 50/50 swap: the
		// outgoing plate holds while its own motion finishes (the pellets
		// falling out of the bottle), and the incoming one arrives late.
		const out = clamp(1 - t * 1.35, 0, 1);
		const into = clamp((t - 0.25) / 0.75, 0, 1);

		const next = { ...NO_PLATES };
		if (BEATS[ai].scene) next[BEATS[ai].scene] += ai === bi ? 1 : out;
		if (BEATS[bi].scene && bi !== ai) next[BEATS[bi].scene] += into;

		// only push to the DOM when something actually moved
		for (const k in next) {
			if (Math.abs(next[k] - vis[k]) > 0.004) {
				vis = next;
				break;
			}
		}

		const nextPan = mix(ai, bi, t, 'pan', 0);
		if (Math.abs(nextPan - pan) > 0.002) pan = nextPan;

		const nextStage = mix(ai, bi, t, 'stage', 0);
		if (Math.abs(nextStage - oceanStage) > 0.004) oceanStage = nextStage;

		const nextSpill = mix(ai, bi, t, 'spill', 0);
		if (Math.abs(nextSpill - spill) > 0.004) spill = nextSpill;
	}

	function draw(ts) {
		cur = reduceMotion ? target : cur + (target - cur) * 0.09;
		const p = cur;

		ctx.clearRect(0, 0, W, H);

		const [ai, bi, t] = phase(p);
		syncPlates(ai, bi, t);

		const strengthOf = (name) =>
			(BEATS[ai].layout === name ? 1 - t : 0) + (BEATS[bi].layout === name ? t : 0);

		const globeStrength = strengthOf('globe');
		if (globeStrength > 0.01) {
			Rz = R * mix(ai, bi, t, 'zoom', 1);
			projection.scale(Rz).rotate(rotationAt(p));
			updateGlobeLayout();
			drawGlobe(globeStrength, p);
		}

		const oceanStrength = strengthOf('ocean');
		if (oceanStrength > 0.01) drawWaves(oceanStrength);

		const A = layoutFor(BEATS[ai].layout);
		const B = layoutFor(BEATS[bi].layout);
		const jitter = reduceMotion ? 0 : 1.3;
		for (let i = 0; i < N; i++) {
			const a = A[i];
			const b = B[i];
			const dx = Math.sin(ts * 0.0006 + i) * jitter;
			const dy = Math.cos(ts * 0.0007 + i * 1.3) * jitter;
			const x = lerp(a.x, b.x, t) + dx;
			const y = lerp(a.y, b.y, t) + dy;
			const r = lerp(a.r, b.r, t);
			const al = lerp(a.a, b.a, t);
			if (al < 0.01) continue;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 6.283);
			ctx.fillStyle = `rgba(241, 236, 224, ${al})`;
			ctx.fill();
		}

		frame = requestAnimationFrame(draw);
	}

	let frame;

	onMount(() => {
		ctx = canvasEl.getContext('2d');
		resize();
		computeTarget();
		cur = target;
		frame = requestAnimationFrame(draw);

		d3.json('https://unpkg.com/world-atlas@2/land-110m.json').then((world) => {
			land = feature(world, world.objects.land);
		});

		return () => cancelAnimationFrame(frame);
	});
</script>

<svelte:window onscroll={computeTarget} onresize={resize} />

<section class="story" bind:this={storyEl} style="height: {TOTAL_SLOTS * 100}vh">
	<div class="stage">
		<div class="stage__grid" aria-hidden="true"></div>
		<canvas bind:this={canvasEl} aria-hidden="true"></canvas>

		<div class="plates" aria-hidden="true">
			<div class="plate-slot" style="opacity: {vis.products}">
				{#if vis.products > 0.01}<ProductsScene {spill} />{/if}
			</div>
			<div class="plate-slot" style="opacity: {vis.nurdle}">
				{#if vis.nurdle > 0.01}<NurdleScene />{/if}
			</div>
			<div class="plate-slot" style="opacity: {vis.size}">
				{#if vis.size > 0.01}<SizeScene vis={vis.size} />{/if}
			</div>
			<div class="plate-slot" style="opacity: {vis.refinery}">
				{#if vis.refinery > 0.01}<RefineryScene />{/if}
			</div>
			<div class="plate-slot" style="opacity: {vis.journey}">
				{#if vis.journey > 0.01}<JourneyScene {pan} />{/if}
			</div>
			<div class="plate-slot" style="opacity: {vis.derail}">
				{#if vis.derail > 0.01}<DerailScene vis={vis.derail} />{/if}
			</div>
			<div class="plate-slot" style="opacity: {vis.wreck}">
				{#if vis.wreck > 0.01}<WreckScene vis={vis.wreck} />{/if}
			</div>
			<div class="plate-slot" style="opacity: {vis.ocean}">
				{#if vis.ocean > 0.01}<OceanScene stage={oceanStage} />{/if}
			</div>
		</div>

		<div class="stage__scrim" aria-hidden="true"></div>
	</div>

	<!-- the scrolling text: one step per storyboard beat -->
	<div class="steps">
		{#each BEATS as beat, i}
			<div class="step" style="height: {STEP_SLOTS[i] * 100}vh">
				<div class="step__card {beat.tone}">
					<!-- No headline on any beat. The globe tour used to carry its place
					     name as a coloured label, but each of those beats already names
					     the place in its own first line, so the label only repeated it. -->
					<p class="text">{beat.text}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
