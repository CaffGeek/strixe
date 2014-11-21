angular.module('StriXe.Repositories')
       .factory('GameRepository', ['$http', '$localstorage', function ($http, $localstorage) {
           return {
               list: function() {
                   var gamelist = $localstorage.getObject('gamelist');
                   gamelist.games = gamelist.games || [];
                   return gamelist;
               },
               save: function (game) {
                   if (!game.id) {
                       game.id = Math.random().toString(16).slice(2);
                       var gamelist = this.list();
                       gamelist.games.push(game.id);
                       $localstorage.setObject('gamelist', gamelist);
                   }
                   $localstorage.setObject('game-' + game.id.toString(), game);
               },
               load: function (id) {
                   return $localstorage.getObject('game-' + id);
               }
           };
       }]);