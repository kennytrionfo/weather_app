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

weatherApp.controller('forcastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
	$scope.city = cityService.city;
	$scope.weatherApi = 
		$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=d8f5102c89d08caf442ba64a6bcda871", 
		{
			callback: "JSON_CALLBACK" 
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
				cnt: 2	
			});
		console.log($scope.weatherResult);
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

