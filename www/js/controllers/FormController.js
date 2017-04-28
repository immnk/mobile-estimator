controllers.controller(ESTIMATOR.CONTROLLERS.FormController, FormController);

FormController.$inject = ['$scope', '$state', 'utils'];

function FormController($scope, $state, utils) {
    /* jshint validthis: true */
    var vm = this;
    vm.numberofScreens = 0;
    vm.apptype = {
        android: false,
        ios: false,
        hybrid: true
    }

    vm.bind = bind;

    init();

    function init() {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.FormController + " - init :start");
        
        bind();
        
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.FormController + " - init :end");
    }

    function bind(value) {
        utils.Logger.debug(ESTIMATOR.CONTROLLERS.FormController + " :bind - start");
        utils.Logger.debug(value);

        vm.apptypeValue = "";
        for (var key in vm.apptype) {
            if (vm.apptype.hasOwnProperty(key)) {
                if (vm.apptype[key]) {
                    vm.apptypeValue += utils.CONSTANTS.FORM_VALUES[key] + " ,";
                }
            }
        }

        utils.Logger.debug(ESTIMATOR.CONTROLLERS.FormController + " :bind - end");
    }
}
