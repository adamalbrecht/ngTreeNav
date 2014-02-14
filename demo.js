app = angular.module('ngTreeNavDemo', ['ui.router', 'ngTreeNav']);

app.config(function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise("/step-1");
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard.html'
    })
    .state('basic-info', {
      url: '/basic-info',
      templateUrl: 'basic-info.html'
    })
    .state('contact-addresses', {
      url: '/contact-addresses',
      templateUrl: 'addresses.html'
    })
    .state('stage-1a', {
      url: '/stage-1a',
      templateUrl: 'stage-1a.html'
    })
    .state('stage-1b', {
      url: '/stage-1b',
      templateUrl: 'stage-1b.html'
    })
});
app.config(function(ngTreeNavDefaultsProvider) {
  return ngTreeNavDefaultsProvider.set({
    openGroupsByDefault: true
  });
});

app.controller('DemoController', function($scope, $state) {
  $scope.href = $state.href
});
