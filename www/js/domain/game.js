var Game = (function() {
    "use strict";

    function game() {
        this._frames = [];
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
            if (frame._number === 11)
                return;

            this._frames.push(frame);
        }

        frame.roll(mask);
    };

    return game;
})();