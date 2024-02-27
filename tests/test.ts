import { test as base } from '@playwright/test';
import { IntlPage } from './IntlPage';
import { injectAxe } from 'axe-playwright';

export const test = base.extend<{ intlPage: IntlPage }>({
  intlPage: async ({ page }, use) => {
    const intlPage = new IntlPage({ page })
    await intlPage.goToHome();
    await injectAxe(intlPage.page);
    await use(intlPage);
  }
})

export { expect } from '@playwright/test';