var pg = require('pg');
var connectionString = "postgres://postgres:password@localhost:5432/todo";

module.exports = {
	
	find: function(callback){
        const results = [];
        pg.connect(connectionString, function(err, client, done){
            var query = client.query("select * from todos");

            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                return callback(null, results);
            });
        });
	},

	create: function(todo, callback){
        pg.connect(connectionString, function(err, client, done){
            var query = client.query('INSERT INTO todos(text) values($1)', [todo.text]);
            query.on('end', function() {
                done();
                module.exports.find(callback);
            });
        });
	},

	remove: function(todo, callback) {
        pg.connect(connectionString, function(err, client, done){
            var query = client.query('DELETE FROM todos WHERE id=$1', [todo.id]);
            query.on('end', function() {
                done();
                module.exports.find(callback);
            });
        });
	}
};
