(function () {
    "use strict";

    app.controller("GameController", ["$scope", "$ionicScrollDelegate", function ($scope, $ionicScrollDelegate) {
        $scope.pinsetter = new Pinsetter();
        $scope.game = new Game();
        $scope.scorekeeper = new ScoreKeeper($scope.game);
        
        $scope.roll = function () {
            var shotValue = this.pinsetter.getShotMask();
            $scope.game.roll(shotValue);

            //If we completed the frame, rerack the pins
            if ($scope.game.currentFrame().isComplete()
                || $scope.game.currentFrame().score() % 15 === 0)
                $scope.rack = this.pinsetter.reset();

            this.pinsetter.setPrevState();
        };

        $scope.rollClean = function () {
            angular.forEach(this.pinsetter.getPins(), function(pin) {
                pin.isStanding = false;
            });
            $scope.roll();
        };

        $scope.scroll = function() {
            $ionicScrollDelegate.scrollTo(999999);
        };
    }]);
}());