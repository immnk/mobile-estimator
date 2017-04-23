controllers.controller(ESTIMATOR.CONTROLLERS.FormController, FormController);

FormController.$inject = ['$scope', '$state', 'utils'];

function FormController($scope, $state, utils) {
    /* jshint validthis: true */
    var vm = this;
    
    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.FormController + " - init :start");

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.FormController + " - init :end");
    }
}
