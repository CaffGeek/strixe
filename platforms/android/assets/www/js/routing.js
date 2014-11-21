app.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        })
        .state('history', {
            url: '/history',
            controller: 'HistoryController',
            templateUrl: 'views/history.html'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'views/settings.html'
        })
        .state('statistics', {
            url: '/statistics',
            templateUrl: 'views/statistics.html'
        })
        .state('game', {
            url: '/game',
            controller: 'GameController',
            templateUrl: 'views/game.html'
        })
        .state('game.id', {
            url: '/:id',
            controller: 'GameController',
            templateUrl: 'views/game.html'
        });
});