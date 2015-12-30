/////////////////////////========MODULES, with any services as dependencies=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/////////////////////////========SERVICES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.service('cityService', function() {
	this.city = 
})

/////////////////////////========CONTROLLERS=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.controller('homeController', ['$scope', function($scope){

}]);

weatherApp.controller('forcastController', ['$scope', function($scope){

}]);

/////////////////////////========ROUTES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.htm',
			controller: 'homeController'
		})
		.when('/forcast', {
			templateUrl: 'pages/forcast.htm',
			controller: 'forcastController'
		})
})

