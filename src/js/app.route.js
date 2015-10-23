(function (window, document, undefined) {
'use strict';

// @ngInject
var RouteConfig = function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/example.html',
      controllerAs: 'example',
      controller: 'ExampleController'
    });
};

angular.module('app')
    .config(RouteConfig);

})(window, document);
