angular.module('motozo.directives', [])
.directive('tabState', function($state, $ionicHistory) {

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function() {
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true
          });
          $state.go(attrs.tabState);
        });
        scope.$watch(function() {
          return $state.current.name;
        }, function(stateName) {
           if(stateName === attrs.tabState) {
             element.addClass('active');
           }
          else {
            element.removeClass('active');
          }
        });
      }
    };
  })

.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(max, amt);
    fadeAmt = 1 - amt / max;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var amt;

      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;

      var fadeAmt;
      
      $element.addClass('has-shrinking-subheader');

      var header = $document[0].body.querySelector('ion-view[nav-view="active"] > .header-shrink');
      var headerHeight = header.offsetHeight;
      
      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;

        if(scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
        } else {
          y = 0;
        }
        console.log(scrollTop);

        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;
          }
        });

        prevY = scrollTop;
      }

      $element.bind('scroll', onScroll);
    }
  };
});