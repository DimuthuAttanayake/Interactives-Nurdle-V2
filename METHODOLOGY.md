# Nurdle Spills: Methodology

GitHub repo: https://github.com/DimuthuAttanayake/Interactives-Nurdle-V2
Scrolly (GitHub Pages): https://dimuthuattanayake.github.io/Interactives-Nurdle-V2/

## Introduction

Almost every plastic object starts as a nurdle. A nurdle is a translucent
pellet about five millimetres across, about the size of a lentil, made from the
leftover chemicals of oil and gas refining. Nurdles are shipped by rail and sea
to factories that melt them into bottles, polyester clothing, car battery
covers. They are handled in bulk, which means they are also lost in bulk,
through spillage at loading points, through derailments, and through container
ships going down.

Once a nurdle is in the water it does not decompose. Sunlight and wave action
fracture it into smaller and smaller pieces, so one pellet becomes a scatter of
microplastics that can last longer than a human lifetime. Fish and seabirds eat
them at both sizes.

For my Master's project I am investigating these spills, and I wanted a visual
that carried the whole sequence: what a nurdle is, where it comes from, how it
escapes, and how far it has already travelled. This is that visual. It is a
scroll-driven story that starts with three ordinary plastic objects dissolving
into the pellets they are made from, follows those pellets through manufacture,
rail and shipping to a derailment and a wreck, into the ocean and into animals,
and then lifts the same pellets off the water to assemble a globe of real
sighting records.

The question I set myself was whether the pellets could stay continuous. Not a
set of illustrations followed by a chart, but one object that you follow from a
factory floor to a dot on a map.

## Data sources

The primary source is Nurdle Patrol, a global volunteer organisation whose
members survey shorelines and log what they find. The dataset is 8,728
pellet-sighting records, each with a latitude, a longitude and an amount
collected. I sliced it to the sightings and the coordinates only.

Forty-nine of those records have out-of-range coordinates, a latitude beyond 90
degrees or a longitude beyond 180, which are clearly data-entry errors. They are
dropped when the file loads. That leaves 8,679 valid sightings. Every one of
them recorded at least one pellet, because surveys that found nothing were
filtered out before the file reached me, so the map shows presence and never
absence.

The coastlines come from the Natural Earth 110m land file, served as TopoJSON.
There is no basemap service and no API key anywhere in the project.

## Scope

The globe shows where volunteers looked and found something. It is not a survey
of where nurdles are. Nurdle Patrol's coverage is concentrated in the Americas.
About 98.6 percent of the records sit between 170 degrees west and 30 degrees
west, most of them on the US Gulf coast, near the petrochemical plants that make
the pellets in the first place. The empty stretches of the globe are mostly
places nobody has walked with a bucket.

That concentration drove one specific decision, described below.

## The stage

The whole piece is a single sticky full-screen stage driven by one scroll
progress value running from 0 to 1. Two layers share it. The first is eight
hand-drawn SVG scenes that cross-fade. The second is a canvas of 300 pellets
that persists through all of them.

The story is written as a list of 21 beats in one file. Each beat says which
scene is on stage, where the pellets live, and, for the globe beats, the
longitude and latitude to rotate to. Together the beats occupy 26 viewports of
scrolling. A beat can claim extra viewports when the transition into it needs
room to be read, which is why two of them are slower than the rest: the objects
emptying into a handful of pellets, and the pellets lifting off the water into
the globe. Each beat holds still for part of its own block and eases between
holds, so every transition starts and ends at rest instead of snapping.

Scroll position is smoothed toward its target at nine percent per frame, which
takes the judder out of trackpad scrolling. If the reader has reduced motion
turned on, the smoothing is skipped.

## The scenes before the globe

Most of the piece is not the globe. Eight scenes come first, all drawn as vector
illustrations in the same 640 by 460 coordinate space so the camera can move
between them without anything jumping. Each one carries a text description for
screen readers.

The opening scene is the one that had to work hardest, because it makes the
argument that a bottle and a nurdle are the same material. Three objects are
drawn as plain rectangles: a water bottle, a polyester top and a car battery
cover. Simple shapes are enough, because they are then filled with pellets on a
hexagonal grid, 157 of them in total, and it is the pellets that carry the
shape. As the reader scrolls, a melt line rises through each object. Everything
below the line has turned into loose pellets and falls; everything above it is
still solid. The melt begins about three percent into the beat and takes just
over half of it.

