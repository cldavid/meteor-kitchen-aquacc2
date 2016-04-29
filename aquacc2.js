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
                "before_insert_source_file": "devices_before_insert.js",
            },
            {
                "name": "measurements",
                "fields": [
                { "name": "topic", "title": "ID", "exportable": true },
                { "name": "message", "title": "Temperature", "exportable": true },
                { "name": "modifiedAt", "title": "Modified", "exportable": true }
                ],
                "before_insert_source_file": "measurements_before_insert.js",
                "after_insert_source_file": "measurements_after_insert.js",
            },
            {
                "name": "measurements_24h",
                "fields": [
                { "name": "topic", "title": "ID", "exportable": true },
                { "name": "message", "title": "Temperature", "exportable": true },
                { "name": "modifiedAt", "title": "Modified", "exportable": true },
                { "name": "createdAt", "title": "Modified", "exportable": true },
                ],
            },
            {
                "name": "measurements_1w",
                "fields": [
                { "name": "topic", "title": "ID", "exportable": true },
                { "name": "message", "title": "Temperature", "exportable": true },
                { "name": "modifiedAt", "title": "Modified", "exportable": true },
                { "name": "createdAt", "title": "Modified", "exportable": true },
                ],
            },
            {
                "name": "Measurements_1m",
                "fields": [
                { "name": "topic", "title": "ID", "exportable": true },
                { "name": "message", "title": "Temperature", "exportable": true },
                { "name": "modifiedAt", "title": "Modified", "exportable": true },
                { "name": "createdAt", "title": "Modified", "exportable": true },
                ],
            },
            {
                "name": "Measurements_1y",
                "fields": [
                { "name": "topic", "title": "ID", "exportable": true },
                { "name": "message", "title": "Temperature", "exportable": true },
                { "name": "modifiedAt", "title": "Modified", "exportable": true },
                { "name": "createdAt", "title": "Modified", "exportable": true },
                ],
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
            },
            {
                "name": "sensors_graph_24h",
                "collection": "measurements_24h",
                "filter": {},
                "options": { "sort": [ ["createdAt", "asc"] ]},
                "related_queries": [ {"name": "devices"}]
            },
            {
                "name": "sensors_graph_1w",
                "collection": "measurements_1w",
                "filter": {},
                "options": { "sort": [ ["createdAt", "asc"] ]},
                "related_queries": [ {"name": "devices"}]
            },
            {
                "name": "sensors_graph_1m",
                "collection": "measurements_1m",
                "filter": {},
                "options": { "sort": [ ["createdAt", "asc"] ]},
                "related_queries": [ {"name": "devices"}]
            },
            {
                "name": "sensors_graph_1y",
                "collection": "measurements_1y",
                "filter": {},
                "options": { "sort": [ ["createdAt", "asc"] ]},
                "related_queries": [ {"name": "devices"}]
            }
        ],
            "server_startup_source_file": "server_startup_code.js",
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
                            "query_name": "sensors_graph_24h",
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
                            "query_name": "sensors_graph_24h",
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
                            "query_name": "sensors_graph_1w",
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
                            "query_name": "sensors_graph_1m",
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
                            "query_name": "sensors_graph_1y",
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
                            { "title": "Temperature 24h",   "route": "charts.temperature_24h"},
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
