console.log('david');
var myArr = doc.topic.split('/');
console.log(myArr);
if (myArr) {
  var device = myArr[1];
  var sensor = myArr[3];
  doc.device = device;
  doc.sensor = sensor
}
console.log(doc);
