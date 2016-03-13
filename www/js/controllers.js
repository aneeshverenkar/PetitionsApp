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




