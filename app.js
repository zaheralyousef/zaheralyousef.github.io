'use strict';

// Declare app level module which depends on views, and components
angular.module('aBookingApp', [
	'ngRoute',
	'aBookingApp.booking',
	'aBookingApp.alsirafy',
	'aBookingApp.about',
	'aBookingApp.contact',
	'aBookingApp.services'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.otherwise({ redirectTo: '/about' });
}]);
