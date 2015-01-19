"use strict";

define(['application-configuration','ajaxService'], function (app) {
	
	
	//Register controller
    app.register.controller('postController', ['$scope', '$location', '$rootScope','$routeParams', 'ajaxService',function ($scope,$location,$rootScope,$routeParams,ajaxService) {
    	var bodyEditor,titleEditor,heroEditor;
    	
    	//Initialize controller
        $scope.initializeController = function () {             
        	$scope.userid = $routeParams.user;
        	$scope.postid = $routeParams.postid;
            var data = {'userid': $scope.userid , 'postid':$scope.postid};
            //Move this out somewhere to a common service
            ajaxService.AjaxGetWithData(data, "/api/getPost", $scope.getDetailsSuccess, $scope.getDetailsFailure);
           
        }
        //Get Details Success callback
        $scope.getDetailsSuccess = function(data){
        	console.log("Got the details success" , data);
        	$scope.post = data;
        }
        //Get Details Failure callback
        $scope.getDetailsFailure = function(){
        	
        }
        //Add a new Post.
        $scope.newPostInit = function(){   
        	//For the new post ,get the userid from the url
        	$scope.userid = 'karthikrenkarajan';        	
        	var data = {'userid': $scope.userid};
        	//Generate new post id
        	ajaxService.AjaxGetWithData(data, "/api/generatePostId", function(data){
        		var temp = data._id;        		
        		$scope.newpostid = temp.valueOf();
        		console.log("New Post Id Generated" , $scope.newpostid);        	
        		var path = '/post/karthikrenkarajan/'+  $scope.newpostid;
        		console.log("path: " , path);
        		$location.path( path, false );
        		initializeEditorsNewPost($scope.newpostid);
        		//Get all the categories for user to select the category id.
        		ajaxService.AjaxGet("/api/getAllCategories", function(data){
        			$scope.categories=data;
        			//$scope.selectedCategoryId = $scope.categories['10003'];
        		},function(data){} );
        		
    		}, 
    		function(){}
        	);
        }  
        /**
         * For editing a post
         */
        $scope.editPostInit = function(){
        	$scope.userid = $routeParams.user;
        	$scope.postid = $routeParams.postid;
            var data = {'userid': $scope.userid , 'postid':$scope.postid};
	            //Move this out somewhere to a common service
	            ajaxService.AjaxGetWithData(data, "/api/getPost", function(data){
	            	$scope.post = data;
	            	console.log("Scope.category id" , $scope.post);
	            	//Get all the categories for user to select the category id.
	        		ajaxService.AjaxGet("/api/getAllCategories", function(data){
	        			$scope.categories=data;
	        			$scope.selectedCategoryId = $scope.categories[10006];
	        		},function(data){} );
	    		}, 
	    		function(){}
	        	);
        	
        	$scope.userid = $routeParams.user;
       	 	$scope.postid = $routeParams.postid;       	 	
       	 	initializeEditorsEditPost($scope.postid);
        }
        /**
         * User post for Category 
         */
        $scope.userPostForCategory =function(){        	
        	$scope.userid = $routeParams.user;
       	 	$scope.categoryid = $routeParams.categoryid;            
            var data = {'userid': $scope.userid,'categoryid':$scope.categoryid};
            //Move this out somewhere to a common service
            ajaxService.AjaxGetWithData(data, "/api/getUserPostForCategory", 
            		function(data){
            			console.log("Got the details success" , data);
            			//	TODO if the post is multiple,we got to change this.
            			$scope.posts = data;
            		}, 
            		function(){}
            );
        } 
        /**
         * Save or Update User post.This includes images and DOM
         */
        $scope.saveOrUpdatePost = function(postid){        	
        	//Sanitizing the editable block
        	//$('.editable').find('.mediumInsert').removeClass('mediumInsert');        	
        	var postContent = bodyEditor.serialize();        	
        	var postTitle = titleEditor.serialize();
        	var body = postContent['element-0'].value;
        	var title = postTitle['element-0'].value;
        	var categoryId = $scope.selectedCategoryId;
        	console.log("categoryId in SaveOrUpdatePOst--->" , categoryId);
        	var data={"postContent" : body,"postTitle" : title,"postid" : $scope.postid,"categoryid" : categoryId};
        	console.log("data in SaveOrUpdatePOst--->" , data);
        	ajaxService.AjaxPost(data, "/api/updatePost", 
            		function(data){
    			console.log("Update Post successful--> " , data);
    			//	TODO if the post is multiple,we got to change this.
    			$scope.result = data;
    		}, 
    		function(){}
        	);
        }
        /**
         * Save or Update User post.This includes images and DOM
         */
        $scope.createNewPost = function(postid){        	
        	var postContent = bodyEditor.serialize();
        	var postTitle = titleEditor.serialize();
        	var body = postContent['element-0'].value;
        	var title = postTitle['element-0'].value;        
        	var categoryId = $scope.selectedCategoryId;        	
        	var data={"postContent" : body,"postTitle" : title,"postid" : $scope.newpostid,"categoryid" : categoryId};        	
        	ajaxService.AjaxPost(data, "/api/updatePost", 
            		function(data){
    			console.log("Update Post successful--> " , data);
    			//	TODO if the post is multiple,we got to change this.
    			$scope.result = data;
    		}, 
    		function(){}
        	);
        }
       /**
        * For Existing post,activate the medium post.
        */
        function initializeEditorsEditPost(postid){
    		//Initialize Medium Editors
            bodyEditor = new MediumEditor('.editable' , {placeholder : ''});   
             
        	titleEditor = new MediumEditor('.title-editable', {
        		disableToolbar : false,
        		placeholder : ''
        	});    	
        	heroEditor  = new MediumEditor('.heroEditable' , {placeholder : 'Update Story pic'});
     	 //Initialize medium insert editor
    	  $('.editable').mediumInsert({
    	    editor: bodyEditor,
    	    enable : true,
    	    addons: {
    	      images: {
    	    	  heroImage :false,
    	    	  imagesUploadScript:'/upload?postid=' + postid
    	      }		      		      
    	    }
    	  });
    	  $('.heroEditable').mediumInsert({
      		editor : heroEditor,
       	    addons: {
       	    	images: {  
       	    	  imagesUploadScript:'/upload?postid=' + postid
       	      }		      		      
       	    }
       	  });    	 
    	}    
        
        /**
         * For New Post activate the medium plugin
         */
        function initializeEditorsNewPost(postid){
    		//Initialize Medium Editors
            bodyEditor = new MediumEditor('.editable' , {});   
             
        	titleEditor = new MediumEditor('.title-editable', {
        		disableToolbar : false,
        		placeholder : 'Title'
        	});    	
        	heroEditor  = new MediumEditor('.heroEditable' , {placeholder : 'click here for profile pic'});
     	 //Initialize medium insert editor
    	  $('.editable').mediumInsert({
    	    editor: bodyEditor,
    	    enable : true,
    	    addons: {
    	      images: {
    	    	  heroImage :false,
    	    	  imagesUploadScript:'/upload?postid=' + postid
    	      }		      		      
    	    }
    	  });
    	  $('.heroEditable').mediumInsert({
      		editor : heroEditor,
       	    addons: {
       	    	images: {  
       	    	  imagesUploadScript:'/upload?postid=' + postid
       	      }		      		      
       	    }
       	  });    	 
    	}    
    	
    }]);
});
