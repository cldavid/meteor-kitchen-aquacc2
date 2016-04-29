Devices.mqttConnect('mqtt://localhost', ['Devices/#'], { insert: false });
Measurements.mqttConnect('mqtt://localhost', ['Measurements/#'], { insert: true });
Measurements24h.mqttConnect('mqtt://localhost', ['Measurements24h/#'], { insert: true });
//Measurements_1w.mqttConnect('mqtt://localhost', ['Measurements_1w/#'], { insert: false });
//Measurements_1m.mqttConnect('mqtt://localhost', ['Measurements_1m/#'], { insert: false });
//Measurements_1y.mqttConnect('mqtt://localhost', ['Measurements_1y/#'], { insert: false});
