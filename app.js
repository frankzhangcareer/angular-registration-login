(function () {
    'use strict';
    angular.module('app',['ui.router','ngCookies']).config(config).run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.otherwise('/login');  //默认跳转地址
        $stateProvider
            .state('login',{ 
                /*
                *url: 这个值可以方便地址栏输入时，
                *能正确跳转 localhost/angular-ui-router/index.html#/index   (注意有 ＃)
                *不要的话，点击对应链接是可以跳转，但是在地址栏不会变，
                *而且手动输入时，则不能跳转。
                *可以添加需要传递的参数
                */
                url:'/login',
                views:{
                    '':{ //index.html 中的ui-view 没有值，所以是‘’
                        templateUrl:'login/login.view.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    },
                }
            })
            .state('register',{ 
                url:'/register',
                views:{
                    '':{ //index.html 中的ui-view 没有值，所以是‘’
                        templateUrl:'editprofile/editprofile.view.html',
                        controller: 'RegisterController',
                        controllerAs: 'vm',
                    },

                }
            })
            .state('index',{ 
                url:'/index',
                views:{
                    '':{ 
                        templateUrl:'home/home.view.html',
                        controller: 'HomeController',
                        controllerAs: 'vm',
                    },
                    // 'messageview@index':{
                    //     templateUrl:'messageview/message.view.html',
                    //     controller: 'MessageController',
                    //     controllerAs: 'vm',
                    // },              
                }
            })
            .state('index.messageview',{
                url:'/messageview',   
                views:{
                    'main@index':{
                        templateUrl:'messageview/message.view.html',
                        controller: 'MessageController',
                        controllerAs: 'vm',
                    },
                    'messageview@index':{
                        templateUrl:'messageview/message.view.html',
                        controller: 'MessageController',
                        controllerAs: 'vm',
                    },
                },
                data:{
                    customData1:'You now access customData',
                },
            })
            .state('index.messagedetail',{
                url:'/messagedetail',   
                views:{
                    'main@index':{
                        templateUrl:'messagedetail/message.detail.html',
                        controller: 'MessageDetailController',
                        controllerAs: 'vm',
                    },
                },
                data : {
                    customData1:'12313132313',
                    test2:2,
                },
                params : { 
                    messageID: null, 
                },

            })
            .state('index.editprofile',{
                url:'/editprofile',   
                views:{
                    'main@index':{
                        templateUrl:'editprofile/editprofile.view.html',
                        controller: 'EditProfileController',
                        controllerAs: 'vm',
                    },
                    'editprofile@index':{
                        templateUrl:'editprofile/editprofile.view.html'
                    },
                }
            })
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http','$state', '$stateParams'];
    function run($rootScope, $location, $cookies, $http,$state, $stateParams) {
        // keep user logged in after page refresh
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        
        $rootScope.globals = $cookies.getObject('globals') || {};
        
        // if current user is already logged in.
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' 
            + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            // note the inarray is an jquery method
            var restrictedPage = $.inArray($state.current.name, ['login', 'register']) === -1;
            
            var loggedIn = $rootScope.globals.currentUser;
            // if current state is neithter login nor register, with no current user, 
            // page will return to login page.
            if (restrictedPage && !loggedIn) {
                // event.preventDefault();
                $state.go('login',{});            
                //TODO: Redirect to '/' page
                //TODO: Redirect to '/' then redirect to login
                // so the login is more intuitive
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
                "important":"0",
                "id":1
            },
            {
                "recipient":"fanfanpsu",
                "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "sender":"Nanda",
                "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "title":"This is a sample message to Arun.",
                "description":"This is a sample description to the message which has the above title 2",
                "created_at":"2017-01-19 09:45:00",
                "important":"0",
                "id":2
            },
            {
                "recipient":"Arun",
                "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "sender":"Nanda",
                "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
                "title":"This is a sample message to Arun.",
                "description":"This is a sample description to the message which has the above title",
                "created_at":"2017-01-19 09:45:00",
                "important":"0",
                "id":3
            }]
            
            localStorage.localMessage = JSON.stringify(localMessage);
    }
})();