<script>
	import { onMount, untrack } from 'svelte';
	import * as d3 from 'd3';
	import { feature } from 'topojson-client';
	import nurdleLocations from '$lib/data/nurdle_locations.json';

	// a handful of rows have out-of-range lat/lon (data entry errors); drop them
	const validNurdles = nurdleLocations.filter(
		(d) => Math.abs(d.lat) <= 90 && Math.abs(d.lon) <= 180
	);

	// each step has { lat, lon }; the globe eases its rotation to center on that point
	// finalSettled flips true the moment the post-story auto-spin kicks back in,
	// so the caller can fade out the last card right as rotation resumes
	let {
		steps = [],
		index = 0,
		initialRotation = [30, -20],
		finalSettled = $bindable(false)
	} = $props();

	// degrees of longitude per second, independent of display frame rate
	const AUTO_ROTATE_DEG_PER_SEC = 7.2;
	const RAMP_MS = 900;

	let wrapEl;
	let canvasEl;
	let width = $state(0);
	let windowHeight = $state(0);

	// keep the globe square and never larger than the viewport allows
	const size = $derived(Math.max(0, Math.min(width, windowHeight) - 64));

	let land = $state(null);

	onMount(() => {
		d3.json('https://unpkg.com/world-atlas@2/land-110m.json').then((world) => {
			land = feature(world, world.objects.land);
		});
	});

	let projection = null;
	let context = null;
	let rotation = untrack(() => initialRotation.slice());
	let stepTimer;
	let autoTimer;
	let holdTimeoutId;

	function shortestDelta(from, to) {
		// pick the -180..180 delta so longitude eases the short way around
		let d = ((to - from + 180) % 360) - 180;
		return d < -180 ? d + 360 : d;
	}

	function targetRotation(lon, lat) {
		return [-lon, -lat];
	}

	function stopAutoRotate() {
		if (autoTimer) autoTimer.stop();
	}

	function stopStepTimer() {
		if (stepTimer) stepTimer.stop();
	}

	function startAutoRotate() {
		stopStepTimer();
		stopAutoRotate();

		const base = rotation.slice();
		autoTimer = d3.timer((elapsed) => {
			if (!projection) return;
			// ease the spin up to full speed instead of snapping straight to it,
			// so it doesn't jerk right after the arrival animation settles
			const ramp = Math.min(1, elapsed / RAMP_MS);
			const rampedElapsed = elapsed * d3.easeQuadOut(ramp);
			rotation = [base[0] + AUTO_ROTATE_DEG_PER_SEC * (rampedElapsed / 1000), base[1]];
			projection.rotate(rotation);
			draw();
		});
	}

	function animateTo(lat, lon, onComplete) {
		stopAutoRotate();
		stopStepTimer();

		const start = rotation.slice();
		const [toLambda, toPhi] = targetRotation(lon, lat);
		const dLambda = shortestDelta(start[0], toLambda);
		const dPhi = toPhi - start[1];

		const duration = 1400;
		stepTimer = d3.timer((elapsed) => {
			const t = Math.min(1, elapsed / duration);
			const eased = d3.easeCubicInOut(t);
			rotation = [start[0] + dLambda * eased, start[1] + dPhi * eased];
			projection.rotate(rotation);
			draw();
			if (t >= 1) {
				stepTimer.stop();
				if (onComplete) onComplete();
			}
		});
	}

	function draw() {
		if (!projection || !context) return;
		context.clearRect(0, 0, size, size);
		const path = d3.geoPath(projection, context);
		const sphere = { type: 'Sphere' };

		context.beginPath();
		path(sphere);
		context.fillStyle = '#000000';
		context.fill();
		context.beginPath();
		path(sphere);
		context.strokeStyle = '#333333';
		context.lineWidth = 1;
		context.stroke();

		if (land) {
			context.beginPath();
			path(land);
			context.fillStyle = '#161616';
			context.fill();
			context.strokeStyle = '#3a3a3a';
			context.lineWidth = 0.5;
			context.stroke();
		}

		const center = [-rotation[0], -rotation[1]];
		context.fillStyle = '#ffffff';
		for (const d of validNurdles) {
			const coord = [d.lon, d.lat];
			if (d3.geoDistance(coord, center) > Math.PI / 2) continue;
			const p = projection(coord);
			if (!p) continue;
			context.beginPath();
			context.arc(p[0], p[1], 1.5, 0, 2 * Math.PI);
			context.fill();
		}

		// pulsing highlight ring on the location the current step is about
		// (steps that don't focus on one specific point, like the spin, skip this)
		const current = steps[Math.min(index, steps.length - 1)];
		if (current && current.highlight !== false) {
			const coord = [current.lon, current.lat];
			if (d3.geoDistance(coord, center) <= Math.PI / 2) {
				const p = projection(coord);
				if (p) {
					context.beginPath();
					context.arc(p[0], p[1], 4, 0, 2 * Math.PI);
					context.fillStyle = '#ffffff';
					context.fill();
					context.lineWidth = 1.5;
					context.strokeStyle = '#ffcc00';
					context.stroke();

					context.beginPath();
					context.arc(p[0], p[1], 9, 0, 2 * Math.PI);
					context.strokeStyle = 'rgba(255, 204, 0, 0.6)';
					context.lineWidth = 1;
					context.stroke();
				}
			}
		}
	}

	// (re)build the canvas + projection whenever the available size changes
	$effect(() => {
		if (!canvasEl || size === 0) return;

		context = canvasEl.getContext('2d');
		const dpr = window.devicePixelRatio || 1;
		canvasEl.width = size * dpr;
		canvasEl.height = size * dpr;
		canvasEl.style.width = `${size}px`;
		canvasEl.style.height = `${size}px`;
		context.setTransform(dpr, 0, 0, dpr, 0, 0);

		projection = d3
			.geoOrthographic()
			.scale(size / 2.1)
			.translate([size / 2, size / 2])
			.clipAngle(90)
			.rotate(rotation);

		draw();
	});

	// redraw once land geometry finishes loading
	$effect(() => {
		land;
		draw();
	});

	// drive rotation from whichever step is currently active
	$effect(() => {
		const step = steps[Math.min(index, steps.length - 1)];
		if (!step || !projection || !context) return;

		finalSettled = false;

		const isLastStep = index === steps.length - 1;
		animateTo(step.lat, step.lon, () => {
			if (isLastStep) {
				// hold on the final pin for a moment before resuming the spin
				holdTimeoutId = setTimeout(() => {
					finalSettled = true;
					startAutoRotate();
				}, 2000);
			}
		});

		return () => {
			stopAutoRotate();
			stopStepTimer();
			clearTimeout(holdTimeoutId);
		};
	});
</script>

<svelte:window bind:innerHeight={windowHeight} />

<div class="globe-background" bind:this={wrapEl} bind:clientWidth={width}>
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.globe-background {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		background: #000000;
		padding: 2rem;
	}

	canvas {
		display: block;
		max-width: 100%;
		max-height: 100%;
	}
</style>
