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

run.$inject = ['RoleStore', 'Authentication'];
function run(RoleStore, Authentication) {
    Authentication.initialize();

    RoleStore
        .defineRole('guest', [], () =>
            !Authentication.isAuthenticated());

    RoleStore
        .defineRole('user', [], () =>
            Authentication.isAuthenticated())
}