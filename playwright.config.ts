import { devices } from "@playwright/test";

const config = {
	testDir: "tests",
	forbidOnly: !!process.env.CI,
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"]
			}
		}
	]
};

export default config;
