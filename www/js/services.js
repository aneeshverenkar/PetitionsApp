angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

          //start code
            var ref = new Firebase("https://blinding-fire-6417.firebaseio.com/");


ref.authWithPassword({
  email    : name,
  password : pw
}, function(error, authData) {
  if (error) {
    deferred.reject('Wrong credentials.');
   // console.log("Login Failed!", error);
  } else {
     deferred.resolve('Welcome ' + name + '!');
    //console.log("Authenticated successfully with payload:", authData);
  }
});
//end code
            // if (name == 'username' && pw == 'password') {
            //     deferred.resolve('Welcome ' + name + '!');
            // } else {
            //     deferred.reject('Wrong credentials.');
            // }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('Users', [ '$firebaseArray' , function($firebaseArray) {
  var itemsRef = new Firebase("https://blinding-fire-6417.firebaseio.com/");
  return $firebaseArray(itemsRef);
}])


.factory('Petitions', function($firebaseArray, $firebaseObject){
  var ref = new Firebase("https://glaring-inferno-4084.firebaseio.com/");
  
  return{
    getPetitions: function(){
      return $firebaseArray(ref.child('Petitions'));
    },
    getPetition: function(petitionId){
      return $firebaseObject(ref.child('Petitions').child(petitionId));
    }
    
  } 
  
})


