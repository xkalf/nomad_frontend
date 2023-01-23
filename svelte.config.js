import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			out: 'build',
			precompress: false,
			envPrefix: ''
		})
	}
}

export default config
