angular.module('StriXe.Navigation')
       .factory('GoTo', ["$location", "$ionicSideMenuDelegate", function ($location, $ionicSideMenuDelegate) {
           return {
               page: function (page) {
                   $ionicSideMenuDelegate.toggleLeft(false);
                   $location.url('/' + page);
               }
           };
       }]);