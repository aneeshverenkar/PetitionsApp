angular.module('starter.controllers', [])


.controller('LoginCtrl', function(
    $scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password)
            .success(function(data) {
                $scope.data.username = '';
                $scope.data.password = '';
                $state.go('tab.view');
            }).error(function(error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: error
                });
            });
    }
})



.controller('ForgotpasswordCtrl', function(
    $scope, $ionicPopup, $state) {
    $scope.data = {};
    $scope.forgot = function() {
        
           var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
ref.resetPassword({
  email : $scope.data.email
}, function(error) {
  if (error === null) {
    var alertPopup = $ionicPopup.alert({
                    title: 'Sent!',
                    template: 'Check your email inbox.'
                });
  } else {
    var alertPopup = $ionicPopup.alert({
                    title: 'failed!',
                    template: error
                });
  }
});

    }
})

.controller('RegistrationCtrl', function($scope, $ionicPopup, $state,
    Users) {
    $scope.data = {};
    $scope.register = function() {
        var ref = new Firebase(
            "https://blinding-fire-6417.firebaseio.com/");
        ref.createUser({
            email: $scope.data.email,
            password: $scope.data.password
        }, function(error, userData) {
            if (error) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Registration failed!',
                    template: error
                });
                $state.go('registration');
            } else {
                var profile = new Firebase(
                    "https://blinding-fire-6417.firebaseio.com/"
                );
                $scope.users = Users;
                $scope.users.$add({
                    'name': $scope.data.firstName +
                        " " + $scope.data.lastName,
                    'email': $scope.data.email,
                    'zip': $scope.data.zip
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


.controller('ProfileCtrl', function($scope, $state, $ionicPopup, $ionicListDelegate,
    Users) {
    var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
    var authData = ref.getAuth();
    var record;
    ref.orderByChild('email').equalTo(authData.password.email).on(
        "child_added", function(snapshot) {
            var data = snapshot.val();
            record = snapshot.key();
            $scope.user = data;
        });
    $scope.data = {};
    //update name
    $scope.updateName = function() {
        var profile = new Firebase(
            "https://blinding-fire-6417.firebaseio.com/" +
            record);
        profile.update({
            name: $scope.data.name
        });
        //profile.update({name: 'Stev'});
        //$state.go('tab.view');
        // $ionicHistory.clearCache();
        // $window.location.reload(true);
        // $state.go($state.current, {}, {reload: true});
        var ref = new Firebase(
            "https://blinding-fire-6417.firebaseio.com/");
        var authData = ref.getAuth();
        var r;
        ref.orderByChild('email').equalTo(authData.password.email).on(
            "child_added", function(snapshot) {
                var data = snapshot.val();
                r = snapshot.key();
                $scope.user = data;
            });
    };
    //update zip
    $scope.updateZip = function() {
        var profile = new Firebase(
            "https://blinding-fire-6417.firebaseio.com/" +
            record);
        profile.update({
            zip: $scope.data.zip
        });

        var ref = new Firebase(
            "https://blinding-fire-6417.firebaseio.com/");
        var authData = ref.getAuth();
        var r;
        ref.orderByChild('email').equalTo(authData.password.email).on(
            "child_added", function(snapshot) {
                var data = snapshot.val();
                r = snapshot.key();
                $scope.user = data;
            });
    };
    //change email
    $scope.changeEmail = function() {
        var ref = new Firebase(
            "https://blinding-fire-6417.firebaseio.com/");
        ref.changeEmail({
            oldEmail: $scope.data.oldEmail,
            newEmail: $scope.data.newEmail,
            password: $scope.data.password
        }, function(error) {
            if (error === null) {
                //change email in profile too
                var profile = new Firebase(
                    "https://blinding-fire-6417.firebaseio.com/" +
                    record);
                profile.update({
                    email: $scope.data.newEmail
                });
                var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Email changed successfully.'
                });
                alertPopup.then(function(res) {
                   $scope.data.oldEmail ='';
                   $scope.data.newEmail = '';
                   $scope.data.password = '';
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
               
                //console.log("Email changed successfully");
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: error
                });
                // console.log("Error changing email:", error);
            }
        });
    };


    //change passwords
$scope.changePassword = function() {
var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
ref.changePassword({
  email       : $scope.data.email,
  oldPassword : $scope.data.oldPassword,
  newPassword : $scope.data.newPassword
}, function(error) {
  if (error === null) {
    var alertPopup = $ionicPopup.alert({
                    title: 'Success!',
                    template: 'Password changed successfully.'
                });
        alertPopup.then(function(res) {
                   $scope.data.email ='';
                   $scope.data.oldPassword = '';
                   $scope.data.newPassword = '';
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
    //console.log("Password changed successfully");
  } else {
    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: error
                });

    //console.log("Error changing password:", error);
  }
});

};



}).controller('LogoutCtrl', function($scope, $state, $ionicHistory) {
    var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");
    ref.unauth();
    $ionicHistory.clearCache();
    $state.go('login');
}).controller('ViewCtrl', function($scope, $ionicListDelegate, Petitions) {
     //  $scope.petitions = Petitions;
        $scope.petitions = Petitions.getPetitions();
}).controller('CreateCtrl', function($scope, $ionicListDelegate, $state) {
    $scope.addPetition = function(petition) {
        var message = new Firebase(
            'https://glaring-inferno-4084.firebaseio.com/Petitions'
        );
        var messageRef = message.push();
        petition.startDate = new Date().toString();
        petition.endDate = petition.endDate.toString();
        messageRef.set(petition);
        //empties the form
        petition.name = '';
        petition.author = '';
        petition.count = '';
        petition.description = '';
        petition.endDate = '';
    };
<<<<<<< HEAD
=======
})

.controller('PetitionCtrl', function($scope, $stateParams, $ionicPopup, Petitions, Users) {
 
        $scope.petition = {}
        var petitionId = $stateParams.id;
        $scope.petition = Petitions.getPetition(petitionId);
        $scope.$on('$ionicView.beforeEnter', function (event, viewData){
            viewData.enableBack = true;
        });
        
        $scope.sign = function(){

             var ref = new Firebase(
            "https://blinding-fire-6417.firebaseio.com/");
        var authData = ref.getAuth();
        var r;
        ref.orderByChild('email').equalTo(authData.password.email).on(
            "child_added", function(snapshot) {
                var data = snapshot.val();
                r = snapshot.key();
                $scope.user = data;
            });

        
        $scope.petition.Userid = r;
        // messageRef.update(petition);
       
       
            var count;
            var popup = $ionicPopup.confirm({
                title: 'Sign Petition',
                template: 'Are you sure you want to sign this Petition?'
            });
            popup.then(function(res){
                if(res){
                  //  count =  $scope.petition.count++;
                  //  count++;
                    $scope.petition.count++;
                }
                else{
                    
                }
            }); 
        }
        
>>>>>>> 9c068d57637b13cf29600cfe763f9706c8358cc9
});