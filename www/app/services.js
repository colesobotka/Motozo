angular.module('motozo.services', ['firebase'])

.factory("Fb", ['$firebaseAuth', function($firebaseAuth) {
    
    //Global variables used in init here
    var firebaseUrl = "https://motozo-app.firebaseio.com/";

    var ref = new Firebase(firebaseUrl);

    return {
      ref: ref,
      auth: $firebaseAuth(ref)
    };
}])


.factory('Cars', function() {
  var cars = [{
    id: 0,
    url: "img/TestCars/camaro.jpg",
    profileUrl: "img/TestAvatars/1.jpg",
    username: "mRogers",
    year: "2010",
    make: "Camaro",
    model: "SS"
  },
  {
    id: 1,
    url: "img/TestCars/ferrari.jpg",
    profileUrl: "img/TestAvatars/2.jpg",
    username: "f430Fan",
    year: "2009",
    make: "Ferrari",
    model: "f430"
  },
  {
    id: 2,
    url: "img/TestCars/lamborghini.jpg",
    profileUrl: "img/TestAvatars/3.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "f430"
  },
  {
    id: 3,
    url: "img/TestCars/mustang.jpg",
    profileUrl: "img/TestAvatars/4.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  {
    id: 4,
    url: "img/TestCars/nissan.jpg",
    profileUrl: "img/TestAvatars/1.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  {
    id: 5,
    url: "img/TestCars/subaru.jpg",
    profileUrl: "img/TestAvatars/2.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },{
    id: 6,
    url: "img/TestCars/camaro.jpg",
    profileUrl: "img/TestAvatars/3.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  {
    id: 7,
    url: "img/TestCars/ferrari.jpg",
    profileUrl: "img/TestAvatars/4.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  {
    id: 8,
    url: "img/TestCars/lamborghini.jpg",
    profileUrl: "img/TestAvatars/1.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  {
    id: 9,
    url: "img/TestCars/mustang.jpg",
    profileUrl: "img/TestAvatars/2.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  {
    id: 10,
    url: "img/TestCars/nissan.jpg",
    profileUrl: "img/TestAvatars/3.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  {
    id: 11,
    url: "img/TestCars/subaru.jpg",
    profileUrl: "img/TestAvatars/4.jpg",
    username: "mRogers",
    year: "2009",
    make: "Ferrari",
    model: "Sumthin"
  },
  
  ];

  return {
    all: function() {
      return cars;
    },
    remove: function(car) {
      cars.splice(cars.indexOf(car), 1);
    },
    get: function(carId) {
      for (var i = 0; i < cars.length; i++) {
        console.log("length: " + cars.length + " and i = " + i);
        if (cars[i].id === parseInt(carId)) {
          return cars[i];
        }
      }
      return null;
    }
  };
})

.factory('Events', function() {
  var events = [{
    id: 0,
    name: 'Muscle Car Extravaganza',
    url: 'img/TestEvents/carshow1.jpg'
  },
  {
    id: 1,
    name: 'Muscle Car Extravaganza',
    url: 'img/TestEvents/carshow2.jpg'
  },
  {
    id: 2,
    name: 'Muscle Car Extravaganza',
    url: 'img/TestEvents/carshow3.jpg'
  }];
  return {
    all: function() {
      return events;
    },
    get: function(eventId) {
      for (var i = 0; i < events.length; i++) {
        console.log("length: " + events.length + " and i = " + i);
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    }
  };
})

.factory('Clubs', function() {
  var clubs = [{
    id: 0,
    name: '4 cyl champions',
    url: 'img/TestClubs/1.jpg'
  },
  {
    id: 1,
    name: '6 cyl champions',
    url: 'img/TestClubs/2.gif'
  },
  {
    id: 2,
    name: '8 cyl champions',
    url: 'img/TestClubs/3.jpg'
  }];

  return {
    all: function() {
      return clubs;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/TestCars/nissan.jpg'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/TestCars/camaro.jpg'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'img/TestCars/lamborghini.jpg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/TestCars/subaru.jpg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/TestCars/nissan.jpg'
  },
  {
    id: 5,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/TestCars/nissan.jpg'
  }, {
    id: 6,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/TestCars/camaro.jpg'
  }, {
    id: 7,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'img/TestCars/lamborghini.jpg'
  }, {
    id: 8,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/TestCars/subaru.jpg'
  }, {
    id: 9,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/TestCars/nissan.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
