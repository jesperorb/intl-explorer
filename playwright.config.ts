import { devices, type PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	testDir: "tests",
	use: {
		headless: true,
		ignoreHTTPSErrors: true
	},
	projects: [
		{
			name: "Desktop Firefox",
			use: {
				...devices["Desktop Firefox"]
			}
		}
	]
};

export default config;
