var Game = (function() {
    "use strict";

    function game(loadgame) {
        this._frames = [];

        if (loadgame)
            this.load(loadgame);
    };

    game.prototype.getFrames = function() {
        return this._frames;
    };

    game.prototype.currentFrame = function() {
        return this._frames[this._frames.length - 1];
    };

    game.prototype.roll = function(mask) {
        var frame = this._frames[this._frames.length - 1];
        if (frame == undefined || frame.isComplete()) {
            frame = new Frame(this._frames.length + 1);
            if (frame.number === 11)
                return;

            this._frames.push(frame);
        }

        frame.roll(mask);
    };

    game.prototype.load = function (loadgame) {
        var that = this;
        that.id = loadgame.id;
        that.league = loadgame.league;
        that.season = loadgame.season;
        that.date = new Date(loadgame.date);
        angular.forEach(loadgame._frames, function(frame) {
            that._frames.push(new Frame(frame));
        });
    };

    return game;
})();