(function () {
    "use strict";

    app.controller("HistoryController", ["$scope", "GameRepository", function ($scope, gameRepository) {
        $scope.games = gameRepository.list().games;
    }]);
}());