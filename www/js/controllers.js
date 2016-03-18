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
  // var str1 = "\"";
  // var str2 = "\"";
  // var email = "\""+"sj@apple.com"+"\"";

// function findUsersMatchingEmail( emailAddress, callback ) {
//     ref.orderByChild('email').equalTo(emailAddress).once('value', function(snap) {
//         callback( snap.val() );
//     });
var record;
ref.orderByChild('email').equalTo(authData.password.email).on("child_added", function(snapshot) {
  var data = snapshot.val();
  record = snapshot.key();

 $scope.user = data;
});
  

 $scope.data = {};

   $scope.updateName = function() {
var profile = new Firebase("https://blinding-fire-6417.firebaseio.com/"+record);


profile.set({ name: 'Stev',email: 'sj@apple.com', zip: '403002' });
//profile.update({name: 'Stev'});

   }


  
})



.controller('LogoutCtrl', function($scope, $state) {
var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
ref.unauth();
//$state.go('login');
})

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

