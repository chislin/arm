angular
    .module('arm.main')
    .controller('MainController', MainController);

MainController.$inject = ['$rootScope', 'Authentication', 'ToDoService', 'NotesService', 'uiGmapGoogleMapApi', 'MarkerService'];

function MainController($rootScope, Authentication, ToDoService, NotesService, uiGmapGoogleMapApi, MarkerService) {
    var self = this;

    self.authentication = Authentication;
    self.user = Authentication.user;
    self.notes = [];
    self.todo = [];

    uiGmapGoogleMapApi
        .then(function(map){
            navigator.geolocation.getCurrentPosition(centerMe);

            self.map = {
                zoom: 10,
                markers : {
                    coords : [],
                    events : {
                        click: function (marker, event, model) {
                            self.map.window.model = model;
                            self.map.window.show = !self.map.window.show;
                        }
                    }
                },
                events: {
                    click: function(mapModel, eventName, originalEventArgs) {
                        var e = originalEventArgs[0];

                        var marker = {
                            coords : {
                                latitude: e.latLng.lat(),
                                longitude: e.latLng.lng()
                            },
                            id : Date.now()
                        };

                        MarkerService.create(self.user._id, marker)
                            .then(function(result){
                                self.map.markers.coords.push(result);
                            });

                        $rootScope.$apply();
                    }
                },
                window: {
                    model: {},
                    show: false,
                    options:{
                        pixelOffset: {width:-1,height:-20}
                    },
                    parent: self
                },
                fit: false,
                options: {
                    scrollwheel: true
                }
            };

            function centerMe(position) {
                self.map.center = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            }
        });

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


    // Markers

    MarkerService
        .get(self.user._id)
        .then(function (markers) {
            self.map.markers.coords = markers;
        });


    self.updateMarker = (marker) => {
        MarkerService
            .edit(marker._id, marker)
            .then(function(){

            });
    };

    self.deleteMarker = (marker) => {
        MarkerService
            .remove(marker._id)
            .then(function(){
                self.map.markers.coords.splice(self.map.markers.coords.indexOf(marker), 1);
                self.map.window.show = false;
            });
    };


    // Note

    self.createNote = (text) => {
        NotesService
            .create(self.user._id, text.text)
            .then(function (note) {
                self.newNote = '';
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
                self.newToDo = '';
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