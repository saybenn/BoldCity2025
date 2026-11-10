const { defineConfig } = require('@playwright/test');
const baseURL=process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
module.exports = defineConfig({
 testDir:'./tests/browser', timeout:60000, workers:1,
 // Existing event regressions exercise the opted-in journey. consent.spec.cjs
 // explicitly overrides this with a fresh visitor and tests both choices.
 use:{baseURL,storageState:{cookies:[],origins:[{origin:new URL(baseURL).origin,localStorage:[{name:'bc_analytics_choice_v1',value:JSON.stringify({choice:'granted',at:Date.now()})}]}]},channel:'chrome',headless:true,trace:'retain-on-failure',launchOptions:process.env.QA_LOW_MEMORY==='true'?{args:['--renderer-process-limit=2','--disable-gpu']}:{}},
 reporter:[['list'],['json',{outputFile:process.env.QA_REPORT_PATH || 'context/qa/h2-browser-results.json'}]],
});
