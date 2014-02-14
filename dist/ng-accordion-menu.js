(function() {
  var module;

  module = angular.module("ngAccordionMenu", []);

  module.directive('accordionMenu', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      link: function(scope, element, attrs) {},
      template: "<ul class='accordion-menu' ng-transclude>\n</ul>"
    };
  });

  module.directive('accordionMenuGroup', [
    '$rootScope', function($rootScope) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          title: '@',
          href: '@',
          last: '@'
        },
        link: function(scope, element, attrs) {
          scope.closed = false;
          return scope.toggle = function(e) {
            console.log("e:", e);
            return scope.closed = !scope.closed;
          };
        },
        template: "<li ng-class='{closed: closed, last: last}' >\n  <span class='am-item-title' ng-click='toggle()'>\n    <i class='fa' ng-class=\"{'fa-caret-right': closed, 'fa-caret-down': !closed}\" ></i>\n    {{title}}\n  </span>\n  <ul class='am-group' ng-transclude>\n  </ul>\n</li>"
      };
    }
  ]);

  module.directive('accordionMenuItem', [
    '$location', function($location) {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          title: '@',
          href: '@',
          last: '@'
        },
        link: function(scope, element, attrs) {
          var getPath;
          scope.selected = false;
          getPath = function() {
            return $location.path();
          };
          return scope.$watch(getPath, function(newPath) {
            return scope.selected = scope.href && (("#" + newPath) === scope.href);
          });
        },
        template: "<li ng-class='{last: last}'>\n  <a class='am-item-title' ng-class=\"{'am-selected': selected}\" href='{{href}}'>{{title}}</a>\n</li>"
      };
    }
  ]);

}).call(this);
