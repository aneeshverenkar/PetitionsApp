// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic' , 'starter.controllers', 'starter.services', 'firebase'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
    })


  // Each tab has its own nav history stack:


      .state('tab.login', {
        url: '/login',
        views: {
          'tab-login': {
            templateUrl: 'templates/tab-login.html',
            controller: 'LoginCtrl'
          }
        }
      })

      .state('tab.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: 'templates/tab-profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })

      .state('tab.view', {
        url: '/view',
        views: {
          'tab-view': {
            templateUrl: 'templates/tab-view.html',
            controller: 'ViewCtrl'
          }
        }
      })

      .state('tab.view-detail', {
      url: '/view/:viewId',
      views: {
        'tab-view': {
          templateUrl: 'templates/view-detail.html',
          controller: 'ViewDetailCtrl'
        }
      }
    })

    .state('tab.create', {
    url: '/create',
    views: {
      'tab-create': {
        templateUrl: 'templates/tab-create.html',
        controller: 'CreateCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/view');   


});  



