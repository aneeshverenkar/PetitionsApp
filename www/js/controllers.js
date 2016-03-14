angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.view');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})


.controller('ProfileCtrl', function($scope) {})

.controller('ViewCtrl', function($scope , $ionicListDelegate, Petitions) {

    $scope.petitions = Petitions;

})

/*.controller('ViewDetailCtrl', function($scope, $stateParams, Petitions) {
  $scope.view = Petitions.get($stateParams.viewId);
})
*/

.controller('CreateCtrl', function($scope) {})





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
