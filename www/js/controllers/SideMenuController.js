controllers.controller(ESTIMATOR.CONTROLLERS.SideMenuController, SideMenuController);

SideMenuController.$inject = ['$scope', '$state', 'utils'];

function SideMenuController($scope, $state, utils) {

    /* jshint validthis: true */

    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.SideMenuController + " - init :start");

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.SideMenuController + " - init :end");
    }
}
