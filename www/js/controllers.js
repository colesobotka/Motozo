var dummyBroadcast = function(scope) {
	return function() {
		scope.$broadcast('scroll.refreshComplete');
	};
};

angular.module('starter.controllers', [])

.controller('GarageCtrl', function($scope) {
	$scope.doRefresh = dummyBroadcast($scope);
})

.controller('BrowseCtrl', function($scope, $state, $ionicHistory) {
	console.log("BrowseCtrl hit");
	if ($state.current.name === 'motozo.browse') {
		$ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true
          });
          $state.go('motozo.browse.cars');
	}
})

.controller('BrowseCarsCtrl', function($scope, Cars) {
	$scope.cars = Cars.all();

	$scope.dragImageLeft = function() {
		console.log("you dragged image left");
	};

	$scope.doRefresh = dummyBroadcast($scope);
})
.controller('BrowseEventsCtrl', function($scope, Events) {
	$scope.events = Events.all();
	$scope.doRefresh = dummyBroadcast($scope);
})
.controller('BrowseClubsCtrl', function($scope, Clubs) {
	$scope.clubs = Clubs.all();

	$scope.doRefresh = dummyBroadcast($scope);
})

.controller('ChatCtrl', function($scope, Chats){
	$scope.chats = Chats.all();

	$scope.doRefresh = dummyBroadcast($scope);
});