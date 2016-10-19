'use strict';

angular.module('aBookingApp.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/about', {
        templateUrl: 'about/about.html',
        controller: 'aboutCtrl'
    });

}])

.controller('aboutCtrl', [function() {
    
}]);
