import { test, expect } from '@playwright/test';

test.describe('People View', () => {
  test('Happy Path (load → search → sort → paginate).', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page).toHaveTitle(/SW Coda/);

    await page.click('a[aria-label="Go to people"]');
    const loadingIndicator = page.locator('.loading');
    await expect(loadingIndicator).toBeVisible();
    await expect(loadingIndicator).toBeHidden();

    await expect(page).toHaveURL(/\/people/);

    const searchInput = page.locator('.search .search__input');
    await searchInput.fill('Luke');

    const tableRows = page.locator('.table tbody .table__line');
    await expect(tableRows).toContainText('Luke');

    await searchInput.fill('');
    const sortButton = page
      .locator('.sort-button')
      .filter({ hasText: 'Name' })
      .filter({ has: page.locator(':visible') })
      .first();
    await sortButton.click();

    const firstRowName = await tableRows.first().locator('td').nth(0).textContent();
    expect(firstRowName).toBe('Zam Wesell');

    const nextPageButton = page.locator('.pagination .pagination__button--forwards');
    await nextPageButton.click();

    const currentPage = page.locator('.pagination .pagination__label');
    await expect(currentPage).toHaveText(/2/);
  });
});
