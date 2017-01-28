(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/viewMessage', {
                controller: 'MessageController',
                templateUrl: 'messageview/message.view.html',
                controllerAs: 'vm'
            })

            .when('/phones/:phoneId', {
              template: '<phone-detail></phone-detail>'
            }).

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        // if current user is already logged in.
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' 
            + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            // note the inarray is an jquery method
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            // if current location and not logged in, page will return to login page.
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

        // TODO: try to make this in its own controller to initialize the value.
        var localMessage = [
            {
                "recipient":"fanfanpsu",
                "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "sender":"Nanda",
                "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "title":"This is a sample message to Arun.",
                "description":"This is a sample description to the message which has the above title 1",
                "created_at":"2017-01-19 09:45:00",
                "important":"0"
            },
            {
                "recipient":"fanfanpsu",
                "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "sender":"Nanda",
                "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "title":"This is a sample message to Arun.",
                "description":"This is a sample description to the message which has the above title 2",
                "created_at":"2017-01-19 09:45:00",
                "important":"0"
            },
            {
                "recipient":"Arun",
                "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "sender":"Nanda",
                "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "title":"This is a sample message to Arun.",
                "description":"This is a sample description to the message which has the above title",
                "created_at":"2017-01-19 09:45:00",
                "important":"0"
            }]
            
            localStorage.localMessage = JSON.stringify(localMessage);
    }


})();