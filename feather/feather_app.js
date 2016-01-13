/////////////////////////========MODULE=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
var app = angular.module('featherApp', ['ngRoute', 'ngResource' ]

);

/////////////////////////========CONTROLLERS=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.controller('homeController', ['$scope',  'cityService', function($scope,  cityService ){
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
}]);

app.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService ){
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || 2;
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
		}
	);
	// console.log($scope.weatherResult );
	
}]);

/////////////////////////========ROUTES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.config(function ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'homeController'
		})
		.when('/forecast', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		})
		.when('/forecast/:days', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		})
});

/////////////////////////========SERVICES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.service('cityService', function(){
	this.city = "Sebastian, FL";
});



