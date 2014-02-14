# ngAccordionMenu
# by Adam Albrecht
# http://adamalbrecht.com
#
# Source Code: https://github.com/adamalbrecht/ngAccordionMenu
#
# Compatible with Angular 1.2.x
#

module = angular.module("ngAccordionMenu", [])

module.directive 'accordionMenu', ->
  restrict: 'E'
  replace: true
  transclude: true
  link: (scope, element, attrs) ->

  template: """
              <ul class='accordion-menu' ng-transclude>
              </ul>
            """

module.directive 'accordionMenuGroup', ['$rootScope', ($rootScope) ->
  restrict: 'E'
  replace: true
  transclude: true
  scope:
    title: '@'
    href: '@'
    last: '@'
  link: (scope, element, attrs) ->
    scope.closed = false
    scope.toggle = (e) ->
      console.log("e:", e)
      scope.closed = !scope.closed
  template: """
              <li ng-class='{closed: closed, last: last}' >
                <span class='am-item-title' ng-click='toggle()'>
                  <i class='fa' ng-class="{'fa-caret-right': closed, 'fa-caret-down': !closed}" ></i>
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
