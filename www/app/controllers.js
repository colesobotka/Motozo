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

.controller('GarageCtrl', function($scope, Fb, $firebaseObject, 
	$cordovaCamera, $jrCrop, $ionicLoading) {
	console.log('in garage ctrl');
	
	var cropWidth = 300;
	var cropHeight = 200;


	$scope.doRefresh = dummyBroadcast($scope);

    $scope.profileImage = {};

    var fbAuth = Fb.auth.$getAuth();

    var userReference = Fb.ref.child("users/" + fbAuth.uid);
    var fbImage = $firebaseObject(userReference.child("profileImage"));
    $scope.profileImage = fbImage;


    $scope.upload = function() {
      $ionicLoading.show({
        template: 'Please wait',
        scope: $scope
      });
        var options = {
            quality : 80,
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
            $ionicLoading.hide();
            $jrCrop.crop({
			    url: imageUrl,
			    width: cropWidth,
			    height: cropHeight
			}).then(function(canvas) {
			    var canvasDataURL = canvas.toDataURL('image/jpeg');
			    angular.element('<img />')
			    .bind('load', function (e) {
			    	console.log('bound');
			    	var scaledCanvas = document.createElement('canvas');
			    	scaledCanvas.width = cropWidth;
			    	scaledCanvas.height = cropHeight;
				    var scaledCtx = scaledCanvas.getContext('2d')
				    scaledCtx.drawImage(this, 0, 0, cropWidth, cropHeight);

			    	saveDateURL = scaledCanvas.toDataURL('image/jpeg').replace('data:image/jpeg;base64,', '');

				    fbImage.image = saveDateURL;

	            	fbImage.$save().then(function() {
		            	$scope.profileImage = fbImage;
	                	//Do something to indicate image saved
	            	});
			    })
			    .prop('src', canvasDataURL);

			}, function (error) {
				console.log("Error getting image from library", error);
				$ionicLoading.hide();
			});




        }, function(error) {
            console.error(error);
        });
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