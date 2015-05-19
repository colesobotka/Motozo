// Ionic Motozo App

var dependencies = [
  'ionic',
  'motozo.routes',
  'motozo.controllers',
  'motozo.directives',
  'motozo.services',
  'ngCordova',
  'firebase',
  'jrCrop'
];

angular.module('motozo', dependencies)

.run(function($ionicPlatform, $rootScope, $state, $ionicHistory, $ionicLoading, Fb) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    //Every time we change state, keep a manual history of our current and previous states
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      console.log("Changed states: " + fromState.to + " to " + toState.to);
      $rootScope.prevState = fromState;
      $rootScope.currentState = toState;
    });
    
    //Currently bugs out the ionic swipe to go back
    /*if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusBar.style(2);
    }*/

    var userExistsCallback = function (userExists, authData, usersRef) {
      if (userExists === false) {
        usersRef.child(authData.uid).set({
          provider: authData.provider,
          name: getName(authData)
        });
      } else {
        console.log("User already exists in /users");
      }
    };

    Fb.auth.$onAuth(function (authData) {
      if (authData) {
        //Need to check if the user exists here
        var userExists = false;
        var usersRef = Fb.ref.child("users");
        //console.log(authData);
        usersRef.child(authData.uid).once('value', function(snapshot) {
          userExists = (snapshot.val() !== null);
          userExistsCallback(userExists, authData, usersRef);
        });

        $state.go('main.tabs.garage');
      } else {
        $state.go('login');
      }
      $ionicLoading.hide();
    });

    $rootScope.login = function (method) {
      $ionicLoading.show({
        template: 'Logging in'
      });
      if (method !== "password") {
        Fb.auth.$authWithOAuthPopup(method, function(error) {
          if (error) {
              console.log("Login Failed!", error);
            } else {
              $state.go("main.tabs.garage");
            }
            $ionicLoading.hide();
        });
      } else {
        console.log("Trying to log in with uname and pass");
        $ionicLoading.hide();
      }
    };

    $rootScope.logout = function () {
      $ionicLoading.show({
        template: 'Logging out'
      });
      Fb.auth.$unauth();
    };

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
      });

    // find a suitable name based on the meta info given by each provider
    function getName(authData) {
      switch(authData.provider) {
         case 'password':
           return authData.password.email.replace(/@.*/, '');
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.displayName;
      }
    }

  });
});
