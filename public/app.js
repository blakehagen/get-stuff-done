angular.module('getStuffDoneApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './home/homeTmpl.html',
            controller: 'homeCtrl'
        })

    $urlRouterProvider
        .otherwise('/');



})