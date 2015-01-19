/**
 * Routes for getting users.
 */
exports.createRoutes = function (app,dataModel) {
	app.get("/api/getAllCategories", function (req, res) {
		dataModel.categoryModel.getAllCategories("",function (categories, err) {	
			res.send(categories);
		});	
	});	
	
	
	
}