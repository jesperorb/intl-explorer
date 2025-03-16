import { test as base } from "@playwright/test";
import { IntlPage } from "./pages/IntlPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { SettingsPage } from "./pages/SettingsPage";

export type Test = {
	intlPage: IntlPage;
	playground: PlaygroundPage;
	settings: SettingsPage;
};

export const test = base.extend<Test>({
	intlPage: async ({ page }, use) => {
		const intlPage = new IntlPage({ page });
		await use(intlPage);
	},
	playground: async ({ page }, use) => {
		const playgroundPage = new PlaygroundPage({ page });
		playgroundPage.setPageUnderTest("Playground");
		await use(playgroundPage);
	},
	settings: async ({ page }, use) => {
		const settings = new SettingsPage({ page });
		await use(settings);
	}
});

export { expect } from "@playwright/test";
