angular
    .module('arm.auth', [
        'arm.base'
    ])
    .config(configure)
    .run(run);

configure.$inject = ['$stateProvider'];
function configure($stateProvider) {
    $stateProvider
        .state('auth', {
            url: '/auth',
            controller : 'AuthController',
            controllerAs : 'self',
            templateUrl : 'auth/auth.controller.html',
        });
}

run.$inject = ['Authentication'];
function run(Authentication) {
    Authentication.initialize();
}
