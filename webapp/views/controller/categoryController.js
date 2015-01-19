"use strict";

define(['application-configuration','ajaxService'], function (app) {
	//Register controller
    app.register.controller('categoryController', ['$scope',  '$rootScope','$routeParams', 'ajaxService',function ($scope,  $rootScope,$routeParams,ajaxService) {
    	//Initialize controller    	
        $scope.initializeController = function () {
            //Get All categories
            ajaxService.AjaxGet("/api/getAllCategories", function(data){$scope.posts=data;},function(data){} );
        }
        $scope.getAllPostByCategory = function(){
        	$scope.categoryid = $routeParams.categoryid;            
            var data = {'categoryid': $scope.categoryid};           
            ajaxService.AjaxGetWithData(data, "/api/getAllPostForCategory", function(data){$scope.posts=data;},function(data){} );
        }
    }]);
});
