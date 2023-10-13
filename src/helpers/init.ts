const fs = require("fs-extra");

try{
    fs.ensureDir("test-results/");
    fs.ensureDir("test-results/screenshots/");
    fs.ensureDir("test-results/artifacts/");
    fs.ensureDir("test-results/logs/");

    
    fs.emptyDir("test-results/");
    fs.emptyDir("test-results/screenshots/");
    fs.emptyDir("test-results/artifacts/");
} catch (error) {
    console.log("Folder not created! "+error);
}