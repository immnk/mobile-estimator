factories.factory(ESTIMATOR.FACTORIES.LoginFactory, LoginFactory);

LoginFactory.$inject = ['$q', 'utils'];

function LoginFactory($q, utils) {

    var service = {}

    service.getLoggedInUserDetails = getLoggedInUserDetails;

    function getLoggedInUserDetails(user) {
        utils.Logger.debug(ESTIMATOR.FACTORIES.LoginFactory + " - getLoggedInUserDetails : start");

        var deferred = $q.defer();

        utils.Logger.debug(user);
        utils.localStorage.setItem(ESTIMATOR.LOCAL_STORAGE.KEYS.USERNAME, user.username);
        utils.localStorage.setItem(ESTIMATOR.LOCAL_STORAGE.KEYS.PASSWORD, user.password);

        // utils.callBackend(ESTIMATOR.BACK_END.RequestType.GET,
        //         ESTIMATOR.BACK_END.MethodName.getLoggedInUserDetails, {}, {},
        //         ESTIMATOR.BACK_END.GetLoggedInUserDetails)
        //     .then(function(response) {
        //         if (!response) {
        //             deferred.reject(response);
        //         } else {
        //             if (response.error) {
        //                 deferred.reject(response.errorMessage);
        //             } else {
        //                 utils.Logger.debug(ESTIMATOR.FACTORIES.LoginFactory + ":getLoggedInUserDetails: response");
        //                 utils.Logger.debug(response);
        //                 deferred.resolve(response);
        //             }
        //         }
        //     }, function(err) {
        //         var errorMessage = utils.handleError(err);
        //         deferred.reject(errorMessage);
        //     });

        utils.Logger.debug(ESTIMATOR.FACTORIES.LoginFactory + " - getLoggedInUserDetails : end");
        return deferred.promise;
    }

    return service;
}
