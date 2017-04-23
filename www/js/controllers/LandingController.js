controllers.controller(ESTIMATOR.CONTROLLERS.LandingController, LandingController);

LandingController.$inject = ['$scope', '$state', 'utils', ESTIMATOR.FACTORIES.LandingFactory];

function LandingController($scope, $state, utils, LandingFactory) {
    /* jshint validthis: true */
    var vm = this;
    vm.navigateToForm1 = navigateToForm1;
    
    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " - init :start");

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " - init :end");
    }

    function navigateToForm1() {
    	utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " :navigateToForm1 - start");
    	$state.go(ESTIMATOR.STATES.FORM1.name);
    	utils.Logger.debug(ESTIMATOR.CONTROLLERS.LandingController + " :navigateToForm1 - end");
    }
}
