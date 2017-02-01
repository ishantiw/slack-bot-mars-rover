'use strict';

const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackClient');

const slackToken = 'xoxb-134182292336-Sq2Eg9Vv2JHqAgEwflKh80Jh';
const slackLogLevel = 'verbose';
const server  = http.createServer(service);

const witToken = 'CDSHDZYHJ3OCM22CMHH2CJZXE42XZHNF';
const witClient = require('../server/witClient')(witToken);

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));
server.listen(3000);
//xoxb-134182292336-Sq2Eg9Vv2JHqAgEwflKh80Jh
//node_env is used to set the development or production mode, by default its development mode
server.on('listening', function() {
    console.log(`Slack Bot App is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
