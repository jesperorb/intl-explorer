import { test as base } from "@playwright/test";
import { IntlPage } from "./pages/IntlPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";

export const test = base.extend<{ intlPage: IntlPage, playground: PlaygroundPage }>({
	intlPage: async ({ page }, use) => {
		const intlPage = new IntlPage({ page });
		await use(intlPage);
	},
	playground: async ({ page }, use) => {
		const playgroundPage = new PlaygroundPage({ page });
		playgroundPage.setPageUnderTest("Playground")
		await use(playgroundPage);
	}
});

export { expect } from "@playwright/test";
