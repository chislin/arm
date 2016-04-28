var $http, $q, CONFIG;

class ToDoService {
    constructor($$http, $$q, $CONFIG) {
        $http = $$http;
        $q = $$q;
        CONFIG = $CONFIG;
    }

    create(user_id, todo) {
        return $q(function (resolve, reject) {
            $http
                .post(`/todo/${user_id}`, todo)
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
                .get(`/todo/${user_id}`)
                .success((result) => {
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }

    edit(id, todo) {
        return $q(function (resolve, reject) {
            $http
                .patch(`/todo/${id}`, todo)
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
                .delete(`/todo/${id}`)
                .success((result) => {
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }
}

ToDoService.$inject = ['$http', '$q', 'CONFIG'];

angular
    .module('arm.main')
    .service('ToDoService', ToDoService );