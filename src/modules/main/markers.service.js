var $http, $q, CONFIG;

class MarkerService {
    constructor($$http, $$q, $CONFIG) {
        $http = $$http;
        $q = $$q;
        CONFIG = $CONFIG;
    }

    create(user_id, marker) {
        return $q(function (resolve, reject) {
            $http
                .post(`/marker/${user_id}`, marker)
                .success((result) => {
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }

    get(user_id) {
        return $q(function (resolve, reject) {
            $http
                .get(`/marker/${user_id}`)
                .success((result) => {
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }

    edit(id, marker) {
        return $q(function (resolve, reject) {
            $http
                .patch(`/marker/${id}`, marker)
                .success((result) => {
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }

    remove(id) {
        return $q(function (resolve, reject) {
            $http
                .delete(`/marker/${id}`)
                .success((result) => {
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }
}

MarkerService.$inject = ['$http', '$q', 'CONFIG'];

angular
    .module('arm.main')
    .service('MarkerService', MarkerService );