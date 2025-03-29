import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { defineConfig, mergeConfig } from "vitest/config";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

const config: UserConfig = {
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
			strategy: ["url"]
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
