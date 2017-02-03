(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope','$state',  'FlashService','AuthenticationService'];
    function RegisterController(UserService, $location, $rootScope,$state,  FlashService, AuthenticationService) {
        var vm = this;

        vm.register = register;

        vm.description = "Please Enter Your Info"
        vm.action = register;
        vm.cancel = "login";

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials(vm.user.username, vm.user.password);
                        FlashService.Success('Registration successful', true);
                        $state.go('index');
                        //$location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
