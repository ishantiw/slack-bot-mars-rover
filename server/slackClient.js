'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;
//var bot_token = process.env.SLACK_BOT_TOKEN || '';
//var my_token = 'xoxb-134182292336-Sq2Eg9Vv2JHqAgEwflKh80Jh';

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}
function handleOnMessage(message) {
    if(message.text.toLowerCase().includes('rover')) {
        nlp.ask(message.text, (err, res) => {
        if(err) {
            console.log(err);
            return;
        }
        try {
            if(!res.intent || !res.intent[0] || !res.intent[0].value) {
                throw new Error("Could not extract intent.");
            }
            const intent = require('./intent/' + res.intent[0].value + 'Intent');

            intent.process(res, function(error, response) {
                if(error) {
                    console.log(error.message);
                    return;
                }
                return rtm.sendMessage(response, message.channel);
            })
        } catch(err) {
            console.log(err);
            console.log(res);
            rtm.sendMessage("Sorry I don't know");
        }
/*
        if(!res.intent) {
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", message.channel);
        } else if(res.intent[0].value == 'time' && res.location) {
            return rtm.sendMessage(`I don't yet know the time in ${res.location[0].value}`, message.channel);
        } else if (res.intent[0].value == 'life' && res.location){
            return rtm.sendMessage(`I don't know yet how is life in ${res.location[0].value}`, message.channel);
        } else {
            console.log("I'm here");
            console.log(res);
            return rtm.sendMessage("Sorry, I don't know what you are talking about.", message.channel);
        }
        */
       // rtm.sendMessage("Hi, I'm mars. I am created by Ishan! I don't understand what you ahve asked me", message.channel, function messageSent() {
       // });
    });
    }
    
    
}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}
module.exports.init = function slackClient(token, logLevel, nlpClient) {
    rtm = new RtmClient(token, {logLevel: logLevel});
    nlp = nlpClient;
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;


/*
// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("Hello!", channel);
});

rtm.start();

//WIT

curl \
 -H 'Authorization: Bearer CDSHDZYHJ3OCM22CMHH2CJZXE42XZHNF' \
 'https://api.wit.ai/message?v=20170131&q='

*/