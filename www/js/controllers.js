angular.module('starter.controllers', [])




.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.view');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Incorrect email or password.'
            });
        });
    }
})

.controller('RegistrationCtrl', function($scope, $ionicPopup, $state, Users){

    $scope.data = {};

	 $scope.register = function() {

var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");

ref.createUser({
  email    : $scope.data.email,
  password : $scope.data.password
}, function(error, userData) {
  if (error) {
    var alertPopup = $ionicPopup.alert({
                title: 'Registration failed!',
                template: 'Please check your credentials!'
            });
    $state.go('registration');
    
  } else {
    var profile = new Firebase("https://blinding-fire-6417.firebaseio.com/");
    $scope.users = Users;
    $scope.users.$add({
      'name': $scope.data.firstName +" "+ $scope.data.lastName,
      'email' : $scope.data.email,
      'zip' : $scope.data.zip 
    });

    var alertPopup = $ionicPopup.alert({
                title: 'Registration successful!',
                template: 'Please login to continue.'
            });
    $state.go('login');
  }
});

}

})

.controller('ProfileCtrl', function($scope) {})

.controller('ViewCtrl', function($scope , $ionicListDelegate, Petitions) {

    $scope.petitions = Petitions;
    

})

.controller('CreateCtrl', function($scope, $ionicListDelegate, $state) {

		$scope.addPetition = function(petition){
			var message = new Firebase('https://glaring-inferno-4084.firebaseio.com/Petitions');
			var messageRef = message.push();
			
      petition.endDate = petition.endDate.toString();	
			messageRef.set(petition);
			petition.name = '';
			petition.author = '';
			petition.count = '';
			petition.description = '';
			petition.endDate = '';
		};

})

