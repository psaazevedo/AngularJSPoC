"use strict";

define(['application-configuration'], function (app) {

    app.register.controller('module2Controller', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.initializeController = function () {
            this.Modules = $rootScope.Modules;
        }
    }]);
});