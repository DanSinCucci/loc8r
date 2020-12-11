var http = require('http');
   
http.createServer(function (req, res) {

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
if(err) { return console.dir(err); }

var collection = db.collection('passengers');

collection.find().toArray(function(err, docs){

res.writeHead(200, {
              'Content-Type': 'text/html',
              'Access-Control-Allow-Origin' : '*'});

var intCount = docs.length;
console.log(intCount);
if(intCount > 0){
   res.write("[");
   for(var i=0; i<intCount;i++){
        var jsonText = JSON.stringify({name: docs[i].properties.name.toString(),lat:docs[i].geometry.coordinates[0].toString(),lon:docs[i].geometry.coordinates[1].toString()});
        
        console.log(jsonText);
        res.write(jsonText);
        if(i!=intCount-1) res.write(",");
   }
   res.write("]");
}

res.end();
});});}).listen(1345, '0.0.0.0');
console.log('Server running at http00.0.0.1:1345:'); 