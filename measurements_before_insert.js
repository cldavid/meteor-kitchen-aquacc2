var myArr = doc.topic.split('/');
if (myArr) {
  var device = myArr[2];
  var sensor = myArr[4];
  doc.device = device;
  doc.sensor = sensor
}
