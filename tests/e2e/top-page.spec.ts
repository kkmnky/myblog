import { test, expect } from '@playwright/test';
import siteMetadata from '@/siteMetadata';

test.describe('トップページのテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ロゴ画像が正しく表示されている', async ({ page }) => {
    const logo = page.getByRole('main').getByRole('img', { name: 'logo' });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/static/logo.jpg');
  });

  test('サイト名が正しく表示されている', async ({ page }) => {
    const siteName = page.getByRole('main').getByRole('heading', { level: 1 });
    await expect(siteName).toBeVisible();
    await expect(siteName).toHaveText(siteMetadata.siteName);
  });

  test('サイトの説明文が表示されている', async ({ page }) => {
    const description = page.getByRole('main').getByLabel('site-description');
    await expect(description).toBeVisible();
    await expect(description).toHaveText(siteMetadata.shortDescription);
  });

  test('記事が最大数表示されている', async ({ page }) => {
    const articles = page.getByRole('main').getByRole('article');
    await expect(articles).toHaveCount(15); // MAX_DISPLAYの値
  });
});