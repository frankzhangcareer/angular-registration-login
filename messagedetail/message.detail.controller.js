(function () {
    'use strict';
    // this controller is inherent from home.controller.js
    angular
        .module('app')
        .controller('MessageDetailController', MessageDetailController);

    MessageDetailController.$inject = ['MessageService','UserService', '$rootScope','$q','$state', '$stateParams'];
    function MessageDetailController(MessageService,UserService, $rootScope, $q, $state, $stateParams) {
       ;
        var vm = this;

        vm.user = null;//$root.currentUser;
        vm.message = null;


        initController();

        function initController() {
            loadMessage();
        }

        function loadMessage() {
            var message = MessageService.GetMessage($stateParams.messageID);
             vm.message = message;
        }

    }

})();