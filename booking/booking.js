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

	//Show Add Form
	$scope.showAddForm = function() {
		$scope.addFormShow = true;
	}


	// Hide
	$scope.hide = function() {
		$scope.addFormShow = false;
		$scope.passengerShow = false;
	}

	// Add Form Submit
	$scope.addFormSubmit = function() {
		var name = $scope.name ? $scope.name : null;
		var email = $scope.email ? $scope.email : null;
		var company = $scope.company ? $scope.company : null;
		var mobile_phone = $scope.mobile_phone ? $scope.company : null;
		var home_phone = $scope.home_phone ? $scope.home_phone : null;
		var work_phone = $scope.work_phone ? $scope.work_phone : null;
		var street_address = $scope.street_address ? $scope.street_address : null;
		var city = $scope.city ? $scope.city : null;
		var state = $scope.state ? $scope.state : null;
		var zipcode = $scope.zipcode ? $scope.zipcode : null;

		//build object
		$scope.passengers.$add({
			name: name,
			email: email,
			company: company,
			phones: [{
				mobile_phone: mobile_phone,
				home_phone: home_phone,
				work_phone: work_phone
			}],
			adress: [{
				street_address: street_address,
				city: city,
				state: state,
				zipcode: zipcode
			}]
		}).then(function(ref) {
			var id = ref.key;

			//clear form 
			clearFields();
			$scope.addFormShow = false;
			$scope.msg = 'Contact Added';
		});


	}

		// Clear $scope Fields
	function clearFields() {
		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	}

}]);