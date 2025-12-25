import { test, expect } from '@playwright/test';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

test('Automate full signup flow', async ({ page }) => {
  test.setTimeout(120000);
  
  // open the website
  await page.goto('https://authorized-partner.vercel.app/', {
    waitUntil: 'domcontentloaded',
    timeout: 120000
  });

  
  await page.click('text=Get Started');
  
  // Wait for page to load 
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  // Terms & continue
  const termsCheckbox = page.locator('#remember');
  await termsCheckbox.waitFor({ state: 'visible', timeout: 60000 });
  await termsCheckbox.check();
  
  // Continue button 
  const continueButton = page.locator('button:has-text("Continue")');
  await continueButton.waitFor({ state: 'visible', timeout: 10000 });
  await continueButton.click();

  // step1 Fill Registration Form
  await page.fill('input[name="firstName"]', 'userdp');
  await page.fill('input[name="lastName"]', 'test');
  await page.fill('input[name="email"]', 'dipikaaa060@gmail.com');
  await page.fill('input[name="phoneNumber"]', '9861234567');
  await page.fill('input[name="password"]', 'Userdp@12345');
  await page.fill('input[name="confirmPassword"]', 'Userdp@12345');

  // Click Next button
  await page.locator('button:has-text("Next")').click();





// ===== EMAIL VERIFICATION CODE =====
const otpInputs = page.locator('input[data-input-otp="true"]');
await otpInputs.first().waitFor({
  state: 'visible',
  timeout: 120000  // wait up to 2 minutes for OTP input
});

 console.log("Please enter the OTP manually in the browser...");

  // Pause Playwright until you manually complete OTP
  await page.pause();

  // After OTP is entered, click Verify Code button
  const verifyButton = page.locator('button:has-text("Verify Code")');
  await verifyButton.waitFor({ state: 'visible', timeout: 60000 });
  await verifyButton.click();

  console.log("OTP verified manually, proceeding to next steps...");




  //  ===== STEP 2 =====
  // await page.waitForTimeout(5000);
  // await page.waitForSelector('input[placeholder="Enter Agency Name"]', { 
  //   state: 'visible', 
  //   timeout: 30000 
  // });
  // await page.fill('input[placeholder="Enter Agency Name"]', 'My Agency');
  // await page.fill('input[placeholder="Enter Your Role in Agency"]', 'QA Intern');
  // await page.fill('input[placeholder="Enter Your Agency Email Address"]', 'hello@example.com');
  // await page.fill('input[placeholder="https:// Enter Your Agency Website"]', 'https://example.com');
  // await page.fill('input[placeholder="Enter Your Agency Address"]', 'Kathmandu');

  // // Region of operation - More specific selector
  // const regionSelect = page.locator('select[name="region"]');
  // await regionSelect.waitFor({ state: 'visible', timeout: 5000 });
  // await regionSelect.selectOption({ label: 'Asia' });

});
