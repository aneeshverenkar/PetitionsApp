angular.module('starter.controllers', [])



.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {



    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $scope.data.username = '';
            $scope.data.password = '';
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

.controller('ProfileCtrl', function($scope, $state, $ionicListDelegate, Users) {

  var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
  var authData = ref.getAuth();

var record;
ref.orderByChild('email').equalTo(authData.password.email).on("child_added", function(snapshot) {
  var data = snapshot.val();
  record = snapshot.key();

 $scope.user = data;
});
  

 $scope.data = {};

   $scope.updateName = function() {
var profile = new Firebase("https://blinding-fire-6417.firebaseio.com/"+record);
profile.update({ name: $scope.data.name});
//profile.update({name: 'Stev'});
 //$state.go('tab.view');
 // $ionicHistory.clearCache();
 // $window.location.reload(true);
 // $state.go($state.current, {}, {reload: true});
 var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
  var authData = ref.getAuth();

var r;
ref.orderByChild('email').equalTo(authData.password.email).on("child_added", function(snapshot) {
  var data = snapshot.val();
  r = snapshot.key();

 $scope.user = data;


});
   };


  
})



.controller('LogoutCtrl', function($scope, $state, $ionicHistory) {
var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
ref.unauth();
$ionicHistory.clearCache();

$state.go('login');
})

.controller('ViewCtrl', function($scope , $ionicListDelegate, Petitions) {

    $scope.petitions = Petitions;
    

})

.controller('CreateCtrl', function($scope, $ionicListDelegate, $state) {

		$scope.addPetition = function(petition){
			var message = new Firebase('https://glaring-inferno-4084.firebaseio.com/Petitions');
			var messageRef = message.push();
			
      petition.endDate = petition.endDate.toString();	
			messageRef.set(petition);

      //empties the form
			petition.name = '';
			petition.author = '';
			petition.count = '';
			petition.description = '';
			petition.endDate = '';
		};

})

