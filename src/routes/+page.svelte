<script>
	import '$lib/styles/nurdle.css';
	import '$lib/styles/article.css';
	import StoryStage from '$lib/components/nurdle/StoryStage.svelte';
	import ChartPlaceholder from '$lib/components/article/ChartPlaceholder.svelte';

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let docHeight = $state(1);

	const progress = $derived.by(() => {
		const h = docHeight - innerHeight;
		return h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
	});

	function measure() {
		docHeight = document.documentElement.scrollHeight;
	}

	$effect(() => {
		measure();
	});
</script>

<svelte:window bind:scrollY bind:innerHeight onresize={measure} onscroll={measure} />

<svelte:head>
	<title>How Tiny Plastic Polymers Pollute the World</title>
	<meta
		name="description"
		content="How primary plastics used to manufacture plastic products accidentally escape the supply chain and end up in rivers, oceans and beaches."
	/>
</svelte:head>

<div class="progress" style="width: {(progress * 100).toFixed(2)}%" aria-hidden="true"></div>

<div class="nurdle-story">
	<!-- COVER -->
	<header class="cover is-visible">
		<svg class="cover__mark reveal" width="52" height="46" viewBox="0 0 52 46" aria-hidden="true">
			<circle cx="26" cy="23" r="17" fill="var(--pearl)" />
			<ellipse cx="20" cy="17" rx="5.5" ry="3.4" fill="#fff" opacity="0.6" />
		</svg>
		<div class="cover__kicker reveal d1">Plastic Pollution</div>
		<h1 class="reveal d1">How Tiny Plastic Polymers Pollute the World</h1>
		<p class="dek reveal d2">
			How primary plastics used to manufacture plastic products accidentally escape the supply
			chain and end up in rivers, oceans and beaches.
		</p>
		<div class="cover__by reveal d2">By Dimuthu Attanayake</div>
		<div class="scroll-cue reveal d2"><span class="dot"></span> Scroll to begin</div>
	</header>

	<!-- every storyboard beat, on one stage -->
	<StoryStage />
</div>

<!--
  THE WRITTEN STORY — everything below the scrolly.

  The copy is the final draft (Attanayake_MSProject_0815.docx), body text only:
  it starts at the Diane Wilson lede and ends on the closing Tunnell quote. The
  title page and the sources section are deliberately not here.

  The three <ChartPlaceholder /> blocks are the slots waiting on real charts.
  When a chart is ready, swap the tag for the chart component and leave its
  <figure> wrapper in place so the title, caption and source line carry over.
