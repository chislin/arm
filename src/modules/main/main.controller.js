angular
    .module('arm.main')
    .controller('MainController', MainController);

MainController.$inject = ['$rootScope', 'Authentication', 'NotesService', '$uibModal'];

function MainController($rootScope, Authentication, NotesService, $uibModal) {
    var self = this;

    self.authentication = Authentication;
    self.user = Authentication.user;
    self.notes = [];

    NotesService
        .get(self.user._id)
        .then(function(notes){
            self.notes = notes; 
        });

    self.logout = () => {
        Authentication
            .logout()
            .then(function(){
                $rootScope.$state.go('auth'); 
            })
    };

    self.createNote = () => {
        var modalInstance = $uibModal.open({
            templateUrl: '/main/modals/new-note.modal.html',
            controller: 'NewNoteModalCtrl',
            controllerAs : 'self',   
            size: 'sm'
        });

        modalInstance.result
            .then(function (note) {
                self.notes.unshift(note);
            })
            .catch(function () {
                console.error('Modal dismissed at: ' + new Date());
            });
    };

    self.updateNote = (note) => {
        NotesService
            .edit(note._id, note.text)
            .then(function(result){
                note = note;
                note.edit = false;
            });
    }

    selt.deleteNote = (note_id) => {
        
    }
}