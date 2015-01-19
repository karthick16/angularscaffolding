var config = require(__dirname + '/../../config.js');


var mongoose = require('mongoose');
var cateorySchema = mongoose.Schema({
	categoryid: String,
	categoryname: String
});
var Category = mongoose.model('category', cateorySchema);


/*var CategoryDummy = new Category({
	categoryid: '10001',
	categoryname: 'music'	
});

CategoryDummy.save(function(err, thor) {
if (err) return console.error(err);
console.dir(thor);
});*/




var  categoryModel = {
		/**
		 * Get all categories
		 */ 
		getAllCategories: function(key,callback)
	    {
			Category.find({},
					function(err, result) {
				  if (!err) {					  		
					callback(result);
				} else {
					console.log("Error in GetAllFeaturedPost--> " , err);
					callback(result);
				}
			});
	    },
	    /***
	     * @author krenkara
	     * Find category Id 
	     */
	    getCategoryById: function(catid,callback)
	    {
			Category.find({'categoryid':catid},
					function(err, result) {
				  if (!err) {					  		
					callback(result);
				} else {
					console.log("Error in GetAllFeaturedPost--> " , err);
					callback(result);
				}
			});
	    },
	    
}


module.exports = categoryModel;