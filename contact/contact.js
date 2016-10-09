'use strict';

angular.module('aBookingApp.contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/contact', {
		templateUrl: 'contact/contact.html',
		controller: 'contactCtrl'
	});

}])

.controller('contactCtrl', [function() {

}]);
