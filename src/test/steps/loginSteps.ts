import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";

import { pageFixture } from "../../hooks/pageFixture";
import { Login } from "../../locators/login";
import { getLocatorProperty, getTestDataProperty } from "../../helpers/properties/propertyReader";

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the {string}', async function (url) {
    await pageFixture.page.goto(url)
    pageFixture.logger.info("Navigate to url "+process.env.BASEURL)
})

Given('User click on the login link', async function () {
    const button = await pageFixture.page.waitForSelector(`//span[text()='Login']`)
    button.click()
    pageFixture.logger.info("Click on "+button)
});

Given('User enter the {string} on field {string} from {string} Page', async (testData, locatorName, screenName) => {  
  let textField;
  try {
    testData = await getTestDataProperty(testData, screenName + '.properties');
    const locator = await getLocatorProperty(locatorName, screenName + '.properties'); // Use locatorName here
    console.log(locator)

    textField = await pageFixture.page.locator(locator);
    await textField.fill(testData);
    await pageFixture.page.waitForTimeout(5000);

    pageFixture.logger.info('Entered ' + testData + ' on ' + locatorName + ' from ' + screenName + ' Page.');
  } catch (error) {
    pageFixture.logger.error('Could not Entered ' + testData + ' on ' + locatorName + ' from ' + screenName + ' Page.');
  }
});
  

Given('User enter the password as {string}', async function (password) {
    const textField= await pageFixture.page.waitForSelector(`id=mat-input-1`)
    textField.fill(password)
})

When('User click on the login button', async function () {
   const button = await pageFixture.page.waitForSelector(`button[color="primary"]`)
   button.click()
   await pageFixture.page.waitForLoadState()
});


Then('Login should be success', async function () {
    const text = await pageFixture.page.waitForSelector("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]")
    await text.textContent();
    console.log("Username: " + text);
})

When('Login should fail', async function () {
    const failureMesssage = pageFixture.page.locator("mat-error[role='alert']");
    await expect(failureMesssage).toBeVisible();
});