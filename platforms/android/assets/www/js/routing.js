app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        })
        .state('history', {
            url: '/history',
            templateUrl: 'views/history.html'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'views/settings.html'
        })
        .state('game', {
            url: '/game',
            templateUrl: 'views/game.html'
        });
});