const { test, expect } = require('@playwright/test');

test('homepage renders without uncaught page errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByText('Good writing starts with understanding.')).toBeVisible();
  await expect(page.getByText('AI writing prototype.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('main navigation renders projects, clients, settings, then returns home', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: /Projects/i }).first().click();
  await expect(page.getByText(/Your projects/i).first()).toBeVisible();
  await page.getByRole('button', { name: /Clients/i }).first().click();
  await expect(page.getByText(/Client/i).first()).toBeVisible();
  await page.getByRole('button', { name: /Settings/i }).first().click();
  await expect(page.getByText('Gemini AI provider')).toBeVisible();
  await page.getByRole('button', { name: /Overview|Home/i }).first().click();
  await expect(page.getByText('Good writing starts with understanding.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('provider settings explains local key storage and model connection', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Settings/i }).first().click();
  await expect(page.getByText('Gemini AI provider')).toBeVisible();
  await expect(page.getByLabel('Gemini API key')).toBeVisible();
  await expect(page.getByLabel('Model')).toBeVisible();
  await expect(page.getByText(/local storage, which is not encrypted/i)).toBeVisible();
});
