'use strict';

angular.module('aBookingApp.booking', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/booking', {
		templateUrl: 'booking/booking.html',
		controller: 'BookingCtrl'
	});
}])

.controller('BookingCtrl', [function() {

}]);
