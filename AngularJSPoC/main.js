/// <reference path="Scripts/angular-ui/ui-bootstrap-tpls.js" />

require.config({

    baseUrl: "",

    // alias libraries paths
    paths: {
        'application-configuration': 'application-configuration',
        'angular': 'scripts/angular',
        'angular-route': 'scripts/angular-route',
        'angularAMD': 'scripts/angularAMD',
        'ui-bootstrap': 'scripts/angular-ui/ui-bootstrap-tpls',
        'angular-sanitize': 'scripts/angular-sanitize',
        'blockUI': 'scripts/angular-block-ui',
        'ngload': 'scripts/ngload',
        'alertsService': 'services/alertsService'
       },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'blockUI': ['angular'],
        'angular-sanitize': ['angular'],
        'ui-bootstrap': ['angular']
    },

    // kick start application
    deps: ['application-configuration']
});
