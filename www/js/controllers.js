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

.controller('RegistrationCtrl', function($scope){

})

.controller('ProfileCtrl', function($scope) {})

.controller('ViewCtrl', function($scope , $ionicListDelegate, Petitions) {

    $scope.petitions = Petitions;

})

.controller('CreateCtrl', function($scope, $ionicListDelegate, $state) {

		$scope.addPetition = function(petition){
			var message = new Firebase('https://glaring-inferno-4084.firebaseio.com/Petitions');
			var messageRef = message.push();
			
			//todo date is not updating	
			messageRef.set(petition);
			petition.name = '';
			petition.author = '';
			petition.count = '';
			petition.description = '';
			petition.endDate = '';
		};

})

