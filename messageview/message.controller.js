(function () {
    'use strict';
    // this controller is inherent from home.controller.js
    angular
        .module('app')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['MessageService','UserService', '$rootScope','$q'];
    function MessageController(MessageService,UserService, $rootScope, $q) {
        var vm = this;

        vm.user = null;//$root.currentUser;
        vm.allMessages = [];

        initController();

        function initController() {
            

            // load the current user to this function?
            loadCurrentUser().then(function(){
                // load messages of current user
                loadCurrentUserMessages()   
            });
            // load all users and display as the list in the index panel
            // need to change it to load all messages.
            // need to sepecific the owner of the message and load 
        }

        function loadCurrentUser() {

            var deferred = $q.defer();
//            return deferred.promise;
            deferred.resolve(

            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user; // set the current user for VM local variable. 
                    //TODO: Try not return, but just set up the local scope
                    return vm.user;
                }))
            return deferred.promise;
        }

        function loadCurrentUserMessages() {
            MessageService.GetCurrentUserMessages(vm.user)
                .then(function (messages) {
                    vm.user.allMessages = messages;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    
        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

    }

})();