angular
    .module('arm.auth')
    .controller('AuthController', AuthController);

AuthController.$inject = ['$rootScope', 'Authentication'];

function AuthController($rootScope, Authentication) {
    var self = this;

    self.signin = (credentials) => {
        Authentication
            .login(credentials)
            .then(function(){
                $rootScope.$state.go('main');
            })
            .catch((err) => {
                console.error(err);
            })
    };

    this.signUp = (credentials) => {
        Authentication
            .signUp(credentials)
            .then(function(){
                $rootScope.$state.go('main');
            })
            .catch((err) => {
                console.error(err);
            })
    };
}