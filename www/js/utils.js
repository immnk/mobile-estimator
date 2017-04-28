utils.provider('utils', Core);

Core.$inject = [];

function Core() {

    var provider = {};
    provider.$get = Factory;
    return provider;

    Factory.$inject = ['$q', '$http', '$rootScope', '$ionicPopup', '$ionicLoading',
        '$ionicHistory', '$ionicSideMenuDelegate', 'Logger', 'LocalStorage', ESTIMATOR.MESSAGES,
        ESTIMATOR.CONSTANTS
    ];

    function Factory($q, $http, $rootScope, $ionicPopup, $ionicLoading, $ionicHistory,
        $ionicSideMenuDelegate, Logger, LocalStorage, ESTIMATOR_MESSAGES, ESTIMATOR_CONSTANTS) {
        var service = {};

        service.Logger = Logger;
        service.MESSAGES = ESTIMATOR_MESSAGES;
        service.CONSTANTS = ESTIMATOR_CONSTANTS;

        service.init = init;
        service.localStorage = LocalStorage;
        service.showAlert = showAlert;
        service.showToast = showToast;
        service.showSpinner = showSpinner;
        service.hideSpinner = hideSpinner;
        service.callBackend = callBackend;
        service.handleError = handleError;
        service.encode = encode;
        service.formatDate = formatDate;
        service.versionCompare = versionCompare;

        function init() {
            Logger.debug("utils - init: start");

            $rootScope.goBack = function() {
                $ionicHistory.goBack();
            }

            $rootScope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            }

            $ionicSideMenuDelegate.canDragContent(false);
            $rootScope.ESTIMATOR_MESSAGES = ESTIMATOR_MESSAGES;

            Logger.debug("utils - init: end");
        }

        function showAlert(title, template) {
            $ionicPopup.alert({
                title: title,
                template: template
            });
        }

        function showToast(message, duration, location) {
            if (window.cordova) {
                $cordovaToast.show(message, duration, location)
                    .then(function(response) {
                        Logger.debug('Finished showing toast');
                        Logger.debug(response);
                    }, function(error) {
                        Logger.debug('Error callback');
                        Logger.error(error);
                    });
            }
        }

        function showSpinner() {
            $ionicLoading.show();
        }

        function hideSpinner() {
            $ionicLoading.hide();
        }

        function callBackend(requestType, methodName, requestData, headers, dummyURL) {
            Logger.debug("utils - callBackend: start");

            var deferred = $q.defer();

            var username = service.localStorage.getItem(ESTIMATOR.LOCAL_STORAGE.KEYS.USERNAME);
            var password = service.localStorage.getItem(ESTIMATOR.LOCAL_STORAGE.KEYS.PASSWORD);
            var servername = service.localStorage.getItem(ESTIMATOR.LOCAL_STORAGE.KEYS.SERVERNAME);

            if (username != '' && password != '' && servername != '') {
                var authHeader = "Basic " + encode(username + ":" + password);
                headers = {
                    'Authorization': authHeader
                }

                var url = servername + ESTIMATOR.BACK_END.SERVICE_URL_SUFFIX + methodName;
                var req = {
                    method: requestType,
                    url: url,
                    headers: headers,
                    timeout: 60000
                }

                if (ESTIMATOR.BROWSER_ENABLED && dummyURL) {
                    req.headers = {};
                    req.method = ESTIMATOR.BACK_END.RequestType.GET;
                    req.url = dummyURL;
                } else if (requestData) {
                    if (requestType == ESTIMATOR.BACK_END.RequestType.GET) {
                        req.params = requestData;
                    } else if (requestType == ESTIMATOR.BACK_END.RequestType.POST) {
                        req.data = requestData;
                    }
                }

                Logger.debug("utils - callBackend: MethodType: " + req.method);
                Logger.debug("utils - callBackend: MethodName: " + methodName);
                Logger.debug("utils - callBackend: request: ");
                Logger.debug(req);
                try {
                    $http(req).then(function(response) {
                        Logger.debug("utils - callBackend: response: ");
                        Logger.debug(response);

                        if (isValidJSON(response.data)) {
                            if (response.data) {
                                Logger.debug("utils - resolve");
                                deferred.resolve(response.data);
                            } else {
                                var errorResponse = {
                                    success: false,
                                    code: ESTIMATOR.BACK_END.ERROR_CODES.INVALID
                                }
                                deferred.reject(errorResponse);
                            }
                        } else {
                            var errorResponse = {
                                success: false,
                                code: ESTIMATOR.BACK_END.ERROR_CODES.INVALID
                            }
                            deferred.reject(errorResponse);
                        }
                    }, function(error) {
                        Logger.error(error);

                        var errorResponse = {
                            success: false,
                            code: ''
                        }

                        if (error.status == 401) {
                            errorResponse.code = ESTIMATOR.BACK_END.ERROR_CODES.UNAUTHORIZED;
                        } else if (error.status == 500) {
                            errorResponse.code = ESTIMATOR.BACK_END.ERROR_CODES.SERVERERROR;
                        } else if (error.status == 404 || error.status == 0) {
                            errorResponse.code = ESTIMATOR.BACK_END.ERROR_CODES.NOTFOUND;
                        } else {
                            errorResponse.code = ESTIMATOR.BACK_END.ERROR_CODES.NETWORK_ERROR;
                        }

                        deferred.reject(errorResponse);
                    });
                } catch (e) {
                    var errorResponse = {
                        success: false,
                        code: ''
                    }
                    utils.Logger.error(e);
                    errorResponse.error.code = ESTIMATOR.BACK_END.ERROR_CODES.NETWORK_ERROR;
                    deferred.reject(errorResponse);
                }
            } else {
                deferred.reject("User not logged in. Logout and try again.");
            }


            return deferred.promise;

            Logger.debug("utils - callBackend: end");
        }

        function handleError(error) {
            service.Logger.debug("$utils.handleError : start");
            var errorMessage = "";
            try {
                if (typeof(error) == 'string' && !(error == ''))
                    errorMessage = error;
                else {
                    var message = service.ESTIMATOR_MESSAGES[error.code];
                    message = service.ESTIMATOR_MESSAGES[error.code];
                    if (!message)
                        message = service.ESTIMATOR_MESSAGES.NETWORK_ERROR;
                    errorMessage = message;
                }
            } catch (e) {
                errorMessage = service.ESTIMATOR_MESSAGES.NETWORK_ERROR;
            }

            service.Logger.debug("$utils.handleError : end");

            return errorMessage;
        }

        function encode(input) {
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        }

        function formatDate(date) {
            var returnValue = "";

            returnValue = date.substr(0, date.indexOf(":") - 3);

            return returnValue;
        }

        function isValidJSON(data) {
            if (typeof(data) == "object" && (data != '' || data != undefined))
                return true;
            else
                return false;
        }

        /**
         * Simply compares two string version values.
         * 
         * Example:
         * versionCompare('1.1', '1.2') => -1
         * versionCompare('1.1', '1.1') =>  0
         * versionCompare('1.2', '1.1') =>  1
         * versionCompare('2.23.3', '2.22.3') => 1
         * 
         * Returns:
         * -1 = left is LOWER than right
         *  0 = they are equal
         *  1 = left is GREATER = right is LOWER
         *  And FALSE if one of input versions are not valid
         **/
        function versionCompare(left, right) {
            if (typeof left + typeof right != 'stringstring')
                return false;

            var a = left.split('.'),
                b = right.split('.'),
                i = 0,
                len = Math.max(a.length, b.length);

            for (; i < len; i++) {
                if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
                    return 1;
                } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
                    return -1;
                }
            }

            return 0;
        }

        return service;
    }
}
