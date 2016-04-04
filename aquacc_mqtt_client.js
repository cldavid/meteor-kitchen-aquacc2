var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

var device  = "arduino01";
var sensor  = 1;
var sensor  = Math.floor(Math.random() * 10);
var data    = (((Math.random() * 100) % 20) + 15).toFixed(2);
 
client.on('connect', function () {
  var topic = "Measurements/Devices/" + device + "/Sensors/" + sensor;
  client.publish(topic, data.toString());
  client.end();
});
 
