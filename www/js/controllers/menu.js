(function () {
    "use strict";

    app.controller("MenuController", ["$scope", "$location", "$ionicSideMenuDelegate", "$state", function ($scope, $location, $ionicSideMenuDelegate, $state) {
        $scope.toggleLeft = function(isOpen) {
            $ionicSideMenuDelegate.toggleLeft(isOpen);
        };
    }]);
}());