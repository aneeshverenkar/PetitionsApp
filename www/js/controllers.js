angular.module('starter.controllers', [])

.controller('ProfileCtrl', function($scope) {})

.controller('ViewCtrl', function($scope , $ionicListDelegate, Petitions) {

    $scope.petitions = Petitions;

})

/*.controller('ViewDetailCtrl', function($scope, $stateParams, Petitions) {
  $scope.view = Petitions.get($stateParams.viewId);
})
*/

.controller('CreateCtrl', function($scope) {});


/*
.controller('LoginCtrl', function($scope, $firebaseAuth, $location) {

	$scope.login = function(email, password){
		var fbAuth = $firebaseAuth(fb);
		fbAuth.$authWithPassword({
			email : email,
			password : password
		}).then(function(authData) {
				$location.path("/view");
		}).catch(function(error){
			alert("Error: " + error);
		}); 	

	}

	$scope.register = function(){
		var fbAuth = $firebaseAuth(fb);
		fbAuth.$createUser().then(function(){
			return fbAuth.$
		}
	}

});*/





