(function() {
    "use strict";

    app.controller("GameController", ["$scope", "$ionicScrollDelegate", "$ionicLoading", "$ionicPopup", "$state", "GameRepository", "SettingRepository",
        function ($scope, $ionicScrollDelegate, $ionicLoading, $ionicPopup, $state, gameRepository, settingRepository) {
            var $stateParams = $state.$current.locals['@game'] ? $state.$current.locals['@game'].$stateParams : {}; //why?
            $scope.pinsetter = new Pinsetter();
            $scope.game = $stateParams.id
                ? new Game(gameRepository.load($stateParams.id))
                : new Game();
            $scope.scorekeeper = new ScoreKeeper($scope.game, $scope.pinsetter);

            //TODO:
            settingRepository.addLeague('EK Seniors Mixed');
            settingRepository.addLeague('St James All Stars');
            settingRepository.addLeague('Master Bowlers Association');
            $scope.leagues = settingRepository.getLeagues().leagues;
            $scope.game.league = $scope.game.league || $scope.leagues[0] || '';

            settingRepository.addSeason('2014-2015');
            settingRepository.addSeason('2015-2016');
            $scope.seasons = settingRepository.getSeasons().seasons;
            $scope.game.season = $scope.game.season || $scope.seasons[0] || '';

            $scope.game.date = $scope.game.date || new Date();

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

            $scope.new = function () {
                gameRepository.save($scope.game);
                $state.go('game.load', { id: $scope.game.id });
            };

            $scope.newLeague = function () {

            };

            $scope.newSeason = function () {

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