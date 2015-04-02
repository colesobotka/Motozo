// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'motozo.directives', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusBar.style(2);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('motozo', {
    url: "/motozo",
    abstract: true,
    templateUrl: "tabs/tabs.html"
  })

    // Each tab has its own nav history stack:

  .state('motozo.garage', {
    url: '/garage',
    //abstract: true,
    views: {
      'tab-garage': {
        templateUrl: 'garage/garage-main.html',
        controller: 'GarageCtrl'
      }
    }
  })

  .state('motozo.news', {
    url: '/news',
    views: {
      'tab-news' : {
        templateUrl: 'news/news-main.html'
      }
    }
  })

  .state('motozo.browse', {
    url: '/browse',
    views: {
      'tab-browse': {
        templateUrl: 'browse/browse-main.html',
        controller: 'BrowseCtrl'
      }
    }
  })

  .state('motozo.browse.cars', {
    url: '/cars',
    views: {
      'content-view': {
        templateUrl: 'browse/browse-cars.html',
        controller: 'BrowseCarsCtrl'
      }
    }
  })

  .state('motozo.browse.events', {
    url: '/events',
    views: {
      'content-view': {
        templateUrl: 'browse/browse-events.html',
        controller: 'BrowseEventsCtrl'
      }
    }
  })

  .state('motozo.browse.clubs', {
    url: '/clubs',
    views: {
      'content-view': {
        templateUrl: 'browse/browse-clubs.html',
        controller: 'BrowseClubsCtrl'
      }
    }
  })

  .state('motozo.chat', {
    url: '/chat',
    views: {
      'tab-chat': {
        templateUrl: 'chat/chat-main.html',
        controller: 'ChatCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/motozo/garage');

});
