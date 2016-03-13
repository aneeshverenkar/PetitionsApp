angular.module('starter.services', [])


.factory('Petitions', [ '$firebaseArray' , function($firebaseArray) {
  var itemsRef = new Firebase("https://glaring-inferno-4084.firebaseio.com/Petitions");
  return $firebaseArray(itemsRef);
}]);