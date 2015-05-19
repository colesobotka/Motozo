angular.module('motozo.routes', []).config(function ($stateProvider, $urlRouterProvider) {

//TODO: If app gets larger we need to modularize the routes more	
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "app/components/login/login.html"
  })

  .state('registration', {
    url: '/registration',
    templateUrl: 'app/components/login/registration.html'
  })

  .state('main', {
    url: "/main",
    abstract: true,
    templateUrl: "app/components/tabs/side-menu.html"
  })

  // setup an abstract state for the tabs directive
    .state('main.tabs', {
    url: "/tabs",
    views: {
      'main-view': {
        templateUrl: "app/components/tabs/tabs.html"
      }
    }
  })

  .state('main.options', {
    url: "/options",
    views: {
      'main-view': {
        templateUrl: "app/components/options/options-main.html",
        controller: "OptionsCtrl"
      }
    }
  })

    // Each tab has its own nav history stack:

  .state('main.tabs.garage', {
    url: '/garage',
    //abstract: true,
    views: {
      'tab-garage': {
        templateUrl: 'app/components/garage/garage-main.html',
        controller: 'GarageCtrl'
      }
    }
  })

  .state('main.tabs.myCars', {
    url: '/garage/myCars',
    views: {
      'tab-garage': {
        templateUrl: 'app/components/garage/my-cars.html'
      }
    }
  })

  .state('main.tabs.myEvents', {
    url: '/garage/myEvents',
    views: {
      'tab-garage': {
        templateUrl: 'app/components/garage/my-events.html'
      }
    }
  })

  .state('main.tabs.myClubs', {
    url: '/garage/myClubs',
    views: {
      'tab-garage': {
        templateUrl: 'app/components/garage/my-clubs.html'
      }
    }
  })

  .state('main.tabs.news', {
    url: '/news',
    views: {
      'tab-news' : {
        templateUrl: 'app/components/news/news-main.html'
      }
    }
  })

  .state('main.tabs.browse', {
    url: '/browse',
    views: {
      'tab-browse': {
        templateUrl: 'app/components/browse/browse-main.html',
        controller: 'BrowseCtrl'
      }
    }
  })

  .state('main.tabs.chat', {
    url: '/chat',
    views: {
      'tab-chat': {
        templateUrl: 'app/components/chat/chat-main.html',
        controller: 'ChatCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});