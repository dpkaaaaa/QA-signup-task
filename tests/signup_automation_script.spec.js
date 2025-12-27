import { test, expect } from '@playwright/test';

test('Full signup flow', async ({ page }) => {

  await page.goto('https://authorized-partner.vercel.app/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

   await page.click('text=Get Started');

  const termsCheckbox = page.locator('#remember');
  await termsCheckbox.waitFor({ state: 'visible' });
  await termsCheckbox.check();

  const continueButton = page.locator('button:has-text("Continue")');

  await continueButton.waitFor({ state: 'visible' });
  await continueButton.click();

  const firstNameInput = page.locator('input[name="firstName"]');
  await firstNameInput.waitFor({ state: 'visible', timeout: 10000 });

  await firstNameInput.fill('userdp');
  await page.locator('input[name="lastName"]').fill('test');
  await page.locator('input[name="email"]').fill('userdp123@gmail.com');
  await page.locator('input[name="phoneNumber"]').fill('9841234567');
  await page.locator('input[name="password"]').fill('userdp@12345');
  await page.locator('input[name="confirmPassword"]').fill('userdp@12345');


  const nextButton = page.locator('button:has-text("Next")');
  await expect(nextButton).toBeEnabled();
  await nextButton.click();

});
