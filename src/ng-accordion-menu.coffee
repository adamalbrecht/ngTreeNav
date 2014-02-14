# ngAccordionMenu
# by Adam Albrecht
# http://adamalbrecht.com
#
# Source Code: https://github.com/adamalbrecht/ngAccordionMenu
#
# Compatible with Angular 1.2.x
#

module = angular.module("ngAccordionMenu", [])

module.provider "ngAccordionMenuDefaults", ->
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

module.directive 'accordionMenu', ->
  restrict: 'E'
  replace: true
  transclude: true
  template: """
              <ul class='accordion-menu' ng-transclude>
              </ul>
            """

module.directive 'accordionMenuGroup', ['$rootScope', '$parse', 'ngAccordionMenuDefaults', ($rootScope, $parse, ngAccordionMenuDefaults) ->
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

      scope.iconClass = if scope.closed then ngAccordionMenuDefaults.groupClosedIconClass else ngAccordionMenuDefaults.groupOpenIconClass

    if attrs.closed?
      scope.toggle($parse(attrs.closed))
    else if attrs.open?
      scope.toggle(!$parse(attrs.open))
    else
      scope.toggle(!ngAccordionMenuDefaults.openGroupsByDefault)

  template: """
              <li ng-class='{closed: closed, last: last}' >
                <span class='am-item-title' ng-click='toggle()'>
                  <i class="{{iconClass}}" ></i>
                  {{title}}
                </span>
                <ul class='am-group' ng-transclude>
                </ul>
              </li>
            """
]

module.directive 'accordionMenuItem', ['$location', ($location) ->
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
      scope.selected = scope.href && ("##{newPath}" == scope.href)
    )
  template: """
              <li ng-class='{last: last}'>
                <a class='am-item-title' ng-class="{'am-selected': selected}" href='{{href}}'>{{title}}</a>
              </li>
            """
]
