angular
    .module('arm.base', [
        'ui.router',
        'ui.bootstrap',
        'uiGmapgoogle-maps',
        'permission'
    ])
    .config(configure)
    .run(run);

configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];
function configure($locationProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
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

    // uiGmapGoogleMapApiProvider.configure({
    //     v: '3.20',
    //     libraries: ''
    // });
}

run.$inject = ['$state', '$rootScope'];
function run($state, $rootScope) {
    $rootScope.$state = $state;
}