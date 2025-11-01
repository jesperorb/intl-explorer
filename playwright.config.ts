import { devices, type PlaywrightTestConfig } from "@playwright/test";
import { localBaseURL } from "./tests/constants";

const config: PlaywrightTestConfig = {
	testDir: "tests",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	use: {
		baseURL: localBaseURL,
		headless: Boolean(process.env.CI),
		ignoreHTTPSErrors: true,
		permissions: ["clipboard-read"],
		locale: "en-US",
		trace: "on-first-retry"
	},
	webServer: {
		command: "pnpm dev",
		url: localBaseURL,
		reuseExistingServer: !process.env.CI
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
