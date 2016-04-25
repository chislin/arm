angular
    .module('arm.auth', [
        'arm.base'
    ])
    .config(configure)
    .run(run);

configure.$inject = ['$stateProvider', '$httpProvider'];
function configure($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');

    $stateProvider
        .state('auth', {
            url: '/auth/', 
            controller : 'AuthController',
            controllerAs : 'self',
            templateUrl : 'auth/auth.controller.html'
        });
}

run.$inject = ['Authentication'];
function run(Authentication) {
    Authentication.initialize();
}
