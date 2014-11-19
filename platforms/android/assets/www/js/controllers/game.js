(function () {
    "use strict";

    app.controller("GameController", ["$scope", "$ionicScrollDelegate", function ($scope, $ionicScrollDelegate) {
        $scope.rack = newRack();
        $scope.prevRackState = [];
        angular.copy($scope.rack, $scope.prevRackState);

        $scope.game = new Game();

        $scope.roll = function () {
            var roll = 0;
            angular.forEach($scope.rack, function(pin) {
                if (!pin.isStanding)
                    roll += pin.value;
            });
            $scope.game.roll(rackDifference($scope.rack, $scope.prevRackState));

            //If we completed the frame, rerack the pins
            if ($scope.game.currentFrame().isComplete()
                || $scope.game.currentFrame().score() % 15 === 0)
                $scope.rack = newRack();
            angular.copy($scope.rack, $scope.prevRackState);
        };

        $scope.rollClean = function () {
            angular.forEach($scope.rack, function (pin) {
                pin.isStanding = false;
            });
            $scope.roll();
        };

        $scope.scroll = function() {
            $ionicScrollDelegate.scrollTo(999999);
        };

        function rackDifference(rack, prevRack) {
            var roll = 0;
            for (var i = 0; i < 5; i++) {
                if (prevRack[i].isStanding && !rack[i].isStanding)
                    roll += rack[i].value;
            }
            return roll;
        };

        function newRack() {
            return [
                { name: "L2", value: 2, position: 0, isStanding: true },
                { name: "L3", value: 3, position: 1, isStanding: true },
                { name: "HP", value: 5, position: 2, isStanding: true },
                { name: "R3", value: 3, position: 3, isStanding: true },
                { name: "R2", value: 2, position: 4, isStanding: true }
            ];
        };
    }]);
}());