var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1');

var Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean
});

module.exports = {
	
	find: function(callback){
        Todo.find(function(err, todos){
           callback(null, todos);
        });
	},
	create: function(todo, callback){
        Todo.create(todo, function(err, todo){
            module.exports.find(callback);
        });
	},
	remove: function(todo, callback) {
        Todo.remove(todo, function (err) {
            module.exports.find(callback);
        })
	}
};
