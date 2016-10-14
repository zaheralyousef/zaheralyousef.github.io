'use strict';

angular.module('aBookingApp.alsirafy', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/alsirafy', {
    templateUrl: 'alsirafy/alsirafy.html',
    controller: 'AlsirafyCtrl'
  });
}])

.controller('AlsirafyCtrl', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {
	const ref = firebase.database().ref().child('passengers');
	$scope.passengers = $firebaseArray(ref);

	//Show Add Form
	$scope.showAddForm = function() {
		$scope.addFormShow = true;
	}

	//Show Edit Form
	$scope.showEditForm = function(passenger) {
		$scope.editFormShow = true;

		$scope.id = passenger.$id;
		console.log($scope.id);
		$scope.name = passenger.name;
		$scope.email = passenger.email;
		$scope.company = passenger.company;
		if (passenger.phones) {
			$scope.home_phone = passenger.phones[0].home_phone;
			$scope.work_phone = passenger.phones[0].work_phone;
			$scope.mobile_phone = passenger.phones[0].mobile_phone;
		}
		if (passenger.adress) {
			$scope.street_address = passenger.adress[0].street_address;
			$scope.city = passenger.adress[0].city;
			$scope.state = passenger.adress[0].state;
			$scope.zipcode = passenger.adress[0].zipcode;
		}
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

	// edit submit
	$scope.editFormSubmit = function() {

		var record = $scope.passengers.$getRecord($scope.id);
		record.name = $scope.name;
		record.email = $scope.email;
		record.company = $scope.company;
		if (!record.phones) {
			record.phones = [{
				mobile_phone: null,
				home_phone: null,
				work_phone: null
			}]
		}
		record.phones[0].home_phone = $scope.home_phone;
		record.phones[0].work_phone = $scope.work_phone;
		record.phones[0].mobile_phone = $scope.mobile_phone;
		if (!record.adress) {
			record.adress = [{
				street_address: null,
				city: null,
				state: null,
				zipcode: null
			}]
		}
		record.adress[0].street_address = $scope.street_address;
		record.adress[0].city = $scope.city;
		record.adress[0].state = $scope.state;
		record.adress[0].zipcode = $scope.zipcode;

		$scope.passengers.$save(record).then(function(ref) {});
		//clear fields
		clearFields();
		//hide form
		$scope.editFormShow = false;
		$scope.msg = 'Contact Updated';

	}

	$scope.showContact = function(passenger) {
		$scope.name = passenger.name;
		$scope.email = passenger.email;
		$scope.company = passenger.company;
		if (passenger.phones) {
			$scope.home_phone = passenger.phones[0].home_phone;
			$scope.work_phone = passenger.phones[0].work_phone;
			$scope.mobile_phone = passenger.phones[0].mobile_phone;
		}
		if (passenger.adress) {
			$scope.street_address = passenger.adress[0].street_address;
			$scope.city = passenger.adress[0].city;
			$scope.state = passenger.adress[0].state;
			$scope.zipcode = passenger.adress[0].zipcode;
		}

		$scope.passengerShow = true;
	}

	$scope.removeContact = function(passenger) {
			$scope.passengers.$remove(passenger);
			$scope.msg = 'Contact Removed!'
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

	//Show Edit Form
	$scope.showEditForm = function(passenger) {
		$scope.editFormShow = true;

		$scope.id = passenger.$id;
		console.log($scope.id);
		$scope.name = passenger.name;
		$scope.email = passenger.email;
		$scope.company = passenger.company;
		if (passenger.phones) {
			$scope.home_phone = passenger.phones[0].home_phone;
			$scope.work_phone = passenger.phones[0].work_phone;
			$scope.mobile_phone = passenger.phones[0].mobile_phone;
		}
		if (passenger.adress) {
			$scope.street_address = passenger.adress[0].street_address;
			$scope.city = passenger.adress[0].city;
			$scope.state = passenger.adress[0].state;
			$scope.zipcode = passenger.adress[0].zipcode;
		}
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

	// edit submit
	$scope.editFormSubmit = function() {

		var record = $scope.passengers.$getRecord($scope.id);
		record.name = $scope.name;
		record.email = $scope.email;
		record.company = $scope.company;
		if (!record.phones) {
			record.phones = [{
				mobile_phone: null,
				home_phone: null,
				work_phone: null
			}]
		}
		record.phones[0].home_phone = $scope.home_phone;
		record.phones[0].work_phone = $scope.work_phone;
		record.phones[0].mobile_phone = $scope.mobile_phone;
		if (!record.adress) {
			record.adress = [{
				street_address: null,
				city: null,
				state: null,
				zipcode: null
			}]
		}
		record.adress[0].street_address = $scope.street_address;
		record.adress[0].city = $scope.city;
		record.adress[0].state = $scope.state;
		record.adress[0].zipcode = $scope.zipcode;

		$scope.passengers.$save(record).then(function(ref) {});
		//clear fields
		clearFields();
		//hide form
		$scope.editFormShow = false;
		$scope.msg = 'Contact Updated';

	}

	$scope.showContact = function(passenger) {
		$scope.name = passenger.name;
		$scope.email = passenger.email;
		$scope.company = passenger.company;
		if (passenger.phones) {
			$scope.home_phone = passenger.phones[0].home_phone;
			$scope.work_phone = passenger.phones[0].work_phone;
			$scope.mobile_phone = passenger.phones[0].mobile_phone;
		}
		if (passenger.adress) {
			$scope.street_address = passenger.adress[0].street_address;
			$scope.city = passenger.adress[0].city;
			$scope.state = passenger.adress[0].state;
			$scope.zipcode = passenger.adress[0].zipcode;
		}

		$scope.passengerShow = true;
	}

	$scope.removeContact = function(passenger) {
			$scope.passengers.$remove(passenger);
			$scope.msg = 'Contact Removed!'
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