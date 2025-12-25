import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  test('should complete signup with OTP verification', async ({ page }) => {
    test.setTimeout(120000);

    await page.goto('https://authorized-partner.vercel.app/', {
      waitUntil: 'domcontentloaded',
    });

    await expect(page).toHaveURL(/authorized-partner/);
    await page.locator('button.bg-primary', { hasText: 'Get Started' }).click();



    const termsCheckbox = page.locator('#remember');
    const continueButton = page.getByRole('button', { name: 'Continue' });

    await expect(termsCheckbox).toBeVisible();
    await termsCheckbox.check();
    await continueButton.click();


    await expect(page.locator('input[name="firstName"]')).toBeVisible();

    await page.fill('input[name="firstName"]', process.env.FIRST_NAME);
    await page.fill('input[name="lastName"]', process.env.LAST_NAME);
    await page.fill('input[name="email"]', process.env.EMAIL);
    await page.fill('input[name="phoneNumber"]', process.env.PHONE);
    await page.fill('input[name="password"]', process.env.PASSWORD);
    await page.fill('input[name="confirmPassword"]', process.env.PASSWORD);

    await page.getByRole('button', { name: 'Next' }).click();

    // Locate OTP inputs
    const otpInputs = page.locator('input[data-input-otp="true"]');


    await otpInputs.first().waitFor({ state: 'visible', timeout: 120000 });

    await expect(otpInputs).toHaveCount(6, { timeout: 120000 });

    await page.pause();


    await page.getByRole('button', { name: 'Verify Code' }).click();
  });
});


