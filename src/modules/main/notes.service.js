var $http, $q, CONFIG;

class NotesService {
    constructor($$http, $$q, $CONFIG) {
        $http = $$http;
        $q = $$q;
        CONFIG = $CONFIG;
    }

    create(user_id, note) {
        return $q(function (resolve, reject) {
            $http
                .post(`/notes/${user_id}`, { text : note })
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
                .get(`/notes/${user_id}`)
                .success((result) => {
                    console.log(result);
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }

    edit(id, text) {
        return $q(function (resolve, reject) {
            $http
                .patch(`/notes/${id}`, { text : text })
                .success((result) => {
                    resolve(result)
                })
                .error((err) => {
                    reject(err)
                });
        })
    }

    remove(id) {

    }

}

NotesService.$inject = ['$http', '$q', 'CONFIG'];

angular
    .module('arm.main')
    .service('NotesService', NotesService );