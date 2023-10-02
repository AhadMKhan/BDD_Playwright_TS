import { Before, BeforeAll, After, AfterAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { createLogger } from "winston";
import { options } from "../helpers/util/logger";
import { getEnv } from "../helpers/env/env";
import { invokeBrowser } from "../helpers/browsers/browserManager";

let browser: Browser;
let context: BrowserContext

const screenshotPath = "src/reporting/screenshots/"

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
})

Before(async function({pickle}) {
    const scenarioName = pickle.name +" "+pickle.id
    context = await browser.newContext()
    const page = await browser.newPage();
    pageFixture.page = page;
    pageFixture.logger = createLogger(options(scenarioName))
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
    pageFixture.logger.close()
})