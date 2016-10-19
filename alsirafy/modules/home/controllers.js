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

angular.module('BookingAdmin', [ 'firebase'])

.controller('BookingAdminCtrl', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {
	const ref = firebase.database().ref().child('passengers');
	$scope.passengers = $firebaseArray(ref);
	//$scope.editFormShow = false;

	$scope.removePassenger = function(passenger) {
		$scope.passengers.$remove(passenger);
		$scope.msg = 'Passenger Removed!';
	}
	$scope.isPaied = function(passenger) {
		var record = $scope.passengers.$getRecord(passenger.$id);
		if (record.paied) {
			record.paied = false;
		} else {
			record.paied = true;
		}
		$scope.passengers.$save(record).then(function(ref) { console.log('success') });
	}
}]);
