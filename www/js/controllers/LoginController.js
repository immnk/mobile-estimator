controllers.controller(ESTIMATOR.CONTROLLERS.LoginController, LoginController);

LoginController.$inject = ['$scope', '$state', 'utils', '$timeout', ESTIMATOR.FACTORIES.LoginFactory];

function LoginController($scope, $state, utils, $timeout, LoginFactory) {

    /* jshint validthis: true */
    var vm = this;

    vm.loginFormObject = {
        username: '',
        password: ''
    }

    vm.loginFormSubmit = loginFormSubmit;

    function loginFormSubmit(loginForm, force) {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LoginController + " - loginFormSubmit: start");

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LoginController + " - loginFormSubmit: end");
    }

    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LoginController + " - init :start");

        utils.showSpinner();
        $timeout(function() {
            utils.hideSpinner();
            $state.go(ESTIMATOR.STATES.LANDING.name);
        }, 1000);

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LoginController + " - init :end");
    }
}
