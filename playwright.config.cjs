const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
 testDir:'./tests/browser', timeout:60000, workers:1,
 use:{baseURL:process.env.QA_BASE_URL || 'http://127.0.0.1:3000',channel:'chrome',headless:true,trace:'retain-on-failure'},
 reporter:[['list'],['json',{outputFile:'context/qa/browser-results.json'}]],
});
