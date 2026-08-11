// Fig. 00 → Fig. 01: the objects melt into the nurdles they are made of.
//
// Each object is packed with pellets on a hexagonal grid. A melt line rises
// through it: everything below the line has turned to loose nurdles, everything
// above is still solid object. The freed pellets fall and collect into a heap,
// and that heap is exactly what Fig. 01 draws — same pellets, same coordinates,
// same camera, so the two plates cross-fade with nothing left to move.
//
// Coordinates: shapes and the melt mask are in ARTWORK space (matching the SVG
// path data). Everything that falls is in SCENE space, which is artwork space
// lifted by SHIFT to leave the lower half of the frame for the pile.

const rand = (i, s) => {
	const v = Math.sin(i * 137.5 + s * 219.7) * 43758.5453;
	return v - Math.floor(v);
};

export const SHIFT = 44;
export const PILE_CX = 320;
export const PILE_CY = 384;

const ZOOM = 0.32;
export const WIDE = [0, 0, 640, 460];
export const CLOSEUP = [
	PILE_CX - (640 * ZOOM) / 2,
	PILE_CY - (460 * ZOOM) / 1.55,
	640 * ZOOM,
	460 * ZOOM
];

export const boxOf = (b) => b.map((v) => Number(v.toFixed(2))).join(' ');

// The three objects, as the boxes that make up their silhouettes. Simple
// rectangles are enough: once they are packed with pellets, it is the pellets
// that carry the shape.
export const ITEMS = [
	{
		key: 'bottle',
		x0: 92,
		x1: 168,
		top: 132,
		bottom: 320,
		rects: [
			[92, 214, 168, 318],
			[100, 186, 160, 214],
			[112, 152, 148, 186],
			[116, 134, 144, 152]
		]
	},
	{
		key: 'top',
		x0: 256,
		x1: 384,
		top: 150,
		bottom: 320,
		rects: [
			[290, 196, 350, 318],
			[290, 152, 350, 196],
			[258, 174, 290, 202],
			[350, 174, 382, 202]
		]
	},
	{
		key: 'battery',
		x0: 452,
		x1: 568,
		top: 182,
		bottom: 298,
		rects: [
			[454, 198, 566, 296],
			[470, 184, 488, 198],
			[532, 184, 550, 198]
		]
	}
];

const SPACING = 19;

// hexagonal packing inside each rectangle, so the fill reads as loose pellets
// rather than as a grid
function packItem(item, j) {
	const pts = [];
	let i = 0;
	for (const [x0, y0, x1, y1] of item.rects) {
		const rows = Math.max(1, Math.round((y1 - y0) / (SPACING * 0.88)));
		const dy = (y1 - y0) / rows;
		for (let r = 0; r <= rows; r++) {
			const y = y0 + r * dy;
			const inset = r % 2 ? SPACING / 2 : 0;
			const cols = Math.max(1, Math.floor((x1 - x0 - inset) / SPACING));
			const dx = (x1 - x0 - inset) / cols;
			for (let c = 0; c <= cols; c++) {
				const seed = j * 1000 + i++;
				pts.push({
					seed,
					ax: x0 + inset + c * dx + (rand(seed, 1) - 0.5) * 3,
					ay: y + (rand(seed, 2) - 0.5) * 3,
					r: 2.6 + rand(seed, 3) * 1.1
				});
			}
		}
	}
	return pts;
}

const PACKED = ITEMS.map((item, j) => packItem(item, j));
export const PILE_COUNT = PACKED.reduce((a, p) => a + p.length, 0);

/**
 * The heap the pellets collect into: spread along a baseline, stacked higher
 * toward the middle, then relaxed apart so none of them overlap.
 */
function makePile(n) {
	const HALF_W = 88;
	const RISE = 34;

	const nodes = Array.from({ length: n }, (_, i) => {
		const u = (i + rand(i, 1)) / n; // across the width, lightly jittered
		const x = PILE_CX - HALF_W + u * HALF_W * 2;
		const room = RISE * (1 - Math.abs(x - PILE_CX) / HALF_W) ** 0.75;
		return { i, x, y: PILE_CY - rand(i, 2) * room, r: 2.7 + rand(i, 3) * 1.1, tint: rand(i, 4) };
	});

	for (let pass = 0; pass < 90; pass++) {
		for (let a = 0; a < nodes.length; a++) {
			for (let b = a + 1; b < nodes.length; b++) {
				const p = nodes[a];
				const q = nodes[b];
				const dx = q.x - p.x;
				const dy = q.y - p.y;
				const d = Math.hypot(dx, dy) || 0.01;
				const min = p.r + q.r + 0.4;
				if (d >= min) continue;
				const push = (min - d) / 2 / d;
				p.x -= dx * push;
				p.y -= dy * push;
				q.x += dx * push;
				q.y += dy * push;
			}
		}
		for (const p of nodes) if (p.y > PILE_CY) p.y = PILE_CY; // nothing sinks
	}

	return nodes;
}

// drawn back to front, so the near pellets sit in front
export const PILE = makePile(PILE_COUNT).sort((a, b) => a.y - b.y);

// --- who lands where -------------------------------------------------------
// Each object claims the share of the heap under it, left to right, so the
// three streams collect side by side instead of crossing.
const BY_X = [...PILE].sort((a, b) => a.x - b.x);

export const MELT_START = 0.03;
export const MELT_SPAN = 0.52;
const RELEASE_LAG = 0.05;
const FALL = 0.36;

export const FALLERS = (() => {
	const out = [];
	let cursor = 0;

	PACKED.forEach((pts, j) => {
		const item = ITEMS[j];
		const share = BY_X.slice(cursor, cursor + pts.length);
		cursor += pts.length;

		// the heap fills from the bottom up, so the first pellets down sit lowest
		const slots = [...share].sort((a, b) => b.y - a.y);
		// and the pellets leave from the bottom of the object upward
		const order = [...pts].sort((a, b) => b.ay - a.ay);

		order.forEach((p, k) => {
			const slot = slots[k];
			// where the melt line has to reach before this pellet comes loose
			const u = (item.bottom - p.ay) / (item.bottom - item.top);
			const melt = MELT_START + u * MELT_SPAN;
			out.push({
				i: p.seed,
				x: p.ax,
				y: p.ay - SHIFT,
				r: p.r,
				melt,
				start: melt + RELEASE_LAG,
				end: melt + RELEASE_LAG + FALL,
				tx: slot.x,
				ty: slot.y,
				tr: slot.r,
				drift: (rand(p.seed, 7) - 0.5) * 16
			});
		});
	});

	return out;
})();

// how far the melt line has risen through a given object
export const meltLine = (item, spill) => {
	const t = Math.max(0, Math.min(1, (spill - MELT_START) / MELT_SPAN));
	return item.bottom - (item.bottom - item.top) * t;
};
