const mongoose = require('mongoose');
require('./locations');

var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
   var url_parts = url.parse(req.url, true);
   var query = url_parts.query;

   var latitude = query.lat;
   var longitude = query.lon;
   var user = query.nome;

   // Retrieve
   var MongoClient = require('mongodb').MongoClient;

   // MongoDB connection
   MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
      if(err) { return console.dir(err); }

   // Choose a passengers collection
   var collection = db.collection('passengers');
   var doc = {
	name: user,
	loc: {
   type: Point,
	coordinates: [125.6, 10.1]
	}};

	collection.insert(doc , { w: 0 });

	});}).listen(1346, '0.0.0.0');

console.log('Server running at http 0.0.0.0:1346:'); 