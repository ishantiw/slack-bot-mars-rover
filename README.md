# slack-bot-mars-rover: Node.js: Building a Slack Bot with Nodejs Microservices

## Pre-requisites

If you are familiar with creating applications using NodeJS and ExpressJS.

## Editor

Visual Studio Code: It is open source and comes with syntax highlighting, intellisense and code formatting for Node. It is written in Nodejs.

## Concepts

### Miscroservices:

One Mircoservice should only do one task, like fetching a customer from the backend.
It should be possible to develop and deploy a microservice completely independent from all the other parts of an application.
Microservice should communicate using standard HTTP methods.

### What are the benefits of Microservices?

A developer don't have to understand the whole application.
Services can be developed and deployed by independent teams as there is not much interdependency between those teams.
Services can be developed with the language that does a given task best or the with which a developer or team is comfortable.
If the services fails, the whole application doesn't fail, only the service provided by that particular microservice will fail. This is also called resilience.
Slack API

Slack offers a lot of services through its APIs which we can see at Slack API. The Web API provides a way to communicate with slack which is typically a JSON based HTTP API. Under methods, we can see that it provides everything except a way to get messaged pushed to us. So there is one more item under Web API called Real Time Messaging API which can be used for this purpose. You can read more about Real Time Messaging at Slack API RTM. 

## Application

Main Application: This application is a web application based on ExpressJS to handle connection to Slack, handle our services, receive messages from Slack, process messages, route messages to a service and send replies to Slack. 

**Wit(External Service):** This is the service that lets us process natural language to try to understand its meaning. We need it to process the messages.

We will create services that will tell us the local time and weather for a given location which can be extended as we want, all these services are based on ExpressJS. The services need a way to reach to our application and the main application should be able to route the requests or messages to a service that can handle it.
Resilience

## How to run?

1) Clone this repository using `git clone https://github.com/ishantiw/slack-bot-mars-rover.git`

2) On command prompt run `cd slack-bot-mars-rover`

3) Run `npm install`

4) Get the slack api key from https://api.slack.com/web and update at https://github.com/ishantiw/slack-bot-mars-rover/blob/master/apiKeys.properties#L1

5) Get the wit api key from https://wit.ai and update at https://github.com/ishantiw/slack-bot-mars-rover/blob/master/apiKeys.properties#L2

6) Run `node bin/run.js`

## Microservices which we built

### To get the time for a city using google api for location and time,
https://github.com/ishantiw/location-time-intent

### To get the weather for a city using open weather api, 
https://github.com/ishantiw/location-weather-intent
