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
        service.GetMessage = GetMessage;
        return service;

        ////////Newly added functions
        function GetCurrentUserMessages(user) {
            var deferred = $q.defer();

            var allMessage = getAllMessages();
            // original filter was from user.service GetById
            // var filtered = $filter('filter')(getUsers(), { id: id });
            var filtered = $filter('filter')(getAllMessages(), { recipient: user.username });
                
            deferred.resolve(filtered);
            return deferred.promise;
        }
        function GetMessage(messageID) {
            var allMessage = getAllMessages();
            var filtered = $filter('filter')(getAllMessages(), { id: messageID });
            
            if(!filtered){
            return filtered;
            }
            return filtered[0];
        }

    }


    // note this this a private function as it wasn't exposed to the "service"
    function getAllMessages() {
        // if no local message was saved, return empty
        if(!localStorage.localMessage){
            localStorage.localMessage = JSON.stringify([]);
        }

        return JSON.parse(localStorage.localMessage);
    }





})();