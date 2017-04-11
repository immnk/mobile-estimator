// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module(ESTIMATOR.APP_NAME, ['ionic', 'ngAnimate', 
    ESTIMATOR.MODULE_NAMES.CONTROLLERS,
    ESTIMATOR.MODULE_NAMES.FACTORIES, ESTIMATOR.MODULE_NAMES.UTILS,
    ESTIMATOR.MODULE_NAMES.DIRECTIVES, ESTIMATOR.MODULE_NAMES.MESSAGES,
    ESTIMATOR.MODULE_NAMES.CONSTANTS
])

.run(['$ionicPlatform', 'utils', function($ionicPlatform, utils) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            utils.init();
        });
    }])
    .config(['$stateProvider', '$urlRouterProvider', ConfigInitiator]);

function ConfigInitiator($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state(ESTIMATOR.STATES.LOGIN.name, {
            url: ESTIMATOR.STATES.LOGIN.url,
            templateUrl: ESTIMATOR.STATES.LOGIN.templateUrl,
            controller: ESTIMATOR.STATES.LOGIN.controller,
            controllerAs: 'vm',
            cache: ESTIMATOR.STATES.LOGIN.cache
        })

    $urlRouterProvider.otherwise(ESTIMATOR.STATES.LOGIN.url);
}
