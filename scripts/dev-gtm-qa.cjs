const { spawn } = require('node:child_process');
const next = require.resolve('next/dist/bin/next');
console.log('Localhost GTM diagnostics only: collection blocked by CSP. No form submissions or GA4 delivery test.');
const child = spawn(process.execPath, [next, 'dev', '--turbopack', '--hostname', '127.0.0.1', '--port', '3100'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV:'development', NETLIFY:'false', VERCEL:'0',
    CONTACT_DEPLOY_CONTEXT:'local', NEXT_PUBLIC_DEPLOY_CONTEXT:'local', NEXT_PUBLIC_DEPLOY_PROVIDER:'local',
    NEXT_PUBLIC_GTM_QA_ENABLED:'true', QA_BUILD_DIR:'.next-gtm-qa',
    // Turnstile/provider testing is separate. Never load the real widget here.
    NEXT_PUBLIC_TURNSTILE_SITE_KEY:'', SEND_VISITOR_CONFIRMATION:'false' },
});
child.on('exit', code => { process.exitCode = code || 0; });
