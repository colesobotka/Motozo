// Ionic Starter App


//Global variables used in init here
var firebaseUrl = "https://motozo-app.firebaseio.com/";


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 
  'starter.controllers', 
  'starter.services', 
  'motozo.directives', 
  'ngCordova',
  'firebase'])

.run(function($ionicPlatform, $rootScope, $state, $ionicHistory, Auth, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    
    //Currently bugs out the ionic swipe to go back
    /*if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusBar.style(2);
    }*/

    $rootScope.firebaseUrl = firebaseUrl;

    Auth.$onAuth(function (authData) {
      if (authData) {
        console.log("Logged in as:", authData.uid);
        $state.go('tabs.garage');
      } else {
        console.log("Logged out");
        $ionicLoading.hide();
        $location.path('/login');
      }
    });

    $rootScope.logout = function () {
      console.log("Logging out of the app");
      $ionicLoading.show({
        template: 'Logging out'
      });
      Auth.$unauth();
    };

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
      });

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: "/login",
    views: {
      'main-view': {
        templateUrl: "login/login.html",
        controller: "LoginCtrl"
      }
    }
  })

  .state('registration', {
    url: '/registration',
    views: {
      'main-view': {
        templateUrl: 'login/registration.html',
        controller: 'RegistrationCtrl'
      }
    }
  })

  .state('options', {
    url: '/options',
    views: {
      'main-view': {
        templateUrl: 'options/options-main.html',
        controller: 'OptionsCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive
    .state('tabs', {
    url: "/tabs",
    abstract: true,
    views: {
      'main-view': {
        templateUrl: "tabs/tabs.html"
      }
    }

  })

    // Each tab has its own nav history stack:

  .state('tabs.garage', {
    url: '/garage',
    //abstract: true,
    views: {
      'tab-garage': {
        templateUrl: 'garage/garage-main.html',
        controller: 'GarageCtrl'
      }
    }
  })

  .state('tabs.myCars', {
    url: '/garage/myCars',
    views: {
      'tab-garage': {
        templateUrl: 'garage/my-cars.html',
        controller: 'MyCarsCtrl'
      }
    }
  })

  .state('tabs.myEvents', {
    url: '/garage/myEvents',
    views: {
      'tab-garage': {
        templateUrl: 'garage/my-events.html',
        controller: 'MyEventsCtrl'
      }
    }
  })

  .state('tabs.myClubs', {
    url: '/garage/myClubs',
    views: {
      'tab-garage': {
        templateUrl: 'garage/my-clubs.html',
        controller: 'MyClubsCtrl'
      }
    }
  })

  .state('tabs.news', {
    url: '/news',
    views: {
      'tab-news' : {
        templateUrl: 'news/news-main.html'
      }
    }
  })

  .state('tabs.browse', {
    url: '/browse',
    views: {
      'tab-browse': {
        templateUrl: 'browse/browse-main.html',
        controller: 'BrowseCtrl'
      }
    }
  })

  .state('tabs.chat', {
    url: '/chat',
    views: {
      'tab-chat': {
        templateUrl: 'chat/chat-main.html',
        controller: 'ChatCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
