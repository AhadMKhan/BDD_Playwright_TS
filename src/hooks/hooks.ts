import { Before, BeforeAll, After, AfterAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext

const screenshotPath = "src/reporting/screenshots/"

BeforeAll(async function () {
    browser = await chromium.launch({
        headless : false
    });
})

Before(async function() {
    context = await browser.newContext()
    const page = await browser.newPage();
    pageFixture.page = page;
});

AfterStep(async function ({pickle, result}) {
    console.log(result?.status)
    if(result?.status == Status.FAILED) {
        const img = await pageFixture.page.screenshot({path: `${screenshotPath}${pickle.name}.png`, type: "png"})
        await this.attach(img, "image/png")
    }
    if(result?.status == Status.PASSED) {
        const img = await pageFixture.page.screenshot({path: `${screenshotPath}${pickle.name}.png`, type: "png"})
        await this.attach(img, "image/png")
    }
})

After(async function ({ pickle, result}) {
    console.log(result?.status)
    if(result?.status == Status.FAILED) {
        const img = await pageFixture.page.screenshot({path: `${screenshotPath}${pickle.name}.png`, type: "png"})
        await this.attach(img, "image/png")
    }
    if(result?.status == Status.PASSED) {
        const img = await pageFixture.page.screenshot({path: `${screenshotPath}${pickle.name}.png`, type: "png"})
        await this.attach(img, "image/png")
    }
    
    
    await pageFixture.page.close()
    await context.close();
})

AfterAll(async function () {
    await browser.close()
})