'use strict';

const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackClient');

/* get the keys from the property files */
const parser = require('properties-parser');
const slackAPIToken = parser.read('./apiKeys.properties')['slackKey'];
const witToken = parser.read('./apiKeys.properties')['witKey'];

const slackLogLevel = 'verbose';
const server = http.createServer(service);
const witClient = require('../server/witClient')(witToken);

const serviceRegistry = service.get('serviceRegistry');
const rtm = slackClient.init(slackAPIToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

/* node_env is used to set the development or production mode, by default its development mode */
server.on('listening', function () {
    console.log(`Slack Bot App is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
