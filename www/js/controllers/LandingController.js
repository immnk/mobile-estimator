controllers.controller(ESTIMATOR.CONTROLLERS.LandingController, LandingController);

LandingController.$inject = ['$scope', '$state', 'utils', ESTIMATOR.FACTORIES.LandingFactory];

function LoginController($scope, $state, utils, LoginFactory) {

    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " - init :start");

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " - init :end");
    }
}
