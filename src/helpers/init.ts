const fs = require("fs-extra");

try{
    fs.ensureDir("src/reporting/");
    fs.ensureDir("src/reporting/screenshots/");
    fs.ensureDir("src/reporting/artifacts/");
    fs.ensureDir("src/reporting/logs/");

    
    fs.emptyDir("src/reporting/");
    fs.emptyDir("src/reporting/screenshots/");
    fs.emptyDir("src/reporting/artifacts/");
    // fs.emptyDir("src/reporting/logs/");

} catch (error) {
    console.log("Folder not created! "+error);
}