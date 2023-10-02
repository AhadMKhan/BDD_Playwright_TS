import { currentTimeStamp } from "./util/timeStamp";

const report = require("multiple-cucumber-html-reporter");
const fss = require("fs-extra")

export const reportName = `BookCartApplication_${currentTimeStamp}`

report.generate({
  jsonDir: "src/reporting/artifacts/",
  reportPath: "src/reporting/report/",
  reportName: "Playwright BDD Report",
  pageTitle: "BookCart App Test",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "117",
    },
    device: "Ahad PC",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Test info",
    data: [
        { label: "Project", value: "Book Cart Application" },
        { label: "Release", value: "1.2.3" },
        { label: "Cycle", value: "Smoke-1" }
    ],
  },
});

fss.renameSync("src/reporting/report/index.html", `src/reporting/report/${reportName}.html`);