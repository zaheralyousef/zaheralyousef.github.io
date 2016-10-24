'use strict';

angular.module('aBookingApp.booking', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/booking', {
		templateUrl: 'booking/booking.html',
		controller: 'BookingCtrl'
	});
}])

.controller('BookingCtrl', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {
	const ref = firebase.database().ref().child('passengers');
	$scope.passengers = $firebaseArray(ref);
	$scope.stations = [];

	// Add Form Submit
	$scope.addFormSubmit = function() {
		
		var bookDate = new Date();
		var travelDateString = $scope.travelDate.getDate() + "/" + ($scope.travelDate.getMonth() + 1) + "/" + $scope.travelDate.getFullYear().toString();
		var birthDateString = $scope.birthDate.getDate() + "/" + ($scope.birthDate.getMonth() + 1) + "/" + $scope.birthDate.getFullYear().toString();
		var bookDateString = bookDate.getDate() + "/" + (bookDate.getMonth() + 1) + "/" + bookDate.getFullYear().toString();
		var firstName = $scope.firstName;
		var lastName = $scope.lastName;
		var fromCity = $scope.fromCity;
		var toCity = $scope.toCity;
		var mobilePhone = $scope.mobilePhone;
		var email = $scope.email;
		var paied = false;
		var done = false;
		var bankIban = $scope.bankIban;

		//build object
		$scope.passengers.$add({
			firstName: firstName,
			lastName: lastName,
			fromCity: fromCity,
			toCity: toCity,
			travelDate: travelDateString,
			birthDate: birthDateString,
			mobilePhone: mobilePhone,
			email: email,
			bookDate: bookDateString,
			bankIban: bankIban,
			paied: paied,
			done: done
		}).then(function(ref) {
			var id = ref.key;
			//clear form 
			clearFields();
			$scope.msg = 'Succed';
		});
	}

	// Clear $scope Fields
	function clearFields() {
		$scope.firstName = '';
		$scope.lastName = '';
		$scope.fromCity = '';
		$scope.toCity = '';
		$scope.travelDate = '';
		$scope.birthDate = '';
		$scope.mobilePhone = '';
		$scope.email = '';
		$scope.bankIban = '';
	}

	$(document).ready(function() {
		//fetch text file
		$.get('text.txt', function(data) {
			//split on new lines
			var lines = data.split('\n');
			var uniqStation = [];
			$.each(lines, function(i, el) {
				if ($.inArray(el, uniqStation) === -1 && el !== "") uniqStation.push(el);
			});
			$scope.stations = uniqStation;
		});
	});

}]);
