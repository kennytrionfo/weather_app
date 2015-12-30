/////////////////////////========MODULES, with any services as dependencies=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/////////////////////////========SERVICES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.service('cityService', function() {
	this.city = "New York, NY";
})

/////////////////////////========CONTROLLERS=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
}]);

weatherApp.controller('forcastController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;
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

