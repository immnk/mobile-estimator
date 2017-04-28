controllers.controller(ESTIMATOR.CONTROLLERS.SideMenuController, SideMenuController);

SideMenuController.$inject = ['$scope', '$state', 'utils', '$rootScope'];

function SideMenuController($scope, $state, utils, $rootScope) {

    /* jshint validthis: true */
    var vm = this;

    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.SideMenuController + " - init :start");

        $rootScope.user = {
            "displayName": "Thad Baldock",
            "empId": "300640",
            "contactName": "THADB",
            "salesRepNum": "701",
            "EmpCRMUserID": "1889EDFF-35F1-E011-A10A-005056BF000C",
            "role": "manager",
            "imgUrl": "http://lorempixel.com/400/400/people/"
        }

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.SideMenuController + " - init :end");
    }
}
