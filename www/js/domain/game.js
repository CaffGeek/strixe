var Game = (function () {
    "use strict";

    function game() {
        this._frames = [];
    };

    game.prototype.roll = function (pins) {
        var frame = this._frames[this._frames.length-1];
        if (frame == undefined || frame.isComplete()) {
            frame = new Frame(this._frames.length + 1);
            this._frames.push(frame);
        }

        frame.roll(pins);
    };

    game.prototype.score = function () {
        var total = 0;
        
        for (var i = 0; i < this._frames.length; i++) {
            var frame = this._frames[i];
            total += frame.totalScore(this._frames[i + 1], this._frames[i + 2]);
        }

        return total;
    };

    return game;
})();