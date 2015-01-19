require.config({	
    baseUrl: "",

    // alias libraries paths
    paths: {
        'application-configuration': 'scripts/app/boostrapApp',
        'angular': 'scripts/vendor/angular',
        'angular-route': 'scripts/vendor/angular-route',
        'angularAMD': 'scripts/vendor/angularAMD',
        'ajaxService': 'services/ajaxServices',
        'blockUI': 'scripts/vendor/angular-block-ui',
        'angular-sanitize' : 'scripts/vendor/angular-sanitize'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {       
    	'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-sanitize' : ['angular'],
        'blockUI': ['angular']  
    },

    // kick start application
    deps: ['application-configuration']
});

/*/// <reference path="Scripts/ui-bootstrap-tpls-0.11.0.js" />
/// <reference path="Scripts/ui-bootstrap-tpls-0.11.0.js" />
/// <reference path="Scripts/ui-bootstrap-tpls-0.11.0.js" />
require.config({	
    baseUrl: "",

    // alias libraries paths
    paths: {
        'application-configuration': 'scripts/app/boostrapApp',
        'angular': 'scripts/angular',
        'angular-route': 'scripts/angular-route',
        'angularAMD': 'scripts/angularAMD',
         'ui-bootstrap' : 'scripts/ui-bootstrap-tpls-0.11.0',
        'blockUI': 'scripts/angular-block-ui',
        'ngload': 'scripts/ngload',
        'mainService': 'services/mainServices',
        'ajaxService': 'services/ajaxServices',
        'alertsService': 'services/alertsServices',
        'accountsService': 'services/accountsServices',
        'customersService': 'services/customersServices',
        'ordersService': 'services/ordersServices',
        'productsService': 'services/productsServices',
        'dataGridService': 'services/dataGridService',
        'angular-sanitize': 'scripts/angular-sanitize',
        'customersController': 'Views/Shared/CustomersController',
        'productLookupModalController': 'Views/Shared/ProductLookupModalController'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'blockUI': ['angular'],
        'angular-sanitize': ['angular'],
        'ui-bootstrap': ['angular']

    },

    // kick start application
    deps: ['application-configuration']
});
*/