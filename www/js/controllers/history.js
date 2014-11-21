(function () {
    "use strict";

    app.controller("HistoryController", ["$scope", "GameRepository", "GoTo", function ($scope, gameRepository, goTo) {
        $scope.games = gameRepository.list().games;

        $scope.goTo = function (page) {
            goTo.page(page);
        };
    }]);
}());