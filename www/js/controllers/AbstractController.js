controllers.controller(ESTIMATOR.CONTROLLERS.AbstractController, AbstractController);

AbstractController.$inject = ['$scope', '$state', 'utils'];

function AbstractController($scope, $state, utils) {

    /* jshint validthis: true */

    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.AbstractController + " - init :start");

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.AbstractController + " - init :end");
    }
}
