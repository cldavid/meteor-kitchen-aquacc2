var lastM = 0;
var device;
var sensor;
Measurements.find({_id: doc._id }).map(
  function(item) {
    device = item.device;
    sensor = item.sensor;
    lastM = item.message;
});
var topic = 'Devices/' + device + '/Sensors/' + sensor;
Devices.update({ topic: topic}, { $set: { device: device, sensor: sensor, lastMeasurement: lastM }});
