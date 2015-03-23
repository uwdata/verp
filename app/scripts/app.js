'use strict';

/**
 * @ngdoc overview
 * @name verpApp
 * @description
 * # verpApp
 *
 * Main module of the application.
 */
(function(){
angular
  .module('verpApp', ['ngRoute'])
  .config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);})();
