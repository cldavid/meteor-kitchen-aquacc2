var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

var device  = "arduino01";
var sensor  = Math.floor(((Math.random() * 100) % 2) + 1);
var data    = (((Math.random() * 100) % 10) + 21).toFixed(2);
console.log(sensor); 
client.on('connect', function () {
  var topic = "Measurements/Devices/" + device + "/Sensors/" + sensor;
  client.publish(topic, data.toString());
  client.end();
});
 