-->
<article class="article">
	<div class="article__inner">
		<p class="lede">
			Every week, Diane Wilson, a fourth-generation shrimper, packs fishing nets and gear onto a
			fishing boat and goes out to the waterways of San Antonio Bay, Texas. Wilson no longer
			shrimps in these waters. Instead, almost every other day, the 80-year-old is scouring the bay
			water, the riverbeds, and the shores, for plastic pellets that escape the Union Carbide
			Seadrift Operations plant — a petrochemical complex, and the second-largest Dow facility in
			Texas — during its manufacturing process. She is searching to see if the tiny plastics — each
			roughly the size of a lentil — are now part of the waterways that serve fishing communities
			along the Texas coast.
		</p>

		<p>
			Wilson and others from San Antonio Bay Estuarine Waterkeeper — the grassroots
			non-governmental organization that Wilson founded in 2012 to protect the Lavaca, Matagorda
			and San Antonio Bay estuary ecosystem and watershed — have been scavenging the pellets, with
			fishnets and pool nets, from the waterways of San Antonio Bay, in Calhoun County, Texas,
			since August 2024.
		</p>

		<p>
			“These are the bays that we fished and crabbed and oystered, and now [we] are finding …
			pellets…,” Wilson says. She describes water from the bay as family — an old grandmother she
			is fighting fiercely to protect.
		</p>

		<p>
			The volunteers record the pellets they say are released from Seadrift, by storing them in
			garbage bags, as evidence for the ongoing legal case. They record the date, time, location
			and the weather on the day the pellets were collected.
		</p>

		<p>
			Weather has a large part to play in where the pellets appear, Wilson said “because when the
			weather changes, the tide changes, and [the nurdles] show up in another place.”
		</p>

		<p>
			Called “nurdles,” these plastic pellets are made of chemicals derived from refining oil and
			gas, and are the basic building blocks of plastic production. They are less than 5 mm in
			size, often resembling fish eggs because of their translucent white coloring. They are not
			intended to enter the environment, experts say, but Wilson has been finding thousands of them
			scattered around, every week.
		</p>

		<p>
			Because of their small size, nurdles remain elusive on the beaches, in riverbeds, and in
			marshes. Unlike other types of plastics, their size and color make efforts to remove them
			from the environment more challenging.
		</p>

		<p>
			“If somebody goes to the beach or a lake or river they're not looking for [nurdles], they are
			probably not going to notice them. They will notice the water bottles or the bags in the
			trees because they are bigger, but these are so small and they look natural,” said Jace
			Tunnell, the director of community engagement at Texas A&amp;M University-Corpus Christi's
			Harte Research Institute and founder of Nurdle Patrol, a global volunteer network cleaning
			nurdles.
		</p>

		<p>
			There are currently 31 different types of nurdles, according to Chapter 39 of the U.S.
			International Trade Commission's Harmonized Tariff Schedule. The nearly 50-page list of
			six-digit codes classifies nurdles for the purpose of import and export. Nurdles are
			transported from the manufacturing plants in the United States, the Middle East, China and
			others to destinations around the world, to be turned into different products. Polypropylene
			nurdles make bottle caps, microwave-safe containers, and plastic straws. Polyethylene
			terephthalate (PET) nurdles make water bottles and polyamide nurdles make nylon clothing.
			Many parts of cars are now made of different types of nurdles. Polypropylene makes battery
			casings. Polycarbonate is used for transparent parts such as headlamp lenses. Polyamide makes
			engine covers, and so on.
		</p>
	</div>

    <div class="article__inner">
		<p>
			These polymers are also considered one of the most “pervasive forms” of microplastic
			pollution globally, according to the Great Nurdle Hunt, a global voluntary network
			documenting nurdle pollution, and a citizen science project of Fidra, the U.K.-registered
			environmental charity. An estimated 445,970 metric tons of nurdles are lost to the
			environment each year, according to a 2024 study published by Galgani and Rangel-Buitrago in
			the Journal of Hazardous Materials.
		</p>

		<p>
			Research has shown that nurdles are highly absorbent and disintegrate into smaller
			microplastics. Marine pollution and environmental harm can last for hundreds of years,
			Galgani and Rangel-Buitrago's research shows.
		</p>

		<p>
			Marine life is known to consume nurdles, because in shape and size, these resemble seafood.
			One-quarter of all seabird species from around the world are known to ingest plastic debris,
			with those of polyethylene (a type of nurdles) in particular remaining in birds' digestive
			tracts for 10 to 15 months, according to a report by the U.S. Environmental Protection Agency
			(EPA). They also have the potential to carry disease-causing bacteria such as E. coli or
			vibrio as they move from place to place, according to a study published in the Marine
			Pollution Bulletin in 2019.
		</p>

		<p>
			“The question is, do those chemicals come off of the plastics through the stomach lining, and
			then into the muscle tissue inward?” Tunnell asked. If the answer is “yes” it would mean that
			some of these chemicals are ingested while consuming fish. Right now, there is a gap in
			concerted, long-term efforts to establish health impacts, if there are any from coming into
			contact with nurdles, either directly or indirectly.
		</p>

		<p>
			“These things are kind of hard to tease out because we're exposed to so many things over a
			lifetime. Same with the fish, fish eat a lot of stuff too,” Tunnell says.
		</p>

		<h2>Nurdles escape from the stormwater outfalls</h2>

		<p>
			Wilson blames the accidental nurdle spills at the manufacturing plants on “bad housekeeping,”
			because when not cleaned up, nurdles spilled during factory production escape via stormwater
			outfalls when it rains. In December 2025, she and the environmental advocacy legal group
			Earthjustice filed a notice of intent to sue the Seadrift facility saying such failures are
			polluting San Antonio Bay.
		</p>

		<p>
			The State of Texas sued Dow in February 2026 — just months after Wilson's notice — for
			violating the Texas Water Code, the Texas Solid Waste Disposal Act and other regulations and
			permits. Lauren Godshall, senior attorney for Earthjustice and lead counsel for Wilson, filed
			an intervention into the state court enforcement action. Godshall said she wants the court to
			include additional dates that Wilson's group located nurdles in the bay outside of the
			Seadrift facility currently not included in the state filings. Godshall aims for Earthjustice
			and Wilson “to participate in settlement talks, if any occur.”
		</p>

		<p>
			The Texas Attorney General did not respond to requests for comment about its action against
			Dow and the Seadrift facility.
		</p>

		<p>
			Under the current Texas permit system for instance, Seadrift is allowed to discharge trace
			amounts of floating solids under Texas Pollutant Discharge Elimination System.
		</p>

		<p>
			“If you let a nurdle out, it's fine. The problem is when you let a lot of nurdles out every
			single day. We thought we might have more of a fight about the definition of trace, but
			because the nurdles are coming out in such large numbers, that really hasn't come up,”
			Godshall said.
		</p>

		<p>
			But as Godshall points out, nurdles are not a waste product. “They are the primary plastic,
			the actual product,” which she said makes these spills “tricky.”
		</p>

		<blockquote>
			You would think [the manufacturer] would do a better job … making sure that the product gets
			to the customer, not thrown on the ground, or in the ocean in large numbers.
			<cite>Lauren Godshall, senior attorney, Earthjustice</cite>
		</blockquote>

		<p>
			Dow Chemical Company and Union Carbide Seadrift Operations did not respond to repeated
			requests for comment about the ongoing legal action on nurdle spills from their facility.
		</p>

		<p>
			This is not the first time Wilson is fighting against nurdle spills from the factories on the
			Gulf Coast. In 2019, Wilson and her coalition won a $50 million settlement from Formosa
			Plastics, in Lavaca Bay in Texas, neighboring the Seadrift plant, after suing it for illegal
			discharge of plastic pellets.
		</p>

		<p>
			Formosa voluntarily agreed to comply with “zero discharge” of all plastics, but on March 31,
			2026, the Texas Commission on Environmental Quality (TCEQ) issued a draft renewal of
			Formosa's wastewater permit, without including the zero-discharge limit.
		</p>

		<p>
			The decision by the TCEQ baffled Godshall. “We think it's pretty appalling that a corporate
			actor could actually try to do the right thing, and the state can be like, nope … you have to
			pollute a little,” she said.
		</p>

		<p>
			Responding to a request for further comment on its permit renewal process and ongoing efforts
			to mitigate nurdle spills at its Point Comfort facility on Lavaca Bay, Amy Blanchett,
			assistant manager of communications and new business development at Formosa Plastics
			Corporation, Texas, said, "In regards to these questions, please contact the Texas Commission
			on Environmental Quality."
		</p>

		<p>
			TCEQ did not respond to requests for comment on Formosa's permit, or about its ongoing case
			with the Seadrift facility.
		</p>

	<!-- CHART 1 -->
	<h2>U.S. Sites Where Nurdle Spills Prompted Legal Action</h2>

