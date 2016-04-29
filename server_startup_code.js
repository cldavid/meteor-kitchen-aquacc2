Devices.mqttConnect('mqtt://localhost', ['Devices/#'], { insert: false });
Measurements.mqttConnect('mqtt://localhost', ['Measurements/#'], { insert: true });
