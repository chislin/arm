angular
    .module('arm.main')
    .controller('MainController', MainController);

MainController.$inject = ['$rootScope', 'Authentication', 'ToDoService', 'NotesService', '$uibModal'];

function MainController($rootScope, Authentication, ToDoService, NotesService, $uibModal) {
    var self = this;

    self.authentication = Authentication;
    self.user = Authentication.user;
    self.notes = [];
    self.todo = [];

    self.map = {
        map : {}
    };

    self.afterInit = ($map) => {
        self.map.map = $map;
    };

    self.mapClick = (e) => {
        var coords = e.get('coords');
        console.log(coords)
    };

    NotesService
        .get(self.user._id)
        .then(function (notes) {
            self.notes = notes;
        });

    ToDoService
        .get(self.user._id)
        .then(function (todo) {
            self.todo = todo;
        });


    // Note

    self.createNote = (text) => {
        NotesService
            .create(self.user._id, text.text)
            .then(function (note) {
                self.notes.unshift(note);
            });
    };

    self.updateNote = (note) => {
        NotesService
            .edit(note._id, note.text)
            .then(function (result) {
                note.edit = false;
            });
    };

    self.deleteNote = (note_id, index) => {
        NotesService
            .remove(note_id)
            .then(function () {
                self.notes.splice(index, 1);
            });
    };


    // ToDos

    self.createToDo = (todo) => {
        ToDoService
            .create(self.user._id, todo)
            .then(function (todo) {
                self.todo.unshift(todo);
            });
    };

    self.updateToDo = (todo) => {
        ToDoService
            .edit(todo._id, todo)
            .then(function (result) {
                todo.edit = false;
            });
    };

    self.deleteToDo = (todo_id, index) => {
        ToDoService
            .remove(todo_id)
            .then(function () {
                self.todo.splice(index, 1);
            });
    };


    // Common

    self.logout = () => {
        Authentication
            .logout()
            .then(function () {
                $rootScope.$state.go('auth');
            })
    };
}