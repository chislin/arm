angular
    .module('arm.base', [
        'ui.router',
        'ui.bootstrap',
        'permission'
    ])
    .config(configure)
    .run(run);

configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
function configure($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({
        enabled : true,
        requireBase : true,
        rewriteLinks : true
    });

    $stateProvider
        .state('front', {
            url : '/',
            template: '',
            controller : [ "$state", "Authentication", function ($state, Authentication){
                console.log(Authentication.isAuthenticated()); 
                return Authentication.isAuthenticated() ? $state.go('main') : $state.go('auth');
            }]
        })
        .state('404', {
            url : '/err404',
            templateUrl : './../404.html'
        });
}

run.$inject = ['$state', '$rootScope'];
function run($state, $rootScope) {
    $rootScope.$state = $state;
}