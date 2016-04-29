var lastM = 0;
var device;
var sensor;
var createdAt;
Measurements.find({_id: doc._id }).map(
  function(item) {
    device    = item.device;
    sensor    = item.sensor;
    lastM     = item.message;
    createdAt = item.createdAt;
});
var topic = 'Devices/' + device + '/Sensors/' + sensor;
Devices.update({ topic: topic}, { $set: { device: device, sensor: sensor, lastMeasurement: lastM }});

var epoch = new Date(createdAt);
var minutes = epoch.getMinutes();
epoch.setMilliseconds(0);
epoch.setSeconds(0);

epoch.setMinutes(minutes - (minutes % 1));
Measurements24h.update({topic: topic, createdAt: epoch}, { $set: { device: device, sensor: sensor}, $inc: {nmeasurements: 1, sum: lastM}}, {upsert: true});

epoch.setMinutes(minutes - (minutes % 5));
Measurements1w.update({topic: topic, createdAt: epoch}, { $set: { device: device, sensor: sensor}, $inc: {nmeasurements: 1, sum: lastM}}, {upsert: true});

epoch.setMinutes(0);
epoch.setHours(0);
Measurements1m.update({topic: topic, createdAt: epoch}, { $set: { device: device, sensor: sensor}, $inc: {nmeasurements: 1, sum: lastM}}, {upsert: true});
Measurements1y.update({topic: topic, createdAt: epoch}, { $set: { device: device, sensor: sensor}, $inc: {nmeasurements: 1, sum: lastM}}, {upsert: true});
