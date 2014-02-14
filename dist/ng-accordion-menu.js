(function() {
  var module;

  module = angular.module("ngAccordionMenu", []);

  module.provider("ngAccordionMenuDefaults", function() {
    return {
      options: {
        groupClosedIconClass: "fa fa-caret-right",
        groupOpenIconClass: "fa fa-caret-down",
        openGroupsByDefault: true
      },
      $get: function() {
        return this.options;
      },
      set: function(keyOrHash, value) {
        var k, v, _results;
        if (typeof keyOrHash === 'object') {
          _results = [];
          for (k in keyOrHash) {
            v = keyOrHash[k];
            _results.push(this.options[k] = v);
          }
          return _results;
        } else {
          return this.options[keyOrHash] = value;
        }
      }
    };
  });

  module.directive('accordionMenu', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: "<ul class='accordion-menu' ng-transclude>\n</ul>"
    };
  });

  module.directive('accordionMenuGroup', [
    '$rootScope', '$parse', 'ngAccordionMenuDefaults', function($rootScope, $parse, ngAccordionMenuDefaults) {
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
          scope.toggle = function(forcedValue) {
            if (forcedValue != null) {
              scope.closed = forcedValue;
            } else {
              scope.closed = !scope.closed;
            }
            return scope.iconClass = scope.closed ? ngAccordionMenuDefaults.groupClosedIconClass : ngAccordionMenuDefaults.groupOpenIconClass;
          };
          if (attrs.closed != null) {
            return scope.toggle($parse(attrs.closed));
          } else if (attrs.open != null) {
            return scope.toggle(!$parse(attrs.open));
          } else {
            return scope.toggle(!ngAccordionMenuDefaults.openGroupsByDefault);
          }
        },
        template: "<li ng-class='{closed: closed, last: last}' >\n  <span class='am-item-title' ng-click='toggle()'>\n    <i class=\"{{iconClass}}\" ></i>\n    {{title}}\n  </span>\n  <ul class='am-group' ng-transclude>\n  </ul>\n</li>"
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
