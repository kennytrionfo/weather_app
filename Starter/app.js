/////////////////////////========MODULES, with any services as dependencies=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

/////////////////////////========SERVICES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.service('cityService', function() {
	this.city = "Cocoa Beach, FL";
})

/////////////////////////========CONTROLLERS=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '2';
	$scope.weatherApi = 
		$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=d8f5102c89d08caf442ba64a6bcda871", 
		{
			callback: "JSON_CALLBACK" //this and the method below just says "it's ok to get this data. it's not a hack attempt."
		},
		{
			get: 
				{
					method: "JSONP"
				}
		}
	);
 
		$scope.weatherResult = $scope.weatherApi.get( 
			{
				q: $scope.city,
				cnt: $scope.days
			});

		$scope.convertToFahrenheit = function(degK) 
			{
			return Math.round((1.8 * (degK - 273)) + 32); 
			}
		
		$scope.convertToDate = function(dt) 
			{
				return new Date(dt * 1000);
			}			

		console.log($scope.weatherResult);
}]);

/////////////////////////========ROUTES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.htm',
			controller: 'homeController'
		})
		.when('/forecast', {
			templateUrl: 'pages/forecast.htm',
			controller: 'forecastController'
		})
		.when('/forecast/:days', {
			templateUrl: 'pages/forecast.htm',
			controller: 'forecastController'
		})

});

/////////////////////////========DIRECTIVES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
weatherApp.directive("weatherReport", function() {
	return {
		restrict: 'E', 
		templateUrl: 'directtives/weatherReport.html',
		replace: true, 
		scope: {
			weatherDay: "=", 
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
})











