"use strict";
define(['angularAMD','angular-route','blockUI',"angular-sanitize"], function (angularAMD) {	
	var app = angular.module("mainModule", ['ngRoute','blockUI',"ngSanitize"]);	
	app.config(['$routeProvider' ,function($routeProvider) {
		  $routeProvider
		  .when('/', angularAMD.route({templateUrl: function (rp) {return 'views/pages/default.html';  },controllerUrl: "views/controller/defaultController"}))		  		  
		  .when('/login', angularAMD.route({templateUrl: function (rp) {return 'views/accounts/login.html';  },controllerUrl: "views/accounts/loginController"}))
		  .when('/:user', angularAMD.route({templateUrl: function (rp) {return 'views/pages/profile.html';  },controllerUrl: "views/controller/profileController"}))
		  .when('/profile/:user/:categoryid', angularAMD.route({templateUrl: function (rp){return 'views/pages/userPostForCategory.html';},controllerUrl: "views/controller/postController"}))		  
		  .when('/post/:user/:postid', angularAMD.route({templateUrl: function (rp){return 'views/pages/post.html';},controllerUrl: "views/controller/postController"}))		  
		  .when('/editpost/:user/:postid', angularAMD.route({templateUrl: function (rp){return 'views/pages/editpost.html';},controllerUrl: "views/controller/postController"}))
		  .when('/newpost/id', angularAMD.route({templateUrl: function (rp){return 'views/pages/newpost.html';},controllerUrl: "views/controller/postController"}))
		  .when('/category/:categoryid', angularAMD.route({templateUrl: function (rp){return 'views/pages/category.html';},controllerUrl: "views/controller/categoryController"}))
	      .otherwise({redirectTo: '/'});		
		}]);
	
	
		//Whenever there is a change to routing,call this with reload as false.
		//This will change the url without reloading the page.
		app.run([
			'$route',
			'$rootScope',
			'$location',
			function($route, $rootScope, $location) {
				var original = $location.path;
				$location.path = function(path, reload) {
					if (reload === false) {
						var lastRoute = $route.current;
						var un = $rootScope.$on(
								'$locationChangeSuccess', function() {
									$route.current = lastRoute;
									un();
								});
					}
					return original.apply($location, [ path ]);
				};
			} ]);
	
	 app.config(function (blockUIConfigProvider) {
	        // Change the default overlay message
	        blockUIConfigProvider.message("executing...");
	        // Change the default delay to 100ms before the blocking is visible
	        blockUIConfigProvider.delay(1);
	        // Disable automatically blocking of the user interface
	        blockUIConfigProvider.autoBlock(false);

	    });
	
	//Bootstrap Angular when DOM is ready    
	//After this one gets called,all routing will be called.
	 angularAMD.bootstrap(app);
	 return app;
});