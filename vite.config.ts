import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { defineConfig, mergeConfig } from 'vitest/config';

const config: UserConfig = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['highlight.js', 'highlight.js/lib/core']
	}
};

export default mergeConfig(
	config,
	defineConfig({
		test: {
			environment: 'jsdom',
			include: ['src/**/*.{test,spec}.ts']
		}
	})
);
