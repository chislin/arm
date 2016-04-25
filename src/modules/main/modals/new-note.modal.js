angular
    .module('arm.main')
    .controller('NewNoteModalCtrl', NewNoteModalCtrl);

NewNoteModalCtrl.$inject = ['$rootScope', 'Authentication', '$uibModalInstance', 'NotesService'];

function NewNoteModalCtrl($rootScope, Authentication, $uibModalInstance, NotesService) {
    var self = this;

    self.user = Authentication.user;
     

    self.create = (text) => {
        console.log(text);
        NotesService
            .create(self.user._id, text)
            .then(function(note){
                $uibModalInstance.close(note);
            });
    };

    self.ok = function (result) {
        $uibModalInstance.close(result);
    };

    self.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}