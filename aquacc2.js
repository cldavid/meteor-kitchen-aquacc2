{
    "application": {
        "title": "Aquacc2",
        
        "collections": [
                        {
                            "name": "devices",
                            "fields": [
                                   { "name": "topic", "title": "ID", "exportable": true },
                                   { "name": "message", "title": "Name", "exportable": true },
                                   { "name": "device", "title": "Device", "exportable": true },
                                   { "name": "sensor", "title": "Sensor", "exportable": true },
                                   { "name": "lastMeasurement", "title": "Data", "exportable": true },
                                   ],
                            "before_insert_code": "
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
                                ",
                        },
                        {
                            "name": "measurements",
                            "fields": [
                                       { "name": "topic", "title": "ID", "exportable": true },
                                       { "name": "message", "title": "Temperature", "exportable": true },
                                       { "name": "modifiedAt", "title": "Modified", "exportable": true }
                                       ],
                            "before_insert_code": "
                                var myArr = doc.topic.split('/');
                                if (myArr) {
                                    var device = myArr[2];
                                    var sensor = myArr[4];
                                    doc.device = device;
                                    doc.sensor = sensor
                            }",
                            "after_insert_code": "
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
                                Devices.update({ topic: topic}, { $set: { lastMeasurement: lastM }});",
                        }
        ],
        
        "queries": [
                    {
                    "name": "devices",
                    "collection": "devices",
                    "filter": {},
                    "options": {
                        "sort": [ ["topic", "asc"], ["createdAt", "desc"] ]},
                    },
                    {
                    "name": "measurements_last",
                    "collection": "measurements",
                    "filter": {},
                    "find_one": true,
                    "options": { "sort": [ ["createdAt", "asc"] ]}
                    },
                    {
                    "name": "sensors_graph",
                    "collection": "measurements",
                    "filter": {},
                    "options": { "sort": [ ["createdAt", "asc"] ]}
                    }
                    ],
        
        "server_startup_code": "
        Devices.mqttConnect('mqtt://localhost', ['Devices/#'], { insert: false });
        Measurements.mqttConnect('mqtt://localhost', ['Measurements/#'], { insert: true });",
        
        "free_zone": {
            "pages": [
                      {
                      "name": "home",
                      "title": "Aqua Control Center",
                      "text": "Showing sensor data.",
                      "components": [
                                     {
                                     "name": "view",
                                     "type": "dataview",
                                     "query_name": "devices"
                                     }
                                     ]
                      },
                      {
                      "name": "charts",
                      "title": "Charts",
                      "text": "",
                      "components": [
                                     {
                                     "name": "charts",
                                     "title": "Temperature",
                                     "type": "custom_component",
                                     "html": "<template name=\"TEMPLATE_NAME\">\n\t<h3>COMPONENT_TITLE</h3>\n\t{{> c3 data=tempChart}}\n</template>\n",
                                     "js": "Template.TEMPLATE_NAME.helpers({
                                        \"tempChart\": function() {
                                        var colX = ['x'];
                                        var colY = ['t1'];
                                        var data = Measurements.find({ topic: \"Measurements/Devices/arduino01/Sensors/1\" }).fetch();
                                        var msg   = _.pluck(data, 'message');
                                        var dates = _.pluck(data, 'createdAt');
                                        _.each(dates, function(f) {
                                            colX.push(f);
                                        });
                                        _.each(msg, function(g) {
                                                colY.push(parseInt(g));
                                        });
                                        return {
                                            data: {
                                                x: 'x',
                                                xFormat: '%Y-%m-%d %H:%M:%S.%LZ',
                                                columns: [colX, colY],
                                                type: 'spline',
                                            },
                                            axis: {
                                                x: {
                                                    type: 'timeseries',
                                                    localtime: false,
                                                    tick: {
                                                            count: 20,
                                                            format: '%Y-%m-%d %H:%M:%S'
                                                    }
                                                }
                                            }
                                      };
                                      }});",
                                     "query_name": "sensors_graph",
                                     "query_params": []
                                     }
                                     ]
                      },
                      { "name": "about", "title": "About", "text": "Aqua Control Center.<br/>David Cluytens." }
                      ],
            
            "components": [
                           {
                           "name": "main_menu",
                           "type": "menu",
                           "items": [
                                     { "title": "Home page", "route": "home", "icon_class": "fa fa-home" },
                                     { "title": "Charts", "route": "charts", "icon_class": "fa fa-area-chart"},
                                     { "title": "About", "route": "about" }
                                     ]
                           }
                           ]
        },
        
        "packages": {
            "meteor": ["perak:mqtt-collection", "perak:c3"]
        }
    }
}
