(function() {
    "use strict";

    app.controller("GameController", ["$scope", "$ionicScrollDelegate", "$ionicLoading", "$state", "GameRepository",
        function($scope, $ionicScrollDelegate, $ionicLoading, $state, gameRepository) {
            var $stateParams = $state.$current.locals['@game'] ? $state.$current.locals['@game'].$stateParams : {}; //why?
            $scope.pinsetter = new Pinsetter();
            $scope.game = $stateParams.id
                ? new Game(gameRepository.load($stateParams.id))
                : new Game();
            $scope.scorekeeper = new ScoreKeeper($scope.game, $scope.pinsetter);

            $scope.roll = function() {
                var shotValue = this.pinsetter.getShotMask();
                $scope.game.roll(shotValue);

                //If we completed the frame, rerack the pins
                console.log($scope.pinsetter.getRackMask());
                if ($scope.game.currentFrame().isComplete()
                    || $scope.pinsetter.getRackMask().toString(2) === "11111")
                    $scope.rack = this.pinsetter.reset();

                this.pinsetter.setPrevState();
            };

            $scope.rollClean = function() {
                angular.forEach(this.pinsetter.getPins(), function(pin) {
                    pin.isStanding = false;
                });
                $scope.roll();
            };

            $scope.save = function() {
                $ionicLoading.show({ template: 'Saving...', noBackdrop: false, duration: 1000 });
                gameRepository.save($scope.game);
                $ionicLoading.show({ template: 'Saving Complete!', noBackdrop: false, duration: 1000 });
            };

            $scope.scroll = function() {
                $ionicScrollDelegate.scrollTo(999999);
            };
        }
    ]);
}());