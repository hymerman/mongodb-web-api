var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

var client = MongoClient.connect(process.argv[2], function(err, db) {
	if(err) throw err;

	console.log("Connected to mongodb");

	// todo: add options and fields arguments to find.
	var queryCollection = function(req, res) {
		db.collection(req.params.collection)
			.find(JSON.parse(req.query.query))
			.toArray(function(err, docs) {
				res.send(JSON.stringify(docs));
			});
	}

	// todo: add insert operation.
	// todo: add update operation.
	// todo: add aggregate operation.

	app.get('/query/:collection', queryCollection);

	app.listen(3000);

	console.log("Express server listening on port %d in %s mode", 3000, app.settings.env);
});
