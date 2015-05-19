var dummyBroadcast = function(scope) {
	return function() {
		scope.$broadcast('scroll.refreshComplete');
	};
};

angular.module('motozo.controllers', [])

.controller('OptionsCtrl', function($scope, $state) {
	$scope.goBack = function () {
		console.log("trying to go back");
		$state.go('main.tabs');
	};

})

.controller('GarageCtrl', function($scope, Fb, $firebaseObject, $cordovaCamera, $jrCrop) {
	console.log('in garage ctrl');
	$scope.doRefresh = dummyBroadcast($scope);

    $scope.profileImage = {};

    var fbAuth = Fb.auth.$getAuth();

    var userReference = Fb.ref.child("users/" + fbAuth.uid);
    var fbImage = $firebaseObject(userReference.child("profileImage"));
    $scope.profileImage = fbImage;


    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        $cordovaCamera.getPicture(options).then(function(imageUrl) {
            imageUrl = 'data:image/jpeg;base64,' + imageUrl;
            //console.log("after: " + imageUrl);
            $jrCrop.crop({
			    url: imageUrl,
			    width: 300,
			    height: 200
			}).then(function(canvas) {
			    // success!
			    var canvasDataURL = canvas.toDataURL('image/jpeg');
			    canvasDataURL = canvasDataURL.replace('data:image/jpeg;base64,', '');
			    fbImage.image = canvasDataURL;

            	fbImage.$save().then(function() {
                	
            	});
			});




        }, function(error) {
            console.error(error);
        });


        /*$cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });*/
    };

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