var Game = (function () {
    "use strict";

    function game() {
        this._frames = [];
    };

    game.prototype.getFrames = function () {
        return this._frames;
    };

    game.prototype.currentFrame = function () {
        return this._frames[this._frames.length - 1];
    };

    game.prototype.roll = function (pins) {
        var frame = this._frames[this._frames.length-1];
        if (frame == undefined || frame.isComplete()) {
            frame = new Frame(this._frames.length + 1);
            if (frame._number === 11)
                return;

            this._frames.push(frame);
        }

        frame.roll(pins);
    };

    game.prototype.score = function (asOfFrame) {
        var total = 0;
        asOfFrame = asOfFrame || this._frames.length;
        
        for (var i = 0; i < asOfFrame; i++) {
            var frame = this._frames[i];
            total += frame.totalScore(this._frames[i + 1], this._frames[i + 2]);
        }

        return total;
    };

    return game;
})();