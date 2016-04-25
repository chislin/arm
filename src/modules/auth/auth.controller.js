angular
    .module('arm.auth')
    .controller('AuthController', AuthController);

AuthController.$inject = ['$rootScope', 'Authentication'];

function AuthController($rootScope, Authentication) {
    var self = this;
    
    self.alerts = [];
    self.view = 'signin';

    self.signIn = (credentials) => {
        Authentication
            .login(credentials)
            .then(function(){
                $rootScope.$state.go('main');
            })
            .catch((err) => {
                self.alerts.push({ type: 'danger', msg: err });
                console.error(err);
            })
    };

    self.signUp = (credentials) => {
        Authentication
            .signUp(credentials)
            .then(function(){
                $rootScope.$state.go('main');
            })
            .catch((err) => {
                self.alerts.push({ type: 'danger', msg: err });
                console.error(err);
            })
    };
}