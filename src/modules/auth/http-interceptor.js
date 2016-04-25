angular
    .module('arm.auth')
    .factory('httpInterceptor', httpInterceptor);

httpInterceptor.$inject = ['Storage'];

function httpInterceptor(Storage) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            var token = Storage.get('token');

            if (token) {
                config.headers.authentication = token.hash; 
            }
            return config;
        }
    };
}