The falling pellets collect into a heap, and the heap is built rather than
drawn. Pellets are spread along a baseline with more room to stack toward the
middle, and then a relaxation runs ninety passes over them, pushing apart any
two that overlap and never letting one sink below the floor. They are drawn back
to front so the near ones sit in front. Each object claims the share of the heap
directly beneath it, left to right, so the three streams collect side by side
instead of crossing, and pellets leave from the bottom of the object upward
while the heap fills from the bottom up, which is roughly how a real pile would
form.

The second scene is that same heap, at the same coordinates, with the camera
pushed in. Nothing moves between the two. They cross-fade, so the pellets you
watched fall are the pellets you are now looking at closely. Then a dimension
line draws itself across one pellet and labels it five millimetres.

The refinery scene keeps its flare still and moves nurdles through the polymer
plant, so the eye goes to the product rather than the fire. The journey that
follows, from plant to rail to ship, is not three drawings. It is one tall
drawing with the camera panning down it through three stops, so the reader
follows a continuous route instead of watching three separate illustrations
appear. The two accidents are a hopper tipping off the track, with sixteen
pellets spilling out one after another, and a listing container ship with
eighteen.

The ocean scene is one drawing revealed in three stages. First the pellets reach
the water. Then fish and birds come in and take them. Then the parent pellet
shrinks from its full size to about a third while fragments appear around it,
which is the fragmentation described at the top of this document happening on
screen.

During the two accident scenes the canvas pellets are hidden, because each of
those scenes spills its own. The canvas field only takes over at the point where
the pellets lift off the water and become the globe.

## How the spill becomes the map

The join between the ocean and the globe is the hinge of the whole piece, so it
is worth describing on its own.

There is one array of 300 pellets and it never changes length. What changes is
where those pellets are told to be. Each named layout, the loose scatter, the
ocean, the globe, is simply a different set of target positions for the same 300
slots. On every frame the draw loop takes slot number one from the layout being
left and slot number one from the layout being approached, and interpolates the
position, the radius and the opacity between them, using the eased scroll value
as the mix. Nothing is created and nothing is destroyed at the boundary. A small
sine drift is added on top so the pellets breathe slightly rather than sitting
dead still, and that drift is switched off for readers who have asked for
reduced motion.

What gives this meaning is what sits in each slot. The globe layout for a given
slot is the projected position of that slot's sighting from the stratified
sample. So the pellet drifting in the water at slot forty lands on the real
coordinates of sighting forty. Every drifting pellet has one destination that
belongs to it, which is why the assembly reads as a gathering rather than as one
picture dissolving into another. It is also why this transition is given three
viewports of scrolling and only a short pause at either end, so that most of
that block is the movement itself and the reader can actually watch it happen.

There is no settled name for this. The closest established idea is object
constancy, Mike Bostock's term for keeping a mark's identity stable across a
transition so that the viewer can follow it, and the academic framing is staged
animated transitions, from Heer and Robertson in 2007. In practice people call
it a particle morph. I would describe it as a particle morph with object
constancy, but the property matters more than the label: the same pellets that
spilled off the ship are the pellets that become the data.

## Sampling

The pellets you follow through the story are real sightings, but they could not
be a straight sample. Because 98.6 percent of the records are in the Americas, a
proportional sample of 300 leaves the globe empty whenever it turns away from
the Gulf. You would scroll to Zanzibar and find nothing there.

So the sample is stratified. Records are grouped into twelve bands of 30 degrees
of longitude, shuffled within each band, and then drawn one band at a time in
rotation until 300 are collected. Sparse regions contribute everything they
have, and dense ones make up the remainder. Every particle is still a real
record and nothing is invented, but the sample is a tour rather than a measure
of density.

The real density is drawn underneath. All 8,679 sightings render as a static
field of small pale dots, so the Gulf coast reads as the dense mass it is, while
the 300 moving pellets keep the story readable.

## Design decisions

I used an orthographic projection drawn to canvas rather than SVG. The globe
redraws every frame while it rotates, and at around 9,000 points SVG would mean
touching 9,000 DOM nodes per frame. Canvas draws them all in one pass. I could
do this because I do not need to animate individual dots as separate elements.
Claude recommended this approach.

Rotation eases the short way around. Longitude differences are normalised to
between minus 180 and 180 before interpolating, so moving from Alaska to Greece
does not spin the globe the long way across the Pacific.

