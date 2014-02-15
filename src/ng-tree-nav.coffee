# ngTreeNav
# by Adam Albrecht
# http://adamalbrecht.com
#
# Source Code: https://github.com/adamalbrecht/ngTreeNav
#
# Compatible with Angular 1.2.x
#

module = angular.module("ngTreeNav", [])

module.provider "ngTreeNavDefaults", ->
  options: {
    groupClosedIconClass: "fa fa-caret-right"
    groupOpenIconClass: "fa fa-caret-down"
    openGroupsByDefault: true
  }
  $get: ->
    @options

  set: (keyOrHash, value) ->
    if typeof(keyOrHash) == 'object'
      for k, v of keyOrHash
        @options[k] = v
    else
      @options[keyOrHash] = value

module.directive 'treeNav', ->
  restrict: 'E'
  replace: true
  transclude: true
  template: """
              <ul class='tree-nav' ng-transclude>
              </ul>
            """

module.directive 'treeNavGroup', ['$rootScope', '$parse', 'ngTreeNavDefaults', ($rootScope, $parse, ngTreeNavDefaults) ->
  restrict: 'E'
  replace: true
  transclude: true
  scope:
    title: '@'
    href: '@'
    last: '@'
  link: (scope, element, attrs) ->
    scope.toggle = (forcedValue) ->
      if forcedValue?
        scope.closed = forcedValue
      else
        scope.closed = !scope.closed

      scope.iconClass = if scope.closed then ngTreeNavDefaults.groupClosedIconClass else ngTreeNavDefaults.groupOpenIconClass

    if attrs.closed?
      scope.toggle($parse(attrs.closed))
    else if attrs.open?
      scope.toggle(!$parse(attrs.open))
    else
      scope.toggle(!ngTreeNavDefaults.openGroupsByDefault)

  template: """
              <li ng-class='{closed: closed, last: last}' >
                <span class='tn-item-title' ng-click='toggle()'>
                  <i class="{{iconClass}}" ></i>
                  {{title}}
                </span>
                <ul class='tn-group' ng-transclude>
                </ul>
              </li>
            """
]

module.directive 'treeNavItem', ['$location', ($location) ->
  restrict: 'E'
  replace: true
  scope:
    title: '@'
    href: '@'
    last: '@'
  link: (scope, element, attrs) ->
    scope.selected = false
    getPath = -> $location.path()
    scope.$watch(getPath, (newPath) ->
      if (scope.href && ("##{newPath}" == scope.href)) or (attrs.pattern? && (newPath.match(attrs.pattern)))
        scope.selected = true
      else
        scope.selected = false
    )
  template: """
              <li ng-class='{last: last}'>
                <a class='tn-item-title' ng-class="{'tn-selected': selected}" href='{{href}}'>{{title}}</a>
              </li>
            """
]
