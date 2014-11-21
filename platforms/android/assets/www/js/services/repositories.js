angular.module('StriXe.Repositories')
       .factory('GameRepository', ['$http', '$localstorage', function ($http, $localstorage) {
           return {
               list: function () {
                   var gamelist = $localstorage.getObject('gamelist');
                   gamelist.games = gamelist.games || [];
                   return gamelist;
               },
               save: function (game) {
                   if (!game.id) {
                       game.id = Math.random().toString(16).slice(2);
                       var gamelist = this.list();
                       gamelist.games.push({
                           id: game.id,
                           date: game.date,
                           season: game.season.name,
                           league: game.league.name
                       });
                       $localstorage.setObject('gamelist', gamelist);
                   }
                   $localstorage.setObject('game-' + game.id.toString(), game);
               },
               load: function (id) {
                   var game = $localstorage.getObject('game-' + id);
                   return game;
               }
           };
       }])
       .factory('SettingRepository', ['$http', '$localstorage', function ($http, $localstorage) {
           return {
               getLeagues: function () {
                   var leaguelist = $localstorage.getObject('leaguelist');
                   leaguelist.leagues = leaguelist.leagues || [];
                   return leaguelist;
               },
               addLeague: function (name) {
                   var leaguelist = this.getLeagues();
                   if (leaguelist.leagues.filter(function (e) { return e.name == name; }).length)
                       return;

                   leaguelist.leagues.push({ name: name });
                   $localstorage.setObject('leaguelist', leaguelist);
               },
               getSeasons: function () {
                   var seasonlist = $localstorage.getObject('seasonlist');
                   seasonlist.seasons = seasonlist.seasons || [];
                   return seasonlist;
               },
               addSeason: function (name) {
                   var seasonlist = this.getSeasons();
                   if (seasonlist.seasons.filter(function (e) { return e.name == name; }).length)
                       return;

                   seasonlist.seasons.push({ name: name });
                   $localstorage.setObject('seasonlist', seasonlist);
               }
           };
       }]);