Points on the far side of the globe are pushed out to the silhouette. A point on
the back projects to a mirrored position inside the disc, which would look like
a sighting floating over the wrong hemisphere. Instead those points sit on the
rim at low opacity. The mass of particles you have been following is conserved,
and it reads as points wrapped around the back rather than half the globe
blinking out.

The illustrations are geometry rather than artwork. Every object is built from
rectangles, circles and paths positioned in code, which is more laborious than
drawing them, but it means the pellets inside an object are real coordinates
that can be released and moved. An imported illustration could not melt.

The background is near-black with a single accent colour. The pellets are pale
and translucent, and a dark field is what makes them read as the thing itself
rather than as markers. Tour stops are lit like a bulb, with a soft bloom, a
yellow body and a white centre, because a flat bright circle reads as an
interface pin instead of a place. I am still thinking through the colour.

## Trial and error

The coastlines disappeared on a large monitor. They were drawn at a fixed 0.5
CSS pixels in a low-contrast grey. On a retina laptop that lands on exactly one
device pixel and looks crisp. On a large external display at a device pixel
ratio of 1 it spreads across one pixel at half opacity and vanishes, and the
globe is bigger on that screen, so the same hairline has to carry a much longer
coast. Line widths now scale with the radius of the globe and are never allowed
below one real device pixel, and the grey was lightened, though kept dimmer than
the sighting dots so it does not compete with them.

The scroll text was desktop-sized on phones. It was set to a clamp with a
minimum of 1.28rem and a middle term of 1.65vw. That middle term only reaches
the minimum at about 776 pixels wide, so every phone got the largest size over a
globe that had shrunk to fit the screen, and the text covered the map. The type
now scales properly through the mobile range, and below 640 pixels the card
drops to the bottom of the screen instead of sitting over the globe.

The first two deploys failed. The project started from a class template that
included a demo gallery importing a Mapbox token from the environment. My
machine had an untracked env file defining that variable, so the build passed
locally, but the GitHub Actions runner had no such file and the build died on a
missing export. The gallery had nothing to do with this story, so I removed it,
along with a stale prebuilt docs folder the template carried.

## Verification

I checked the record counts against the source file rather than trusting the
loader: 8,728 in, 49 dropped, 8,679 drawn, and the 98.6 percent figure is
calculated from the data rather than estimated. Every tour stop's coordinates
are defined once, in the beat list, and both the pulsing marker and the copy
read from that same list, so the marker and the place name cannot drift apart. I
reproduced the CI environment locally by moving my env file aside and
rebuilding, which confirmed the deploy fix before I pushed it.

## Tools

This is built in SvelteKit with Svelte 5, using D3 for the projection, the geo
path, easing and grouping, and topojson-client for the coastlines. Rendering is
one HTML canvas plus inline SVG scenes. The site is compiled to static files and
deployed to GitHub Pages by a GitHub Actions workflow that runs on every push,
so nothing built is committed to the repository. Asset paths are relative, which
is what lets the same build work at a domain root and at a github.io sub-path
without reconfiguring anything.

I used design inspiration from a prototype I built earlier in plain HTML. I used
Claude, Anthropic's AI assistant, for the canvas morph system, the sampler, the
device pixel ratio fix and the deployment, and to debug the build failures,
which was more help than I would have liked. The editorial decisions, the
structure of the story and the copy are mine.

## Limitations

The dataset is crowdsourced and geographically lopsided, so the globe measures
volunteer effort as much as it measures pollution. An absence of dots means
nobody surveyed there, not that the coast is clean. The 300 moving pellets are a
tour and should not be read as density, which is what the field underneath is
for. There is no time dimension, because the sightings are pooled, so the piece
cannot show whether the problem is growing. Amounts collected are in the data
but are not shown: every sighting is one dot whether it was two pellets or two
thousand. The coastline file is fetched from a public CDN when the page loads,
so the land outlines depend on that host staying up. The written article below
the scrolly is still placeholder text.

## Conclusion

The piece does what I wanted structurally. One pellet, followed from a refinery
to a dot on a globe, with no break between the explanation and the evidence.
What it does not do yet is quantify. The next step is the time dimension, since
sightings by year would show whether detections are rising or whether volunteer
numbers are, and then joining spill locations to specific documented incidents,
so that the globe can say not just where the nurdles are but what they came
from.
