controllers.controller(ESTIMATOR.CONTROLLERS.LandingController, LandingController);

LandingController.$inject = ['$scope', '$state', 'utils', ESTIMATOR.FACTORIES.LandingFactory];

function LandingController($scope, $state, utils, LandingFactory) {

    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " - init :start");

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " - init :end");
    }
}
