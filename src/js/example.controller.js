(function (window, document, undefined) {
'use strict';

// @ngInject
var ExampleController = function () {
  this.test = 'this is public';
};

angular.module('app')
    .controller('ExampleController', ExampleController);

})(window, document);
