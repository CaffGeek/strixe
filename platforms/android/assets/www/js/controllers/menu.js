(function () {
    "use strict";

    app.controller("MenuController", ["$scope", "$location", "$ionicSideMenuDelegate", "GoTo", function ($scope, $location, $ionicSideMenuDelegate, goTo) {
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.goTo = function (page) {
            goTo.page(page);
        };
    }]);
}());