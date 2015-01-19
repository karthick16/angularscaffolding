"use strict";

define(['application-configuration','ajaxService'], function (app) {
	//Register controller
    app.register.controller('defaultController', ['$scope',  '$rootScope','ajaxService', function ($scope,  $rootScope,ajaxService) {    	
    	$rootScope.showPost = true;
    	console.log("ajaxService", ajaxService);
    	//Initialize controller
        $scope.initializeController = function () {        	
        	//Move this out somewhere to a common service
        	ajaxService.AjaxGet("/api/getFeaturedProfiles", $scope.getFeaturedSuccess, $scope.getFeaturedFailure);
        	ajaxService.AjaxGet("/api/getAllCategories", function(data){$scope.categories=data;},function(data){} );
           
        }  ,
        //Get Details Success callback
        $scope.getFeaturedSuccess = function(data){
        	$scope.featuredProfileList = data;
        	//console.log(data);
        },
        //Get Details Failure callback
        $scope.getFeaturedFailure = function(){
        	
        }
    	
        $scope.togglePostOrCategory = function(key){
        	console.log("key" , key=='category');
        	console.log("key" , key=='post');
        	
			if(key == 'post'){
				$rootScope.showPost = true;				
	    	}
	    	if(key == 'category'){
	    		$rootScope.showPost = false;
	    	}
        }
        
    }]);
});
