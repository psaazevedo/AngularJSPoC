"use strict";

define(
    [
        'angularAMD',
        'angular-route',
        'ui-bootstrap',
        'angular-sanitize',
        'blockUI',
        'uiRouter'
    ],
    function(angularAMD) {
        var app = angular.module("mainModule", ['ngRoute', 'blockUI', 'ngSanitize', 'ui.bootstrap', 'ui.router']);

        app.filter("leadingZeroes", function() {
            return function(data) {
                var pad = "000" + data;
                pad = pad.substr(pad.length - 3);
                return pad;
            }
        });


        /*app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.withCredentials = true;
    });

    app.config(function (blockUI) {

        // Change the default overlay message
        blockUI.message("executing...");
        // Change the default delay to 100ms before the blocking is visible
        blockUI.delay(1);
        // Disable automatically blocking of the user interface
        blockUI.autoBlock(false);

    });*/

        app.config(function($stateProvider, $routeProvider) {

            app.stateProvider = $stateProvider;

            $routeProvider.otherwise('Home');

           /* $stateProvider.state('Home', {
                url: "/home",
                templateUrl: "Modules/Home/Views/Home.html",
                controllerProvider: function (resolveParam) {
                    var ctrlName = resolveParam + "Controller";
                    return ctrlName;
                },
                resolve: { resolveParam: function () { return 'home'; } }
            });*/

            $stateProvider
                .state('Home', angularAMD.route({
                    url: "/home",
                    templateUrl: "Modules/Home/Views/Home.html",
                    resolve: {
                        loadController: ['$q', '$stateParams',
                            function ($q, $stateParams) {
                                // get the controller name === here as a path to Controller_Name.js
                                // which is set in main.js path {}
                                //var controllerName = controllerNameByParams($stateParams);

                                var deferred = $q.defer();
                                require(['homeController'], function () { deferred.resolve(); });
                                return deferred.promise;
                            }]
                    },
                    controllerProvider: function ($stateParams) {
                        // get the controller name === here as a dynamic controller Name
                        //var controllerName = controllerNameByParams($stateParams);
                        return 'homeController';
                    },
                }));

            /*  .when("/", angularAMD.route({

               templateUrl: function (rp) { return 'Modules/Home/Views/home.html'; },
               controllerUrl: "Modules/Home/Controllers/homeController"

           }))

            .when("/:section/", angularAMD.route({

                templateUrl: function (rp) { return 'Modules/' + rp.section + '/Views/' + rp.section + '.html'; },

                resolve: {

                    load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {

                        var path = $location.path().replace(/\//g, '')

                        var loadController = "Modules/" + path + "/Controllers/" + path + "Controller";

                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                }

            }))


            .when("/:section/:tree", angularAMD.route({

                templateUrl: function (rp) { return 'Modules/' + rp.section + '/Views/' + rp.tree + '.html'; },

                resolve: {

                    load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {

                        var path = $location.path();
                        var parsePath = path.split("/");
                        var parentPath = parsePath[1];
                        var controllerName = parsePath[2];

                        var loadController = "Modules/" + parentPath + "/Controllers/" + controllerName + "Controller";

                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                }

            }))

            .when("/:section/:tree/:id", angularAMD.route({

                templateUrl: function (rp) { return 'Modules/' + rp.section + '/Views/' + rp.tree + '.html'; },

                resolve: {

                    load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {

                        var path = $location.path();
                        var parsePath = path.split("/");
                        var parentPath = parsePath[1];
                        var controllerName = parsePath[2];

                        var loadController = "Modules/" + parentPath + "/Controllers/" + controllerName + "Controller";

                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                }

            }))

            .otherwise({ redirectTo: '/' })*/
        });


        var indexController = function ($scope, $rootScope, $http, $state, blockUI) {

            $scope.$on('$routeChangeStart', function(scope, next, current) {

                if ($rootScope.IsloggedIn == true) {
                    $scope.authenicateUserComplete();
                    //$scope.authenicateUser($location.path(), $scope.authenicateUserComplete, $scope.authenicateUserError);
                }

            });

            $scope.$on('$routeChangeSuccess', function(scope, next, current) {

                setTimeout(function() {
                    if ($scope.isCollapsed == true) {
                        set95PercentWidth();
                    }
                }, 1000);


            });

            $scope.initializeController = function() {
                $rootScope.displayContent = false;

                $scope.initializeApplication($scope.initializeApplicationComplete, $scope.initializeApplicationError);

            }

            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            };

            $rootScope.openModule = function(module) {

                var guid = generateUUID();

                $rootScope.Tabs.push(
               {
                   Name: module.Name,
                   Id: guid,
                   Url: module.Url,
                   Active: true
               });

                app.stateProvider.state(guid, angularAMD.route({
                    templateUrl: function () { return 'Modules/' + module.Name + '/Views/' + module.Name + '.html'; },

                    resolve: {
                        load: [
                            '$q', '$rootScope', '$location', function ($q, $rootScope) {

                                var loadController = "Modules/" + module.Name + "/Controllers/" + module.Name + "Controller";

                                var deferred = $q.defer();
                                require([loadController], function () {
                                    $rootScope.$apply(function () {
                                        deferred.resolve();
                                    });
                                });
                                return deferred.promise;
                            }
                        ]
                    }
                }));

               
            }

            $scope.initializeApplicationComplete = function(response) {

                $rootScope.Modules = [
                    {
                        Name: 'Module1',
                        Id: 'M1',
                        Url: 'Module1'
                    },
                    {
                        Name: 'Module2',
                        Id: 'M2',
                        Url: 'Module2'
                    }
                ];

                $rootScope.Tabs = [
                    {
                        Name: 'Home',
                        Id: 'Home',
                        Url: 'Home',
                        Active: true
                    }
                ];

                $rootScope.displayContent = true;
                $rootScope.IsloggedIn = true;
            }

            $scope.goToTab = function(tab) {
                $state.go(tab.Id);
            }

            $scope.initializeApplication = function(successFunction, errorFunction) {
                blockUI.start();
                successFunction();
                //$scope.AjaxGet("/api/main/InitializeApplication", successFunction, errorFunction);
                blockUI.stop();
            };

            $scope.authenicateUser = function(route, successFunction, errorFunction) {
                var authenication = new Object();
                authenication.route = route;
                $scope.AjaxGetWithData(authenication, "/api/main/AuthenicateUser", successFunction, errorFunction);
            };

            $scope.authenicateUserComplete = function(response) {

                if (response.IsAuthenicated == false)
                    window.location = "/index.html";
            }

            $scope.authenicateUserError = function(response) {
                alert("ERROR= " + response.IsAuthenicated);
            }

            $scope.AjaxGet = function(route, successFunction, errorFunction) {
                setTimeout(function() {
                    $http({ method: 'GET', url: route }).success(function(response, status, headers, config) {
                        successFunction(response, status);
                    }).error(function(response) {
                        errorFunction(response);
                    });
                }, 1);

            }

            $scope.AjaxGetWithData = function(data, route, successFunction, errorFunction) {
                setTimeout(function() {
                    $http({ method: 'GET', url: route, params: data }).success(function(response, status, headers, config) {
                        successFunction(response, status);
                    }).error(function(response) {
                        errorFunction(response);
                    });
                }, 1);

            }

        };

        indexController.$inject = ['$scope', '$rootScope', '$http', '$state', 'blockUI'];
        app.controller("indexController", indexController);

        // Bootstrap Angular when DOM is ready
        angularAMD.bootstrap(app);

        return app;
    });