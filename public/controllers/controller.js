//Joel Dalmas first Node Application August 17- 2017
var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
  console.log('Hello world, from Controller!');

//pull down contact info and clear our scope.contact object *input fields*
var refresh = function(){
    //contact list endpoint
      $http.get('/contactlist').then(function(success){
        //bind returned data to $scope
        $scope.contactlist = success.data;
        $scope.contact = {};
        console.log('Success! Returned requested data:', success);
      },
      function(error){
        console.log('error getting data');
      });
  };
  refresh();

//CRUD API Functions
  $scope.addContact = function() {
      console.log($scope.contact);
      //post contact data to contactlist route
      //then test to make sure controller sees new data from database
      $http.post('/contactlist', $scope.contact).then(function(response){
        console.log(response);
        refresh();
      },
      function(error){
        console.log('wasnt able to add contact');
      });
    };//addContact()
  $scope.remove = function(id){
    console.log('removed record id:', id);
    $http.delete('/contactlist/' + id).then(function(response){
      refresh();
    },function(error){
      console.log('Unable to remove item', id);
    });
  };//remove()
  $scope.edit = function(id){
    console.log(id);
    $http.get('/contactlist/' + id).then(function(response){
      console.log('success edit', response);
      //set response.data to contact input boxes...
      $scope.contact = response.data;
    }, function(error){
      console.log('error edit');
    });
  };//edit()
  $scope.update = function(){
    //test to make sure contact ID is being sent to server
    console.log($scope.contact._id);
    //hit the route and send $scope.contact to server to update data...
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact)
    .then(function(response){
      refresh();
    }, function(error){
      console.log('error updating item');
    });
  };//update()

}]);
