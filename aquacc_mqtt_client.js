var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
var device  = "arduino01";

client.on('connect', function () {
        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function(sensor) {
            var data    = (((Math.random() * 100) % 10) + 21).toFixed(2);
            var topic = "Measurements/Devices/" + device + "/Sensors/" + sensor;
            console.log(sensor); 
            console.log(data); 

            client.publish(topic, data.toString());
            });
        client.end();
        });

