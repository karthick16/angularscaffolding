/*

.controller('MainCtrl', function($scope, ezfb, $window, $location) {
  
  updateLoginStatus(updateApiMe);

  $scope.login = function () {
    ezfb.login(function (res) {
      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
		console.log(res.authResponse.userID);
		$location.path("/" + res.authResponse.userID);
      }
    }, {scope: 'email,user_likes'});
  };

  $scope.logout = function () {
    ezfb.logout(function () {
      updateLoginStatus(updateApiMe);
    });
  };

  var autoToJSON = ['loginStatus', 'apiMe']; 
  angular.forEach(autoToJSON, function (varName) {
    $scope.$watch(varName, function (val) {
      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
    }, true);
  });
  
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginStatus = res;
	  console.log($scope.loginStatus);
	  //console.log($scope.loginStatus.authResponse.userID);
      (more || angular.noop)();
    });
  }

  function updateApiMe () {
    ezfb.api('/me', function (res) {
      $scope.apiMe = res;
    });
  }
});

*/

"use strict"
define(['application-configuration', 'ajaxService'], function (app){
	console.log("Inside app");
	//Register controller
	app.register.controller('loginController', ['$scope', 'facebook', function($scope, ajaxService, facebook){
		console.log("loginController");
		
		$scope.loginStatus = 'disconnected';
		$scope.facebookIsReady = false;
		$scope.user = null;

		$scope.login = function () {
			console.log("success in login");
			facebook.Facebook.login(function(response) {
			  $scope.loginStatus = response.status;
			  console.log('loginStatus ' + $scope.loginStatus);
			});
		};

		$scope.removeAuth = function () {
			facebook.Facebook.api({
			  method: 'Auth.revokeAuthorization'
			}, function(response) {
			  facebook.Facebook.getLoginStatus(function(response) {
				$scope.loginStatus = response.status;
			  });
			});
		};

		$scope.api = function () {
			facebook.Facebook.api('/me', function(response) {
			  $scope.user = response;
			});
		};

		$scope.$watch(function() {
			return facebook.Facebook.isReady();
			}, function(newVal) {
			  if (newVal) {
				$scope.facebookIsReady = true;
			  }
			}
		);	
	}]);
});


/*
"use strict"
define(['application-configuration','ajaxService', 'ezfb'], function (app){
	//Register controller
	app.register.controller('loginController', ['$scope', '$rootScope', '$window', '$location', 'ezfb', function($scope, $rootScope, ajaxService, ezfb){
	  
		updateLoginStatus(updateApiMe);

		$scope.login = function () {
			ezfb.login(function (res) {
			  if (res.authResponse) {
				updateLoginStatus(updateApiMe);
				console.log(res.authResponse.userID);
				$location.path("/" + res.authResponse.userID);
			  }
			}, {scope: 'email,user_likes'});
		};

		$scope.logout = function () {
			ezfb.logout(function () {
			  updateLoginStatus(updateApiMe);
			});
		};

		var autoToJSON = ['loginStatus', 'apiMe']; 
		angular.forEach(autoToJSON, function (varName) {
			$scope.$watch(varName, function (val) {
			  $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
			}, true);
		});

		function updateLoginStatus (more) {
			ezfb.getLoginStatus(function (res) {
			  $scope.loginStatus = res;
			  console.log($scope.loginStatus);
			  //console.log($scope.loginStatus.authResponse.userID);
			  (more || angular.noop)();
			});
		}	

		function updateApiMe () {
			ezfb.api('/me', function (res) {
			  $scope.apiMe = res;
			});
		}		
	}]);
});
*/