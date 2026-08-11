/**
 * Adds `is-visible` to the node the first time it enters the viewport, which
 * is what all the `.reveal` / `.draw` / `.fade` choreography keys off.
 *
 * If an accent colour is given, it is promoted to the document-level `--accent`
 * while the section is on screen, so the progress bar and card rules follow
 * whichever chapter you are reading.
 *
 * @param {HTMLElement} node
 * @param {{ accent?: string }} [options]
 */
export function inview(node, options = {}) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.classList.add('is-visible');
				if (options.accent) {
					document.documentElement.style.setProperty('--accent', options.accent);
				}
			}
		},
		{ threshold: 0 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
