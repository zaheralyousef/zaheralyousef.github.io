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
		
		var firstName = $scope.firstName ? $scope.firstName : null;
		var lastName = $scope.lastName ? $scope.lastName : null;
		var fromCity = $scope.fromCity ? $scope.fromCity : null;
		var toCity = $scope.toCity ? $scope.toCity : null;
		var travelDate = $scope.travelDate ? $scope.travelDate : null;
		var mobilePhone = $scope.mobilePhone ? $scope.mobilePhone : null;
		var email = $scope.email ? $scope.email : null;
		var bookDate = new Date();
		var paied = false;

		//build object
		$scope.passengers.$add({
			firstName: firstName,
			lastName: lastName,
			fromCity: fromCity,
			toCity: toCity,
			travelDate: travelDate,
			mobilePhone: mobilePhone,
			email: email,
			bookDate: bookDate,
			paied: paied
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
		$scope.mobilePhone = '';
		$scope.email = '';
	}

	$(document).ready(function() {
        //fetch text file
        $.get('text.txt', function(data) {
            //split on new lines
            var lines = data.split('\n');
            var uniqStation = [];
            $.each(lines, function(i, el) {
                if ($.inArray(el, uniqStation) === -1 && el!=="") uniqStation.push(el);
            });
           	$scope.stations = uniqStation;
        });
    });

}]);