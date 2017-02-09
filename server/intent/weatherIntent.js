'use strict';
const request = require('superagent');
module.exports.process = function process(intentData, registry, cb) {

    if (intentData.intent[0].value != 'weather')
        return cb(new Error(`Expected weather intent, got ${intentData.intent[0].value}`))
    if (!intentData.location) return cb(new Error('Missing location in weather intent'));

    const location = intentData.location[0].value.replace(/,.?rover/i, '');
    const service = registry.get('weather');

    if (!service) {
        return cb(false, 'No service available');
    }
    request.get(`http://${service.ip}:${service.port}/service/${location})`, (err, res) => {
        if (err || res.statusCode != 200 || !res.body.temp) {
            console.log(err);
            return cb(false, `I had a problem in taking out weather for ${location}`);
        }
        const tempCelsius = parseFloat(res.body.temp - 273.15).toFixed(2);
        const humidity = res.body.humidity;
        return cb(false, `In ${location}, it is now ${tempCelsius} and humidity is ${humidity}%`);
    })

}