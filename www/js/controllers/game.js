(function () {
    "use strict";

    app.controller("GameController", ["$scope", function ($scope) {
        $scope.game = new Game();

        $scope.roll = function (roll) {
            $scope.game.roll(5);
        };
    }]);
}());