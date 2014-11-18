(function () {
    "use strict";

    app.controller("GameController", ["$scope", function ($scope) {
        $scope.game = { Frames: [] };

        $scope.roll = function (roll) {
            var frame = { Number: 1, Shots: [roll] };
            $scope.game.Frames.push(frame);
        };
    }]);
}());