'use strict';
// Initialize Firebase
var config = {
	apiKey: "AIzaSyBSwT1VSDoz0NQjviRJXd82EiQvBXE870Y",
	authDomain: "alsirafy-booking.firebaseapp.com",
	databaseURL: "https://alsirafy-booking.firebaseio.com",
	storageBucket: "",
	messagingSenderId: "220338051474"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('aBookingApp', [
	'ngRoute',
	'firebase',
	'aBookingApp.booking',
	'aBookingApp.about',
	'aBookingApp.contact',
	'aBookingApp.services'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.otherwise({ redirectTo: '/about' });
}]);
