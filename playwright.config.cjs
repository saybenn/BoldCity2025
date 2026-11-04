const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
 testDir:'./tests/browser', timeout:60000, workers:1,
 use:{baseURL:process.env.QA_BASE_URL || 'http://127.0.0.1:3000',channel:'chrome',headless:true,trace:'retain-on-failure',launchOptions:process.env.QA_LOW_MEMORY==='true'?{args:['--renderer-process-limit=2','--disable-gpu']}:{}},
 reporter:[['list'],['json',{outputFile:process.env.QA_REPORT_PATH || 'context/qa/h2-browser-results.json'}]],
});
