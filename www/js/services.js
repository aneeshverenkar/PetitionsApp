angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var itemsRef = new Firebase("https://blinding-fire-6417.firebaseio.com/");
 
            if (name == 'username' && pw == 'password') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
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


.factory('Petitions', [ '$firebaseArray' , function($firebaseArray) {
  var itemsRef = new Firebase("https://glaring-inferno-4084.firebaseio.com/Petitions");
  return $firebaseArray(itemsRef);
}]);

