"use strict";

define(['application-configuration','ajaxService'], function (app) {
	//Register controller
    app.register.controller('profileController', ['$scope',  '$rootScope','$routeParams', 'ajaxService',function ($scope,  $rootScope,$routeParams,ajaxService) {    	
    	//Initialize controller
        $scope.initializeController = function () {
           $scope.userid = $routeParams.user;
           console.log("$scope.detailsId" , $scope.userid);
           var data = {'userid': $scope.userid};           
           ajaxService.AjaxGetWithData(data, "/api/getUserProfile", $scope.getDetailsSuccess, $scope.getDetailsFailure);           
           //Get All categories
           ajaxService.AjaxGet("/api/getAllCategories", function(data){$scope.categories=data;},function(data){} );
        }
        //Get Details Success callback
        $scope.getDetailsSuccess = function(data){
        	console.log("Got the details success" , data);
        	$scope.user = data;
        }
        //Get Details Failure callback
        $scope.getDetailsFailure = function(){
        	
        }
    }]);
});
