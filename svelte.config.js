import adapter from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$paraglide: "./src/paraglide",
			$ui: "./src/lib/components/ui",
			$pages: "./src/lib/components/pages",
			$utils: "./src/lib/utils",
			$i18n: "./src/lib/i18n",
			$store: "./src/lib/store",
			$types: "./src/lib/types",
		}
	}
};

export default config;
