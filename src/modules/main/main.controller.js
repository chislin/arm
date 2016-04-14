angular
    .module('arm.main')
    .controller('MainController', MainController);

MainController.$inject = ['$rootScope'];

function MainController($rootScope) {
    var self = this;

    self.logout = () => {
        
    }
}