import { currentTimeStamp } from "./util/timeStamp";

const report = require("multiple-cucumber-html-reporter");
const fss = require("fs-extra")

report.generate({
  jsonDir: "src/reporting/artifacts/",
  reportPath: "src/reporting/",
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
        { label: "Cycle", value: "Smoke-1" },
        { label: "Execution Start Time", value: '' },
        { label: "Execution End Time", value: '' },
    ],
  },
});

fss.renameSync("src/reporting/index.html", `src/reporting/BookCartApplication_${currentTimeStamp}.html`);