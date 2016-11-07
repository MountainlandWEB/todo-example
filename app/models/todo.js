var MongoClient = require('mongodb').MongoClient;
var ObjectId = require("mongodb").ObjectId;
var assert = require('assert');
var url = 'mongodb://localhost/test1';

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
	
	find: function(callback){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            var collection = db.collection("todos");
            collection.find({}).toArray(function(err, todos){
                assert.equal(err, null);
                callback(null, todos);
                db.close();
            });
        });
	},
	create: function(todo, callback){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            var collection = db.collection("todos");
            collection.insertOne(todo);
            db.close();
            module.exports.find(callback);
        });
	},
	remove: function(ids, callback)
	{
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            var collection = db.collection("todos");
            ids._id = new ObjectId(ids._id);
            collection.removeMany(ids);
            db.close();
            module.exports.find(callback);
        });
	}
};
