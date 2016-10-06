'use strict';

//Firebase Config

var config = {
    apiKey: "AIzaSyBpiDBy8CrUXRDVkdOv-4zW1hGu4ZUDrxY",
    authDomain: "my-contacts-app-588e8.firebaseapp.com",
    databaseURL: "https://my-contacts-app-588e8.firebaseio.com",
    storageBucket: "my-contacts-app-588e8.appspot.com",
};
firebase.initializeApp(config);

// Contacts 

angular.module('myContactsApp.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsCtrl'
    });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {
    const ref = firebase.database().ref().child('contacts');
    $scope.contacts = $firebaseArray(ref);

    //Show Add Form
    $scope.showAddForm = function() {
        $scope.addFormShow = true;
    }

    //Show Edit Form
    $scope.showEditForm = function(contact) {
        $scope.editFormShow = true;

        $scope.id = contact.$id;
        console.log($scope.id);
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        if (contact.phones) {
            $scope.home_phone = contact.phones[0].home_phone;
            $scope.work_phone = contact.phones[0].work_phone;
            $scope.mobile_phone = contact.phones[0].mobile_phone;
        }
        if (contact.adress) {
            $scope.street_address = contact.adress[0].street_address;
            $scope.city = contact.adress[0].city;
            $scope.state = contact.adress[0].state;
            $scope.zipcode = contact.adress[0].zipcode;
        }
    }

    // Hide
    $scope.hide = function() {
        $scope.addFormShow = false;
        $scope.contactShow = false;
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
        $scope.contacts.$add({
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

        var record = $scope.contacts.$getRecord($scope.id);
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

        $scope.contacts.$save(record).then(function(ref) {});
        //clear fields
        clearFields();
        //hide form
        $scope.editFormShow = false;
        $scope.msg = 'Contact Updated';

    }

    $scope.showContact = function(contact) {
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        if (contact.phones) {
            $scope.home_phone = contact.phones[0].home_phone;
            $scope.work_phone = contact.phones[0].work_phone;
            $scope.mobile_phone = contact.phones[0].mobile_phone;
        }
        if (contact.adress) {
            $scope.street_address = contact.adress[0].street_address;
            $scope.city = contact.adress[0].city;
            $scope.state = contact.adress[0].state;
            $scope.zipcode = contact.adress[0].zipcode;
        }

        $scope.contactShow = true;
    }

    $scope.removeContact = function(contact) {
        $scope.contacts.$remove(contact);
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
