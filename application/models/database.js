var config = require(__dirname + '../../../config.js');
var mongoose = require('mongoose');


exports.connect = function(callback) {
	console.log("Connecting to database...");
	mongoose.connect(config.database);

	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection error:'));
	db.once('open', function() {
		console.log("Connected !");
		callback();
	});
};



//Create Collections in DB


exports.postModel = require('./postModel.js');
exports.userModel = require('./userModel.js');
exports.categoryModel = require('./categoryModel.js');