<iframe
  title="U.S. Sites Where Nurdle Spills Prompted Legal Action"
  aria-label="Locator map"
  id="datawrapper-chart-1V2dt"
  src="https://datawrapper.dwcdn.net/1V2dt/1/"
  scrolling="no"
  frameborder="0"
  style="width: 0; min-width: 100% !important; border: none;"
  height="519"
  data-external="1">
</iframe>

<script type="text/javascript">
(function() {
  window.addEventListener("message", function(event) {
    if (event.data["datawrapper-height"] !== undefined) {
      var iframes = document.querySelectorAll("iframe");

      for (var i in event.data["datawrapper-height"]) {
        for (var j = 0, iframe; iframe = iframes[j]; j++) {
          if (iframe.contentWindow === event.source) {
            var height = event.data["datawrapper-height"][i] + "px";
            iframe.style.height = height;
          }
        }
      }
    }
  });
})();
</script>

		<h2>Regulating nurdle spills</h2>

		<p>
			The existing regulations mostly target releasing waste or effluents to the environment during
			the manufacturing process. In 2026, the U.S. federal Environmental Protection Agency
			announced that it would include microplastics as a priority contaminant group in its effort
			“to safeguard the nation's drinking water from microplastics, pharmaceuticals, forever
			chemicals, and dozens of other contaminants.” The agency did not respond to requests for
			further comment.
		</p>

		<p>
			In March, Sen. Dick Durbin (D-Ill.), reintroduced Senate Bill 4181, the Plastic Pellet Free
			Waters Act, which, if it comes into force, would prohibit the discharge of plastic pellets by
			the “sources that make, use, package, or transport” them.
		</p>

		<p>
			At the state level, California has been particularly vigilant. Since 2008, California has
			regulated facilities that manufacture, transport and handle pre-production plastics with
			Assembly Bill 258.
		</p>

		<p>
			Outside of the United States, last year, the European Union adopted Regulation (EU) 2025/2365
			on preventing plastic pellet losses, covering all operators handling five metric tons or more
			of pellets per year, as well as carriers and maritime transport. It also requires risk
			management plans covering packaging, handling, staff, training and equipment, with clean-up
			obligations after accidental losses.
		</p>

		<p>
			Responding to the request for further comment, Maëlys Dreux, a press officer for environment
			and the New European Bauhaus at the European Commission's Spokesperson's Service, referred to
			a press release that said, “By 17 December 2026, the Commission will develop
			awareness-raising and training materials to support the Regulation's implementation and will
			request European standardisation organisations to prepare harmonised standards for estimating
			quantities of losses.”
		</p>

		<p>
			Citizen-led efforts against these industrial nurdle spills are growing in number. In 2020,
			Charleston Waterkeeper and the South Carolina Coastal Conservation League sued Frontier
			Logistics, L.P., a firm headquartered in La Porte, Texas, over nurdles spilled while they
			were being packaged at its packaging facility in Union Pier Terminal, South Carolina.
			According to the complaint filed in U.S. District Court in South Carolina in 2020, "in the
			summer of 2019, residents of Sullivan's Island and Isle of Palms, South Carolina began
			discovering BB-sized plastic pellets washing up along the shoreline of their beaches."
			Frontier Logistics denied that its facility was the source of nurdles, but agreed to
			contribute $1 million to Charleston Harbor environmental projects to settle the claims,
			according to court papers. The operation has since relocated to North Charleston.
		</p>

		<p>
			Frontier Logistics LP and its defense firm, Willoughby &amp; Hoefer, P.A., did not respond to
			questions on the nurdle spills and updates on how the $1 million settlement was distributed
			for environmental projects.
		</p>

		<p>
			In 2025, Styropek facility in Monaca, in Beaver County, Pennsylvania reached a settlement to
			pay $2.6 million, of which $2 million would be spent on cleanup of plastic pellets, after
			being sued by the watchdog groups, PennEnvironment and Three Rivers Waterkeeper for violating
			the federal Clean Water Act over nurdle spills. The suit was filed for nurdle spills in
			Raccoon Creek and the Ohio River, and the state regulator, the Pennsylvania Department of
			Environmental Protection, had joined the suit in a legal intervention to say that Styropek
			violated two state laws by discharging nurdles to the environment.
		</p>

		<p>
			The Pennsylvania Department of Environmental Protection did not respond to questions about
			the intervention or whether it would continue legal action on any future nurdle spills.
		</p>

		<p>
			Dr. Heather Hulton VanTassel, executive director of Three Rivers Waterkeeper, said their
			investigation of the nurdles started by “accident.” One day, the Waterkeepers were monitoring
			a nearby Shell cracker plant that was manufacturing pellets. They pulled in a net to see a
			bunch of leaves, with nurdles trapped in their folds.
		</p>

		<p>
			“These were much, much smaller,” she said about the tiny plastic pellets, adding that their
			usual nets were not capturing nurdles smaller than 5 mm in diameter, and these would have
			gone unnoticed if not for the leaves. The Waterkeepers documented the spills for a year
			starting September 2022 before taking legal action in December 2023, according to VanTassel.
		</p>

		<p>
			Styropek's permit allowed no suspended solids — and nurdles floating in the water are, in
			fact, suspended solids, VanTassel said. Styropek's settlement included a requirement to
			update its system to achieve zero plastic pellet loss, VanTassel says.
		</p>

		<p>“Otherwise, they're getting automatic fines for each plastic pellet released,” she says.</p>

		<p>
			Responding to questions about the upgrades to its system, Alpek, the Mexican petrochemical
			company that owns Styropek, referred to a press release committing to “remediation of
			plastics in Raccoon Creek and for further remediation and cleanup efforts to Raccoon Creek
			and along the Ohio River,” including “measures to prevent further discharge.”
		</p>

		<h2>Nurdle spills during transportation</h2>

		<p>
			Jamie Clarkson, a project officer at Fidra working on nurdle pollution, says that chronic
			pollution occurs at all points throughout the plastic pellet supply chain. This includes
			nurdle production, transportation by land and sea, conversion into plastic products,
			recycling, and during handling at all points in between. These are ongoing spills over a long
			period of time, where nurdles accumulate in the environment, according to him.
		</p>

		<p>
			Acute spills release a large number of plastic pellets into the environment at one time, he
			adds.
		</p>

		<p>
			Nurdle spills also take place away from the manufacturing facilities. They can spill along
			the value chain, during loading, rail transport and during shipping.
		</p>

		<p>
			Tunnell of Texas A&amp;M said that in the U.S., a small number of nurdles are released during
			rail transport, during loading and when the nurdles are being inspected.
		</p>

		<p>
			“Some of the nurdles melt [during transportation] because of the friction,” Tunnell said,
			creating thin strands of plastics called angel hairs.
		</p>

		<p>
			These angel hairs trap nurdles inside rail cars, but mostly remain hidden, resulting in silos
			carrying nurdles not being properly sealed during the trip back to the production site.
			“Whenever it starts going back down the railroad, it's bouncing around, and all those nurdles
			are just falling out," he said.
		</p>

		<p>
			Accidents during transportation are a source of acute spills, Clarkson said, releasing a
			large volume of nurdles into the environment within a shorter span of time and this happens
			during rail transportation.
		</p>

		<p>
			In 2022, a Norfolk Southern train collided with a truck near Harmar Township in Allegheny
			County, near Pittsburgh, and cars that contained nurdles derailed and fell into the Guys Run,
			a tributary of the Allegheny River, the main drinking water source in Pittsburgh. VanTassel
			says if the nurdles remain in the water long enough to break down into smaller particles,
			these have the potential to end up in tap water.
		</p>

		<p>
			Nurdles spread along the river because the multi-tier boom system set up by Norfolk Southern
			could not contain the spill because it was opened to let the boats cleaning up the derailment
			through, according to Three Rivers Waterkeeper's VanTassel, who says that there were nurdles
			“all over” the boats that were going in and out. Norfolk Southern did not respond to requests
			for comment on the spill.
		</p>

		<p>
			Eventually, the nurdles were vacuumed, but the “damage was already done,” because they were
			already released downstream, VanTassel said.
		</p>

		<p>
			“Unfortunately, you still find those nurdles today, both at the derailment site and
			downstream,” she added.
		</p>

		<p>
			Nurdles produced elsewhere arrive in western New York via tractor trailers, to be blown or
			molded into hollow plastic containers such as water bottles, at the secondary manufacturing
			plants scattered along the Niagara river tributaries, Elizabeth Cute, senior program manager
			for Buffalo Niagara Waterkeeper, says. Buffalo Niagara Waterkeeper has been recovering
			nurdles for years, she said, sometimes in partnership with locals and student volunteers from
			the University at Buffalo in upstate New York, along the Niagara river and tributaries.
			Unlike nurdles spotted in most other locations, some of the nurdles they find are opaque,
			colored brown, yellow, blue, green and sometimes even red, with some sporting a more
			cylindrical shape, according to the images shared by Cute.
		</p>

		<p>In 2025, they collected 10,000 nurdles between May and October, Cute said.</p>

		<p>
			But she also says that it is difficult to determine an exact source for the nurdles. She said
			the expanse of the pellet terrain is vast: the Niagara river takes water from the Great Lakes
			system spanning Illinois, Indiana, Michigan, Minnesota, New York, Ohio, Pennsylvania,
			Wisconsin and parts of Canada, all locations with plastic manufacturing facilities.
		</p>

		<p>
			“We could just be receiving a ton from upstream sources that are out of state,” Cute says.
			“There are a lot of unknowns.”
		</p>

		<h2>Nurdles spilled into the oceans</h2>

		<p>
			Maritime transport is considered the biggest source of acute nurdle spills and transboundary
			pollution globally, with at least seven spills from 2020 to 2026. Nurdles are among the
			largest sources of microplastic pollution in the ocean, second only to tire dust.
		</p>
	</div>

	<!-- CHART 2 — map of maritime nurdle spills, 2020–2026 -->
	<figure class="figure figure--wide">
		<div class="figure__head">
			<p class="figure__title">PLACEHOLDER: chart two title</p>
			<p class="figure__standfirst">PLACEHOLDER: one line on what this chart shows.</p>
		</div>

		<ChartPlaceholder label="Chart 2" height={460} />

		<figcaption>
			PLACEHOLDER: caption.
			<span class="source">Source: PLACEHOLDER</span>
		</figcaption>
	</figure>

	<div class="article__inner">
		<p>
			In 2021, the MV X-Press Pearl, a Singapore-flagged container ship, caught fire off the
			western coast of Sri Lanka, and released 1,680 metric tons of plastic pellets, the largest
			ever plastic spill from a maritime disaster to date according to the United Nations. A
			staggering number of nurdles washed up on the Sri Lankan beaches and also spilled into the
			Indian Ocean.
		</p>

		<p>
			The consequences of the fire extended beyond the initial spill. Following the complex
			chemical fire on board the X-Press Pearl, with hazardous chemicals such as epoxy resin,
			caustic soda and nitric acid, and metals such as copper, were detected in burnt lumps of
			nurdles, according to a 2022 report by International Pollutants Elimination Network (IPEN), a
			global network of NGOs working to eliminate hazardous chemicals and pollutants, and Centre
			for Environmental Justice, an environmental justice watchdog in Sri Lanka. Another study
			published in ACS Environmental Au, in 2021, noted that during the fire, the nurdles were
			exposed to "carcinogenic combustion products" such as polycyclic aromatic hydrocarbons
			(PAHs), and benzotriazole UV stabilizers, potentially making them carriers of carcinogens and
			other pollutants.
		</p>

		<p>
			In 2025, the Supreme Court of Sri Lanka found the owner, operator, and local agent of the MV
			X-Press Pearl liable for environmental and economic damage. While the courts ruled for an
			interim payment of $1 billion for the damage caused by the ship disaster, X-Press Feeders,
			the ship's operator, refused to pay the initial installment of $250 million, with its CEO
			Shmuel Yoskovitz calling the ruling a “dangerous precedent” for the shipping industry.
		</p>

		<p>
			Yoskovitz did not personally respond to requests for further comment. Instead, Andrew Leahy,
			director, Asia-Pacific of MTI Pte Ltd, X-Press Feeders' spokesperson said in a statement,
			“X-Press Feeders and our insurers carefully considered the July ruling of the Supreme Court
			of Sri Lanka and were unable to make the initial payment because liability is not accepted
			and the ruling leaves open the possibility of additional and potentially unlimited
			compensation orders.” The statement added that $170 million had already been paid by the
			company toward wreck removal, environmental remediation and compensation claims.
		</p>

		<p>
			Leahy's statement further said that the judgment by the Sri Lankan court “relied heavily on a
			flawed environmental damage report,” produced by the Marine Environment Protection Authority
			(MEPA) of Sri Lanka. MEPA did not immediately respond to requests for comment.
		</p>

		<p>
			More recently, large swaths of nurdles arrived on the beaches of northeast England after a
			ship collision on July 19, 2026, at the Port of Tyne, South Shields.
		</p>

		<p>
			Clarkson of Fidra, who was on the ground at the Port of Tyne, says that the nurdles are
			“spreading far from the original source.” He says that the spill poses a major risk to
			wildlife and protected areas, referring to video footage of seabirds picking up nurdles with
			their beaks.
		</p>

		<p>
			In 2025, millions of pellets ended up on the Norfolk coast in the United Kingdom when a cargo
			ship collided with a U.S.-registered tanker off East Yorkshire. Also in 2025, ship accidents
			near southern India released large volumes of nurdles, including bags of nurdles that were
			intact, that ended up on the South Indian and Sri Lankan beaches. There was a spill in South
			Africa in 2020 that released 175 metric tons of nurdles. In 2023, nurdles believed to be from
			shipping containers lost in the Atlantic Ocean covered the coastline of Brittany, France. The
			French government called it an “environmental nightmare” and sought legal action. In 2024,
			1,000 sacks of nurdles from a Liberian-flagged ship ended up on the Galician coast in Spain,
			according to media reports.
		</p>

		<p>
			Tunnell says these frequent nurdle spills stem from the increased production of raw plastics
			over the years, while studies say that “irregularities” of the plastic supply chain are
			considered the source of the increasing number of nurdle spills since the 1970s.
		</p>
	</div>

	<!-- CHART 3 — global production of primary plastics, 1950–2030 -->
	<figure class="figure figure--wide">
		<div class="figure__head">
			<p class="figure__title">PLACEHOLDER: chart three title</p>
			<p class="figure__standfirst">PLACEHOLDER: one line on what this chart shows.</p>
		</div>

		<ChartPlaceholder label="Chart 3" height={420} />

		<figcaption>
			PLACEHOLDER: caption.
			<span class="source">Source: PLACEHOLDER</span>
		</figcaption>
	</figure>

	<div class="article__inner">
		<p>
			“If you look [at data] just over the last 10 years, it's really ramped up, and supposed to
			double in like the next 20 years, so [the spills] are only going to get worse,” he said. Data
			from Our World in Data shows that production of primary plastics grew from 2 million metric
			tons in 1950 to 460 million metric tons in 2019. Their production is expected to reach 589
			million metric tons by 2030, according to projections from the Organisation for Economic
			Co-operation and Development (OECD).
		</p>

		<p>
			Part of the reason for maritime nurdle spills lies in packaging, according to advocacy
			groups. This is because nurdles in packaged form are not classified as “harmful substances”
			by international shipping regulations [Annex III of the International Convention for the
			Prevention of Pollution from Ships (MARPOL), concentrating on preventing pollution by harmful
			substances carried by sea in packaged form], Dr. Stephanie Lavelle, waste and marine litter
			expert of GRID-Arendal, says.
		</p>

		<p>
			“Not unless contaminated. So, they are not subject to strict packaging, labeling, or
			transport requirements,” she says.
		</p>

		<p>
			In a recent development, the Marine Environment Protection Committee (MEPC), a key
			environmental committee under the International Maritime Organization (IMO), agreed to
			develop a mandatory code for maritime transport of pellets in containers, under MARPOL Annex
			III and/or SOLAS. Since 2022, the United Nations has also been attempting to draft a global
			plastics treaty with the aim to regulate how to address accidental spills, and also to reduce
			plastic production at the source. But negotiations have made little headway.
		</p>

		<p>
			Tunnell says that getting the word out on what these nurdles are and what their impacts are,
			would be the first steps toward mitigating these spills.
		</p>

		<blockquote>
			If people haven't heard of it, why would they care about it? The plastics industry doesn't
			want you to know about it, and it is not good for them to show that they are discharging
			their product out into the environment.
			<cite>Jace Tunnell, Harte Research Institute</cite>
		</blockquote>
	</div>
</article>
