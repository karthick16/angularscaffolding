var config = require(__dirname + '/../../config.js');


var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
	postid: String,
	postTitle: String,
	postHeroTitle: String,
	postBody:String,
	userid:String,
	cat:String
});
var Post = mongoose.model('Post', postSchema);

/**
var PostDummy = new Post({
	postid: '230293',
	postTitle: 'First post creating post model',
	postHeroTitle: '',
	userid : 'karthikrenkarajan',
	postBody : 'Karthik adding this to html',
	cat:'10003'
});

PostDummy.save(function(err, thor) { 
if (err) return console.error(err);
console.dir(thor);
});
**/

 
var postModel = {
		 /* 
	     * @author Arya <arya@cubettech.com>
	     * @Date 29-10-2013
	     * @return details details of all users
	     */
		getAllFeaturedPost: function(key,callback)
	    {
			Post.find({},
					function(err, result) {
				  if (!err) {					  		
					callback(result);
				} else {
					console.log("Error in GetAllFeaturedPost--> " , err);
					callback(result);
				}
			});
	    },
	    /**
	     * Get post by id and user name
	     */
	    getPostById: function(userid,postid,callback)
	    {
			Post.find({"userid":userid,"_id":postid},
					function(err, result) {
				  if (!err) {					  		
					callback(result);
				} else {
					console.log("Error in getPostById--> " , err);
					callback(result);
				}
			});
	    },
	    /***
	     * @author krenkara
	     * Get all the posts for this user for a given category
	     */
	    getUserPostByCategoryId: function(userid,catid,callback)
	    {
			Post.find({'cat':catid,'userid':userid},
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
	     * Get All the post for this category.Not user specific
	     */
	    getAllPostByCategoryId: function(catid,callback)
	    {
			Post.find({'cat':catid},
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
	     * Save a new post
	     */
	    saveNewPost: function(postTemp,callback)
	    {
	    	var newPost = new Post({
			    		  postTitle : postTemp.postTitle,
			    		  userid : 'karthikrenkarajan',
			    		  postBody : postTemp.postContent,
			    		  postHeroTitle : postTemp.postHeroTitle,
			    		  cat : postTemp.categoryId,  	
	    		});
	    	newPost.save(function(err, result) {
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
	     * Update a new post
	     */
	    updatePost: function(postTemp,callback)
	    {	
	    	//console.log("Update Post in PostModel" , postTemp);
	    	var conditions = { '_id': postTemp.postid };
	    	var update = { $set: { 'postTitle': postTemp.postTitle ,'postBody' :  postTemp.postContent,'cat': postTemp.categoryid}};
	    	var options = { upsert: true };
	    	Post.update(conditions, update, options, function(err, result) {	    	
				  if (!err) {					  	
					  console.log("Post updated successfully");
					callback(result);
				} else {
					console.log("Error in Update Post--> " , err);
					callback(result);
				}
			});
	    },
	    /**
	     * Get New Post id
	     */
	    getNewPostId : function(postTemp, callback) {
			var newPost = new Post({
				userid : postTemp.userId				
			});
			newPost.save(function(err, result) {				
				console.log("####### postId-->: ", result._id);
				if (!err) {
					callback(result);
				} else {
					console.log("Error in getNewPostId--> ", err);
					callback(result);
				}
			});
	    },
}


module.exports = postModel;