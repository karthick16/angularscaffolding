/**
 * Routes for getting users.
 */
exports.createRoutes = function (app,dataModel) {
	app.get("/api/getUserProfile", function (req, res) {		
		//Get User Details like About me,Pics,group posts by Category etc.
		dataModel.userModel.getUserDetails(req.param('userid'),function (user, err) {
			res.send(user[0]);
		});
		
	});
}