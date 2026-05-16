import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Accessibility', () => {
  test('should pass a11y checks on preview page', async ({ page }) => {
    await page.goto('/preview/test-page');
    await page.waitForSelector('main');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    // Save report for CI artifact
    fs.writeFileSync(
      path.join(process.cwd(), 'a11y-report.json'),
      JSON.stringify(accessibilityScanResults, null, 2)
    );

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should pass a11y checks on studio page', async ({ page }) => {
    await page.goto('/studio/test-page');
    await page.waitForSelector('aside');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
