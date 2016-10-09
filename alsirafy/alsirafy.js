'use strict';

angular.module('aBookingApp.alsirafy', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/alsirafy', {
    templateUrl: 'alsirafy/alsirafy.html',
    controller: 'AlsirafyCtrl'
  });
}])

.controller('AlsirafyCtrl', [function() {

}]);