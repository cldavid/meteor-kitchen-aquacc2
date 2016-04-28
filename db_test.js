var db = require('mongodb').MongoClient;

// Connect to the db
db.connect("mongodb://localhost:3001/Measurements", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
});
