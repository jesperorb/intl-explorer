import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { defineConfig, mergeConfig } from "vitest/config";
import { paraglide } from "@inlang/paraglide-js-adapter-sveltekit/vite";

const config: UserConfig = {
	plugins: [
		sveltekit(),
		paraglide({
			project: "./project.inlang",
			outdir: "./src/paraglide"
		})
	],
	optimizeDeps: {
		include: ["highlight.js", "highlight.js/lib/core"]
	}
};

export default mergeConfig(
	config,
	defineConfig({
		test: {
			environment: "jsdom",
			include: ["src/**/*.{test,spec}.ts"]
		}
	})
);
