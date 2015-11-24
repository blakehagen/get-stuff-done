angular.module('getStuffDoneApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('login', {
            url: '/',
            templateUrl: './login/loginTmpl.html',
            controller: 'loginCtrl'
        })
        
        .state('home', {
            url: '/:user/mytasks',
            templateUrl: './home/homeTmpl.html',
            controller: 'homeCtrl'
        })

    $urlRouterProvider
        .otherwise('/');



})