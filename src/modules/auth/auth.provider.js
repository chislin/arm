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

                this.token = null;
                this.user = null;
            }

            initialize() {
                this.user = Storage.get('user');

                if (!this.isAuthenticated()) {
                    return;
                }
            }

            setToken(token) {
                this.token = token;

                Storage.set('token', token);
            }

            clearUser() {
                this.token = null;
                Storage.remove('token'); 
            }

            setUser(user) {
                this.user = user;

                Storage.set('user', user);
            }

            getUser() {
                return this.user;
            }

            clearToken() {
                this.user = null;
                Storage.remove('user');
            }

            isAuthenticated() {
                return (!! this.token);
            }

            signUp(credentials) {
                var self = this,
                    deferred = $q.defer();

                $http
                    .post('/signup', credentials)
                    .success((response) => {
                        self.setUser(response.user);
                        self.setToken(response.token);

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
                    .post('/login', credentials)
                    .success((response) => {
                        self.setUser(response.user);
                        self.setToken(response.token);
                        
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
                self.clearToken();
                deferred.resolve();

                return deferred.promise;
            }
        }

        return new Authentication();
    }
}