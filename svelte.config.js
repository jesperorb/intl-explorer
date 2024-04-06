import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import { preprocessMeltUI, sequence } from '@melt-ui/pp'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sequence([
		preprocess(),
		preprocessMeltUI(),
	]),

	kit: {
		adapter: adapter(),
		alias: {
			$paraglide: "./src/paraglide",
			$ui: "./src/lib/components/ui",
			$pages: "./src/lib/components/pages",
			$utils: "./src/lib/utils",
			$i18n: "./src/lib/i18n",
			$store: "./src/lib/store",
			$types: "./src/lib/types"
		}
	}
};

export default config;
