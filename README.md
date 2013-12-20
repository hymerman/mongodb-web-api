mongodb-web-api
===============

Simple server providing operations on a mongodb database through a web interface
Uses Express for routing
Provides just simple query API for now;
MongoDB query object is taken from query parameter of URL
MongoDB URL is taken as first command line argument

Example usage:

// Start mongodb
$ mongod
... various mongodb output

// Start mongodb-web-api
$ node server.js mongodb://localhost:27017/my-database
Connected to mongodb
Express server listening on port 3000 in development mode

// Make a request, with query params urlencoded. This query is {"name":"Ben"}.
$ curl http://localhost:3000/query/my-collection?query=%7B%22name%22%3A%22Ben%22%7D
[{"_id":"52b470fd5c1308d75a56590c","name":"Ben","coolness":100}]
