import { devices, type PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	testDir: "tests",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	use: {
		headless: true,
		ignoreHTTPSErrors: true,
		permissions: ["clipboard-read"],
		locale: 'en-US',
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: "Desktop Chrome",
			use: {
				...devices["Desktop Chrome"]
			}
		}
	]
};

export default config;
