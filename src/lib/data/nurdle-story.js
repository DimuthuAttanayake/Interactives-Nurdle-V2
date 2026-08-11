// The whole storyboard as one beat list.
//
// Every beat in `nurdle-storyboard-print.html` is a step here, and the five
// globe tour stops are steps of their own. One scroll progress value `p`
// (0..1) runs across the entire sticky section: each beat holds for a while,
// and the gaps between holds are the morphs — which is what lets the pellets
// from the spill scenes fly up and assemble into the globe.
//
// scene   — which SVG plate is on stage (null = canvas only)
// layout  — where the canvas particles live during this beat
// pan     — camera position inside the wide journey plate (0 = factory, 1 = ship)
// stage   — reveal stage inside the ocean plate (0 = water, 1 = fragments, 2 = ingested)
// rot     — globe centre for this beat, [lon, lat]

export const BEATS = [
	{
		id: '00',
		tag: 'One thing in common',
		text: 'What do plastic bottles, polyester tops and car battery covers have in common?',
		tone: 'a',
		scene: 'products',
		spill: 0,
		layout: 'hidden'
	},
	{
		id: '01',
		tag: 'Meet the nurdle',
		text: 'Plastics as we know them, from water bottles to cars, are created from small, translucent plastic polymers called “nurdles.”',
		tone: 'a',
		scene: 'nurdle',
		// the objects in the previous beat empty out and their pellets fall
		// away as this one arrives — given two viewports and a short hold, so
		// most of that block is the spill itself
		spill: 1,
		slots: 3,
		hold: 0.1,
		layout: 'hidden'
	},
	{
		id: '02',
		tag: 'How small?',
		text: 'These are approximately 5 mm in size, about the size of a lentil.',
		tone: 'a',
		scene: 'size',
		layout: 'hidden'
	},
	{
		id: '03',
		tag: 'Where they are born',
		text: 'Plastics are a byproduct of oil and gas production, and leftover chemicals from refining the oil and gas are used to manufacture nurdles.',
		tone: 'a',
		scene: 'refinery',
		layout: 'hidden'
	},
	{
		id: '04.1',
		tag: 'Manufacturing',
		text: 'Some nurdles are lost to the environment during routine handling.',
		tone: 'a',
		scene: 'journey',
		pan: 0,
		layout: 'hidden'
	},
	{
		id: '04.2',
		tag: 'Loaded onto rail',
		text: 'The rest are transported away by train…',
		tone: 'a',
		scene: 'journey',
		pan: 0.5,
		layout: 'hidden'
	},
	{
		id: '04.3',
		tag: 'Loaded onto ship',
		// carries what used to be its own sceneless step (05.0), so the reader
		// never sits on a bare particle field
		text: '…or by ships. Nurdles are released to the environment as a result of routine handling failures and accidents along the supply chain. They are a lesser-known form of industrial pollution, and one of the most pervasive forms of microplastic pollution globally.',
		tone: 'a',
		scene: 'journey',
		pan: 1,
		layout: 'hidden'
	},
	{
		id: '05.1',
		tag: 'Rail derailment',
		text: 'Rail accidents, for example, have spilled nurdles into the environment, where they often end up in water systems.',
		tone: 'a',
		scene: 'derail',
		// the accident plates carry their own spilled pellets, so the canvas
		// field stays out of the way until the globe assembles
		layout: 'hidden'
	},
	{
		id: '05.2',
		tag: 'Shipping accident',
		text: 'Large volumes of nurdles are spilled into the oceans during maritime accidents.',
		tone: 'a',
		scene: 'wreck',
		layout: 'hidden'
	},
	// The ocean fate sits before the global view, as the storyboard's own note
	// proposed: the reader follows one spill all the way to the animals eating
	// it, and only then pulls back to see the whole world.
	{
		id: '07.1',
		tag: 'Into the water',
		text: 'Most of the nurdles lost from ships end up in rivers, oceans and shores around the world…',
		tone: 't',
		scene: 'ocean',
		stage: 0,
		layout: 'ocean'
	},
	{
		id: '07.2',
		tag: 'Ingested',
		text: 'Fish and birds are known to ingest these nurdles.',
		tone: 't',
		scene: 'ocean',
		stage: 1,
		layout: 'ocean'
	},
	{
		id: '07.3',
		tag: 'Breaks into microplastics',
		text: 'Nurdles are also known to further disintegrate into smaller plastics, potentially surviving beyond the human lifespan.',
		tone: 't',
		scene: 'ocean',
		stage: 2,
		layout: 'ocean'
	},

	// The globe tour, lifted verbatim from the Interactives-Final scrolly:
	// same stops, same place names, same copy.
	{
		id: '06.1',
		tag: 'A global problem',
		text: 'From a single spill site to the most remote corners of the ocean, nurdles travel farther than most people realize.',
		tone: 'g',
		scene: null,
		// three viewports with a short hold: the pellets lift off the water and
		// assemble into the globe slowly enough to actually watch
		slots: 3,
		hold: 0.1,
		layout: 'globe',
		rot: [-30.0, 10.0],
		highlight: false
	},
	{
		id: '06.2',
		tag: 'Nurdles, everywhere',
		text: 'Nurdles have now been detected on every continent.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [-30.0, 15.0],
		highlight: false
	},
	{
		id: '06.3',
		tag: 'Easter Island (Rapa Nui), Chile',
		text: 'Nurdles have been found on Easter Island (Rapa Nui), Chile, one of the most isolated inhabited islands on Earth.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [-109.323581, -27.073869]
	},
	{
		id: '06.4',
		tag: 'Ketchikan, Alaska',
		text: 'Nurdles have been found in Ketchikan, Alaska, on the edge of the Tongass National Forest, the largest national forest and temperate rainforest in the US.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [-132.081234, 55.539625]
	},
	{
		id: '06.5',
		tag: 'Galápagos Islands (Isabela), Ecuador',
		text: 'Nurdles have been found in the Galápagos Islands (Isabela), Ecuador, a UNESCO World Heritage Site and one of the most strictly protected marine reserves on Earth.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [-90.332014, -0.760755]
	},
	{
		id: '06.6',
		tag: 'Zanzibar / Mombasa coast, Kenya/Tanzania',
		text: 'Nurdles have been found along the Zanzibar / Mombasa coast, Kenya/Tanzania, home to some of the richest coral reef biodiversity in the Indian Ocean.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [39.986579, -3.380916]
	},
	{
		id: '06.7',
		tag: 'Crete / Cyclades, Greece',
		text: 'Nurdles have been found in the Aegean Sea, home to Natura 2000 marine sites and turtle and monk seal conservation zones in a region holding an outsized share of the Mediterranean’s endemic marine life.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [25.75, 35.13]
	},

	// Seadrift arrives at the same projection as every other stop, then the
	// next beat pushes the camera in on it. Coordinates are the EPA facility
	// point for Union Carbide / Dow Seadrift Operations, Calhoun County, TX.
	{
		id: '06.8',
		tag: 'Seadrift, Texas',
		text: 'In the US, regulations for nurdle spills are patchy.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [-96.754167, 28.508333]
	},
	{
		id: '06.9',
		tag: 'Seadrift, Texas',
		text: 'So on the Gulf Coast of Texas, citizens have taken up the fight.',
		tone: 'g',
		scene: null,
		layout: 'globe',
		rot: [-96.754167, 28.508333],
		// same centre, camera pushed in, over two viewports so it reads as a move
		zoom: 3.4,
		slots: 2,
		hold: 0.2
	}
];

