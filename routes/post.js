//http://www.sebastianseilund.com/nodejs-async-in-practice
var async = require('async');
var imgsrc = "assets/img/seed/";

/**
 * Routes for getting different kinds of post.
 */
exports.createRoutes = function (app,dataModel) {
	app.get("/api/getFeaturedProfiles", function (req, res) {		
		var postArr=[];
		dataModel.postModel.getAllFeaturedPost("",function (posts, err) {			
			async.each(posts, function(post, callback) {
				var postTemp = {
						postid: post._id,
						postTitle: post.postTitle,
						postBody : post.postBody,
						userid:post.userid,
						cat:post.cat						
					};				
				dataModel.userModel.getUserDetails(post.userid, function (user, err) {
					if( err ) { return callback(err); }					
					postTemp.name=user[0].name;
					postTemp.email=user[0].email;
					dataModel.categoryModel.getCategoryById(post.cat, function (category, err) {
						//console.log("category",category);
						if(category[0] != null || category[0] != undefined){
							postTemp.categoryname=category[0].categoryname;	
							postTemp.categoryid=category[0].categoryid;
							//console.log("postTemp" , postTemp);	
						}
						callback();
					});
					postArr.push(postTemp);
				});			    
			}, function(err) {
			    if( err ) { return console.log(err); }
			    //console.log('All executed properly',postArr);
			    res.send(postArr);
			});
		});	
	});	
	//Get post based on post id.
	app.get("/api/getPost", function (req, res) {
		var userid =req.param('userid');		
		var postid =req.param('postid');		
		dataModel.postModel.getPostById(userid,postid,function (post, err) {
			//console.log("Post" , post);
			var postTemp = {
					postid: post[0]._id,
					postTitle: post[0].postTitle,	
					postBody : post[0].postBody,
					postHeroTitle : post[0].postHeroTitle,
					userid:post[0].userid,
					cat:post[0].cat					
				};	
			dataModel.userModel.getUserDetails(post[0].userid, function (user, err) {
				if( err ) { return callback(err); }					
				postTemp.name=user[0].name;
				postTemp.email=user[0].email;
				dataModel.categoryModel.getCategoryById(post[0].cat, function (category, err) {
					console.log("Category" , category);
					postTemp.categoryname=category[0].categoryname;	
					postTemp.categoryid=category[0].categoryid;
					res.send(postTemp);
				});
			});
		});
	});
	/**
	 * Get all the post for a specific user for a category.
	 */
	app.get("/api/getUserPostForCategory", function (req, res) {
		var userid =req.param('userid');		
		var categoryid=req.param('categoryid');
		var postArr=[];
		dataModel.postModel.getUserPostByCategoryId(userid,categoryid,function (posts, err) {			
			async.each(posts, function(post, callback) {	
				var postTemp = {
						postid: post._id,
						postTitle: post.postTitle,	
						postBody : post.postBody,
						userid:post.userid,
						cat:post.cat						
					};				
				dataModel.userModel.getUserDetails(post.userid, function (user, err) {
					if( err ) { return callback(err); }					
					postTemp.name=user[0].name;
					postTemp.email=user[0].email;
					dataModel.categoryModel.getCategoryById(post.cat, function (category, err) {
						//console.log("category",category);
						postTemp.categoryname=category[0].categoryname;	
						postTemp.categoryid=category[0].categoryid;
						postTemp.categorydesc=category[0].description;
						//console.log("postTemp" , postTemp);
						callback();
					});
					postArr.push(postTemp);
				});			    
			}, function(err) {
			    if( err ) { return console.log(err); }
			    //console.log('All executed properly',postArr);
			    res.send(postArr);
			});
		});	
	});		
	/**
	 * Get all the post for a given category irrespective of users.
	 * 
	 */
	app.get("/api/getAllPostForCategory", function (req, res) {
		var categoryid=req.param('categoryid');
		var postArr=[];
		dataModel.postModel.getAllPostByCategoryId(categoryid,function (posts, err) {
			res.send(posts);
		});
	});
		
	/**
	 * Get all the post for a given category irrespective of users.
	 * 
	 */
	app.post("/api/updatePost", function (req, res) {
		//Post object to be sent to server.
		var postTemp = new Object();
		postTemp.postContent = req.param('postContent');
		postTemp.postTitle = req.param('postTitle');		
		postTemp.postid =  req.param('postid');
		postTemp.postHeroTitle = req.param('postHeroTitle');
		postTemp.categoryid = req.param('categoryid');
		//Save the new post now
		dataModel.postModel.updatePost(postTemp,function (result, err) {
			console.log("Updating post ");
			res.send(result);
		});
	});		
	//Generate post id
	app.get("/api/generatePostId", function(req, res) {		
		var userid = req.param('userid');
		console.log("userid: ", userid);
		var postid = req.param('postid');
		if (userid) {
			// Post object to be sent to server.
			var postTemp = new Object();
			postTemp.userId = userid;
			// Save the new post now
			dataModel.postModel.getNewPostId(postTemp, function(result, err) {
				console.log("Saving new post 23 ", result);
				res.send(result);
			});
		}
	});
	
}