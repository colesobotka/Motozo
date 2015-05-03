var dummyBroadcast = function(scope) {
	return function() {
		scope.$broadcast('scroll.refreshComplete');
	};
};

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, Auth) {

    $scope.socialLogin = function(loginType) {
		Auth.$authWithOAuthPopup(loginType, function(error) {
			if (error) {
    			console.log("Login Failed!", error);
		  	} else {
		    	$state.go("motozo.browse");
		  	}
		});
    };

})

.controller('RegistrationCtrl', function($scope) {

})

.controller('OptionsCtrl', function($scope, $ionicHistory) {
	$scope.goBack = function() {
		console.log('trying to go back');
		$ionicHistory.goBack();
	};
})

.controller('GarageCtrl', function($scope) {
	console.log('in garage ctrl');
	$scope.doRefresh = dummyBroadcast($scope);
})

.controller('MyCarsCtrl', function($scope){
	console.log("In MyCarsCtrl");
})

.controller("MyEventsCtrl", function($scope){
	console.log("In MyEventsCtrl");
})

.controller("MyClubsCtrl", function($scope){
	console.log("In MyClubsCtrl");
})

.controller('BrowseCtrl', function($scope) {

	if ($scope.tabState === undefined) {
		$scope.tabState = 'autos';
	}

})

.controller('BrowseCarsCtrl', function($scope, Cars) {
	$scope.cars = Cars.all();

	//Refresh content based on controller
	$scope.doRefresh = dummyBroadcast($scope);
})
.controller('BrowseEventsCtrl', function($scope, Events) {
	$scope.events = Events.all();

	//Refresh content based on controller
	$scope.doRefresh = dummyBroadcast($scope);
})
.controller('BrowseClubsCtrl', function($scope, Clubs) {
	$scope.clubs = Clubs.all();

	//Refresh content based on controller
	$scope.doRefresh = dummyBroadcast($scope);
})

.controller('ChatCtrl', function($scope, Chats){
	$scope.chats = Chats.all();
	$scope.doRefresh = dummyBroadcast($scope);
});