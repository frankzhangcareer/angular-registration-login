(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditProfileController', EditProfileController);

    EditProfileController.$inject = ['UserService', '$rootScope','$scope','$state'];
    function EditProfileController(UserService, $rootScope,$scope,$state) {
        var vm = this;
        vm.description = "Please Edit Your Profile"
        vm.user = {};
        vm.action = update;
        vm.cancel = "index";
        // vm.myParams = {};
        // $scope.vm = vm;
        // $scope.$state = $state;
        
        initController();

        function update(){
            UserService.Update(vm.user);
            $state.go('index');
        }

        function initController() {
            loadCurrentUser();
            // loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
    }
})();