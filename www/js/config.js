var ESTIMATOR = {
    APP_VERSION: "0.0.0",
    APP_NAME: "estimator",
    MESSAGES: "ESTIMATOR_MESSAGES",
    CONSTANTS: "ESTIMATOR_CONSTANTS",
    MODULE_NAMES: {
        CONTROLLERS: "estimator.controllers",
        FACTORIES: "estimator.factories",
        DIRECTIVES: "estimator.directives",
        UTILS: "estimator.utils",
        MESSAGES: "estimator.messages",
        CONSTANTS: "estimator.constants",
        LOGGER: "Logger",
        LOCAL_STORAGE: "LocalStorage"
    },
    CONTROLLERS: {
        LoginController: "LoginController",
        LandingController: "LandingController",
        SideMenuController: "SideMenuController",
        FormController: "FormController"
    },
    FACTORIES: {
        LoginFactory: "LoginFactory",
        Logger: "Logger",
        LocalStorage: "LocalStorage",
        LandingFactory: "LandingFactory"
    },
    STATES: {
        LOGIN: {
            name: 'login',
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController',
            factory: 'LoginFactory',
            cache: false
        },
        SIDEMENU: {
            name: 'app',
            url: '/app',
            templateUrl: 'templates/menu.html',
            controller: 'SideMenuController'
        },
        LANDING: {
            name: 'app.dashboard',
            url: '/dashboard',
            templateUrl: 'templates/landing.html',
            controller: 'LandingController',
            factory: 'LandingFactory',
            cache: false,
        },
        FORM1: {
            name: 'app.form1',
            url: '/form1',
            templateUrl: 'templates/forms/form1.html',
            controller: 'FormController',
            cache: false,
        }
    },
    BACK_END: {
        MethodName: {
            "getLoggedInUserDetails": "login"
        },
        RequestType: {
            GET: "GET",
            POST: "POST"
        },
        ResponseType: {
            SUCCESS: "success",
            ERROR: "error"
        },
        ERROR_CODES: {
            NETWORK_ERROR: "NETWORK_ERROR",
            UNAUTHORIZED: "UNAUTHORIZED",
            NOTFOUND: "NOTFOUND",
            SERVERERROR: "SERVER_ERROR",
            INVALID: "INVALID_RESPONSE"
        }
    },
    LOCAL_STORAGE: {
        KEYS: {
            USERNAME: "USERNAME",
            PASSWORD: "PASSWORD"
        }
    }
}

var controllers = angular.module(ESTIMATOR.MODULE_NAMES.CONTROLLERS, []);
var factories = angular.module(ESTIMATOR.MODULE_NAMES.FACTORIES, []);
var directives = angular.module(ESTIMATOR.MODULE_NAMES.DIRECTIVES, []);
var utils = angular.module(ESTIMATOR.MODULE_NAMES.UTILS, [ESTIMATOR.MODULE_NAMES.LOGGER, ESTIMATOR.MODULE_NAMES.LOCAL_STORAGE]);
var messages = angular.module(ESTIMATOR.MODULE_NAMES.MESSAGES, []);
var constants = angular.module(ESTIMATOR.MODULE_NAMES.CONSTANTS, []);
var logger = angular.module(ESTIMATOR.MODULE_NAMES.LOGGER, []);
var localStorage = angular.module(ESTIMATOR.MODULE_NAMES.LOCAL_STORAGE, []);
