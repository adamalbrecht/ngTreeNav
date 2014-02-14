app = angular.module('ngAccordionMenuDemo', ['ui.router', 'ngAccordionMenu']);

app.config(function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise("/step-1");
  $stateProvider
    .state('step-1', {
      url: '/step-1',
      templateUrl: 'step-1.html'
    })
    .state('step-2', {
      url: '/step-2',
      templateUrl: 'step-2.html'
    })
    .state('step-2a', {
      url: '/step-2a',
      templateUrl: 'step-2a.html'
    })
    .state('step-2a-1', {
      url: '/step-2a-1',
      templateUrl: 'step-2a.html'
    })
    .state('step-2b', {
      url: '/step-2b',
      templateUrl: 'step-2b.html'
    })
    .state('step-3a', {
      url: '/step-3a',
      templateUrl: 'step-3a.html'
    })
    .state('step-3b', {
      url: '/step-3b',
      templateUrl: 'step-3b.html'
    });
});


app.controller('DemoController', function($scope, $state) {
  $scope.href = $state.href
});
