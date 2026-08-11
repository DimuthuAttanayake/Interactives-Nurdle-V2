import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		// Fully static output — no server. build/ is gitignored: GitHub Actions
		// runs this build itself and hands the folder straight to Pages, so the
		// compiled site never enters version control.
		//
		// No base path is set on purpose: SvelteKit writes asset URLs relative
		// to the page (./_app/...), so the same build works at the domain root
		// and at github.io/<repo>/ without being rebuilt for either.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		})
	}
};

export default config;
