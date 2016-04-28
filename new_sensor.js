var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

var device  = "arduino01";
var sensor  = (Math.random() * 10).toFixed(0);
var data    = "inside";
sensor = 6;

client.on('connect', function () {
  var topic = "Devices/" + device + "/Sensors/" + sensor;
  client.publish(topic, data.toString());
  client.end();
});
 
