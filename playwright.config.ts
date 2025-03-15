import { devices, type PlaywrightTestConfig } from "@playwright/test";
import { localBaseURL } from "./tests/constants"

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
		locale: "en-US",
		trace: "on-first-retry"
	},
	...(Boolean(process.env.CI)
		? { webServer: undefined }
		: {
				webServer: {
					command: "pnpm dev",
					url: localBaseURL,
				}
			}),
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
