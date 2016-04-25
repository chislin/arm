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
            templateUrl : 'auth/auth.controller.html',
            data: {
                permissions: {
                    only: [ 'guest' ],
                    redirectTo : 'main'
                }
            }
        })
}

run.$inject = ['Permission', 'Authentication'];
function run(Permission, Authentication) {
    Authentication.initialize();

    Permission
        .defineRole('guest', () =>
            !Authentication.isAuthenticated())
        .defineRole('user', () =>
            Authentication.isAuthenticated())
}