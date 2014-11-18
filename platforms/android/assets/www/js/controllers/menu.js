(function () {
    "use strict";

    app.controller("MenuController", ["$scope", "$location", "$ionicSideMenuDelegate", function ($scope, $location, $ionicSideMenuDelegate) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.goTo = function (page) {
            $ionicSideMenuDelegate.toggleLeft();
            $location.url('/' + page);
        };
    }]);
}());