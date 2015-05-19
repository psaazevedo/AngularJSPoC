"use strict";

define(['application-configuration'], function (app) {

    app.register.controller('module2Controller', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.name = "original name";
        $scope.setName = function () {
            $scope.name = "new name";
        }
        $scope.initializeController = function () {
            
        }
    }]);
});