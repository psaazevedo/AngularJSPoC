"use strict";

define(['application-configuration'], function (app) {

    app.register.controller('homeController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.initializeController = function () {
            this.Modules = $rootScope.Modules;
        }

        $scope.OpenModule = function (module) {
            $rootScope.openModule(module);
        }
    }]);
});