export const N_BEATS = BEATS.length;

// How many viewports of scrolling each beat occupies. Most take one; a beat
// takes more when the move INTO it needs room to be read — the objects
// emptying into the handful, and the pellets lifting off the water into the
// globe. `hold` is the share of a beat's own height spent parked on it, so a
// tall beat with a small hold is mostly transition.
const SLOTS = BEATS.map((b) => b.slots ?? 1);
const HOLDS = BEATS.map((b) => b.hold ?? 0.3);

export const TOTAL_SLOTS = SLOTS.reduce((a, b) => a + b, 0);
export const STEP_SLOTS = SLOTS;

// scroll range, in viewports, over which the stage stays pinned
const RANGE = TOTAL_SLOTS - 1;

const PREFIX = SLOTS.reduce((acc, s, i) => {
	acc.push(i === 0 ? 0 : acc[i - 1] + SLOTS[i - 1]);
	return acc;
}, []);

// Beat i is centred in the viewport once its own block has scrolled halfway
// past, which lands its card dead centre at exactly this p.
export const centerOf = (i) => (PREFIX[i] + SLOTS[i] / 2 - 0.5) / RANGE;
const holdOf = (i) => (SLOTS[i] * HOLDS[i]) / RANGE;

const smooth = (t) => t * t * (3 - 2 * t);

/**
 * Which beats are we between, and how far?
 * Inside a hold both indices match and t is 0; between two holds we ease, so
 * every morph starts and ends at rest instead of snapping in and out.
 * @returns {[number, number, number]} [from, to, t]
 */
export function phase(p) {
	for (let i = 0; i < N_BEATS; i++) {
		const c = centerOf(i);
		const h = holdOf(i);
		if (p <= c + h) {
			if (p >= c - h || i === 0) return [i, i, 0];
			const from = centerOf(i - 1) + holdOf(i - 1);
			const to = c - h;
			return [i - 1, i, smooth(Math.max(0, Math.min(1, (p - from) / (to - from))))];
		}
	}
	return [N_BEATS - 1, N_BEATS - 1, 0];
}

// The globe tour stops, derived from the beats that carry a rotation, so the
// pulsing ring and the copy can never drift out of sync.
export const tourStops = BEATS.map((b, i) => ({ ...b, p: centerOf(i) }))
	.filter((b) => b.rot)
	.map((b) => ({
		p: b.p,
		lon: b.rot[0],
		lat: b.rot[1],
		highlight: b.highlight !== false,
		place: b.tag
	}));
