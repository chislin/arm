angular
    .module('arm.auth')
    .provider('Authentication', AuthenticationProvider);

function AuthenticationProvider() {
    this.$get = $get;

    $get.$inject = ['$rootScope', '$q', '$http', 'Storage'];
    function $get($rootScope, $q, $http, Storage) {
        class Authentication {
            constructor() {
                $rootScope.Authentication = this;

                this.user = null;
            }

            initialize() {
                this.user = Storage.get('user');

                if (!this.isAuthenticated()) {
                    return;
                }
            }

            setUser(user) {
                this.user = user;

                Storage.set('user', user);
            }

            getUser() {
                return this.user;
            }

            clearUser() {
                this.user = null;
                Storage.remove('user');
            }

            isAuthenticated() {
                return (!! this.user);
            }

            signUp(credentials) {
                var self = this,
                    deferred = $q.defer();

                $http
                    .post('/user/signup', credentials)
                    .success((response) => {
                        self.setUser(response);
                        deferred.resolve();
                    })
                    .error((err)=>{
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            login(credentials) {
                var self = this,
                    deferred = $q.defer();

                $http
                    .post('/auth/login', credentials)
                    .success((response) => {
                        self.setToken(response);
                        deferred.resolve();
                    })
                    .error((err)=>{
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            logout() {
                var self = this,
                    deferred = $q.defer();

                self.clearUser();
                deferred.resolve();

                return deferred.promise;
            }
        }

        return new Authentication();
    }
}