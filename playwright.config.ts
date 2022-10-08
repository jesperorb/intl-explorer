import { devices } from '@playwright/test';

const config = {
	testDir: 'tests',
	forbidOnly: !!process.env.CI,
	use: {
		headless: true,
		baseURL: 'http://localhost:4173'
	},
	projects: [
		{
			name: 'edge',
			use: {
				...devices['Desktop Edge']
			}
		},
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			}
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox']
			}
		}
	],
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	}
};

export default config;
