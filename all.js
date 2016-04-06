angular
	.module('arm', [
		'ngRoute'
		])
	.constant('CONFIG', {
	  sample_var: 'FOO'
	})
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  		$locationProvider.html5Mode(true);

	    $routeProvider
	    	.when('/main', {
		        templateUrl: 'main-view.html',
		        controller: 'MainViewController'
			})
			.when('/second', {
				templateUrl: 'second-view.html',
				controller: 'SecondViewController'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);	


angular
	.module('arm')
	.controller('MainViewController', ['$scope', function($scope) {
		console.log('Main-View');
	}]);

angular
	.module('arm')
	.controller('SecondViewController', ['$scope', function($scope) {
		console.log('SecondView');
	}]);