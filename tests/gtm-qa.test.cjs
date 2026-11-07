const {test}=require('node:test');
const assert=require('node:assert/strict');

test('GTM QA requires explicit local development, local deployment/provider and exact loopback host',async()=>{
 const {localGtmQaAllowed,productionAnalyticsAllowed}=await import('../lib/deployment.mjs');
 for(const host of ['localhost','127.0.0.1'])assert.equal(localGtmQaAllowed('development','true','local','local',host),true);
 for(const host of ['localhost.example.com','0.0.0.0','::1','boldcityiaq.com','www.boldcityiaq.com','deploy-preview-1--sprightly-horse-c6240e.netlify.app'])assert.equal(localGtmQaAllowed('development','true','local','local',host),false);
 for(const mode of ['production','test',undefined])assert.equal(localGtmQaAllowed(mode,'true','local','local','localhost'),false);
 for(const flag of ['false','1',undefined])assert.equal(localGtmQaAllowed('development',flag,'local','local','localhost'),false);
 for(const context of ['production','deploy-preview','branch-deploy','unknown'])assert.equal(localGtmQaAllowed('development','true',context,'local','localhost'),false);
 for(const provider of ['netlify','vercel','unknown'])assert.equal(localGtmQaAllowed('development','true','local',provider,'localhost'),false);
 assert.equal(productionAnalyticsAllowed('production','boldcityiaq.com'),true);
 assert.equal(productionAnalyticsAllowed('deploy-preview','boldcityiaq.com'),false);
});
