factories.factory(ESTIMATOR.FACTORIES.LandingFactory, LandingFactory);

LandingFactory.$inject = ['$q', 'utils'];

function LandingFactory($q, utils) {

    var service = {}

    service.getLoggedInUserDetails = getLoggedInUserDetails;

    function getLoggedInUserDetails(user) {
        utils.Logger.debug(ESTIMATOR.FACTORIES.LandingFactory + " - getLoggedInUserDetails : start");

        var deferred = $q.defer();

        utils.Logger.debug(ESTIMATOR.FACTORIES.LandingFactory + " - getLoggedInUserDetails : end");
        return deferred.promise;
    }

    return service;
}
