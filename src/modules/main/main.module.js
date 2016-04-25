angular
    .module('arm.main', [
        'arm.base',
        'arm.auth'
    ])
    .config(configure);

configure.$inject = ['$stateProvider'];
function configure($stateProvider) {
    $stateProvider
        .state('main', { 
            url : '/main/',
            templateUrl : 'main/main.controller.html',
            controller : 'MainController',
            controllerAs : 'self'
        })
}