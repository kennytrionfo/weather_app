var app = angular.module('ceatherApp', ['ngRoute', 'ngResource']

);

/////////////////////////========CONTROLLERS=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.controller('homeController', ['$scope', 'cityService', function($scope, cityService ){
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	})
}]);
app.controller('forecastController',['$scope', 'cityService',  function($scope, cityService){
	$scope.city = cityService.city;
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
})

/////////////////////////========SERVICES=======\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.service('cityService', function(){
	this.city = "Sebastian, FL";
});
