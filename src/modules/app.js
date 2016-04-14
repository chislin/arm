angular
    .module('arm', [
        'arm.base',

        'arm.auth',
        'arm.main'
    ])
    .constant('CONFIG', CONFIG);