'use strict';
const request = require('superagent');
module.exports.process = function process(intentData, registry, cb) {
    if (intentData.intent[0].value != 'camera')
        return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`))
    if (!intentData.message_subject) return cb(new Error('Missing value of camera intent'));

    const camera = intentData.message_subject[0].value.replace(/,.?rover/i, '');
    
    const service = registry.get('camera');

    if (!service) {
        return cb(false, 'No service available');
    }
    request.get(`http://${service.ip}:${service.port}/service/${camera}`, (err, res) => {
        if (err || res.statusCode != 200 || !res.body) {
            console.log(err);
            return cb(false, `I had a problem in taking out Mars details for "${camera}", Please give valid camera name
                Abbreviation | Camera	| Curiousity | Opportunity | Spirit
                - FHAZ	Front Hazard Avoidance Camera	✔	✔	✔
                - RHAZ	Rear Hazard Avoidance Camera	✔	✔	✔
                - MAST	Mast Camera	✔		
                - CHEMCAM	Chemistry and Camera Complex	✔		
                - MAHLI	Mars Hand Lens Imager	✔		
                - MARDI	Mars Descent Imager	✔		
                - NAVCAM	Navigation Camera	✔	✔	✔
                - PANCAM	Panoramic Camera		✔	✔
                - MINITES	Miniature Thermal Emission Spectrometer (Mini-TES)		✔	✔   
             `);
        }
        return cb(false, `In Mars, here is the image from camera "${res.body.camera.full_name}" below "${res.body.img_src}". The name of rover is "${res.body.rover.name}" and it has taken "${res.body.rover.total_photos}" so far.`);
    });
}