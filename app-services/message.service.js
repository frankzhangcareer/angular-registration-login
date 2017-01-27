(function () {
    'use strict';
    // file inherent from authentication.service.js
    angular
        .module('app')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', '$filter', '$q', 'UserService'];
    function MessageService($http, $cookies, $rootScope, $timeout, $filter, $q, UserService) {
        var service = {};

        service.GetCurrentUserMessages = GetCurrentUserMessages;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { success: true };
                        } else {
                            response = { success: false, message: 'Username or password is incorrect' };
                        }
                        callback(response);
                    });
            }, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        ////////Newly added functions
        function GetCurrentUserMessages(user) {
            var deferred = $q.defer();

            var allMessage = getMessages();
            // original filter was from user.service GetById
            // var filtered = $filter('filter')(getUsers(), { id: id });
            var filtered = $filter('filter')(getMessages(), { recipient: user.username });
                
            deferred.resolve(filtered);
            return deferred.promise;
        }
    }

    // note this this a private function as it wasn't exposed to the "service"
    function getMessages() {
        // if no local message was saved, return empty
        if(!localStorage.localMessage){
            localStorage.localMessage = JSON.stringify([]);
        }

        return JSON.parse(localStorage.localMessage);
    }
})();