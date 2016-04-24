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
                Devices.update({ topic: topic}, { $set: { device: device, sensor: sensor, lastMeasurement: lastM }});",
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
                "options": { "sort": [ ["createdAt", "asc"] ]},
                "related_queries": [ {"name": "devices"}]
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
                        "type": "data_view",
                        "query_name": "devices"
                    }
                    ]
                },
                {
                    "name": "charts",
                    "title": "Charts",
                    "pages": [
                      {
                        "name": "temperature_6h",
                        "title": "Temperature last 6h",
                        "text": "",
                        "components": [
                          {
                            "name": "view_devices",
                            "type": "temp_graph_6h",
                            "properties": { "anything": "here" },
                            "query_name": "sensors_graph",
                            "query_params": []
                          },
                        ]
                      },
                      {
                        "name": "temperature_24h",
                        "title": "Temperature last 24h",
                        "text": "",
                        "components": [
                          {
                            "name": "view_devices",
                            "type": "temp_graph_24h",
                            "properties": { "anything": "here" },
                            "query_name": "sensors_graph",
                            "query_params": []
                          },
                        ]
                      },
                      {
                        "name": "temperature_1w",
                        "title": "Temperature last week",
                        "text": "",
                        "components": [
                          {
                            "name": "view_devices",
                            "type": "temp_graph_1w",
                            "properties": { "anything": "here" },
                            "query_name": "sensors_graph",
                            "query_params": []
                          },
                        ]
                      },
                      {
                        "name": "temperature_1m",
                        "title": "Temperature last month",
                        "text": "",
                        "components": [
                          {
                            "name": "view_devices",
                            "type": "temp_graph_1m",
                            "properties": { "anything": "here" },
                            "query_name": "sensors_graph",
                            "query_params": []
                          },
                        ]
                      },
                      {
                        "name": "temperature_1y",
                        "title": "Temperature last year",
                        "text": "",
                        "components": [
                          {
                            "name": "view_devices",
                            "type": "temp_graph_1y",
                            "properties": { "anything": "here" },
                            "query_name": "sensors_graph",
                            "query_params": []
                          },
                        ]
                      },
                    ],
                      "components": [
                        {
                          "name": "charts_menu",
                          "type": "menu",
                          "items": [
                            { "title": "Temperature 6h",    "route": "charts.temperature_6h" },
                            { "title": "Temperature 24h",   "route": "charts.temperature_24h" },
                            { "title": "Temperature week",  "route": "charts.temperature_1w" },
                            { "title": "Temperature month", "route": "charts.temperature_1m" },
                            { "title": "Temperature year",  "route": "charts.temperature_1y" },
                          ]
                        }]
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
