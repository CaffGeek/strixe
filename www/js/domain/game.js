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

    game.prototype.roll = function(pins) {
        var frame = this._frames[this._frames.length - 1];
        if (frame == undefined || frame.isComplete()) {
            frame = new Frame(this._frames.length + 1);
            if (frame._number === 11)
                return;

            this._frames.push(frame);
        }

        frame.roll(pins);
    };

    game.prototype.score = function(asOfFrame) {
        var total = 0;
        asOfFrame = asOfFrame || this._frames.length;

        for (var i = 0; i < asOfFrame; i++) {
            var frame = this._frames[i];
            total += frame.totalScore(this._frames[i + 1], this._frames[i + 2]);
        }

        return total;
    };

    game.prototype.shotToString = function(frame, rollIndex) {
        var ball = rollIndex + 1;
        var score = frame._rolls[rollIndex];
        var frameScore = frame.score();
        var frameNumber = frame._number;

        var getLetter = function (s) {
            switch (s) {
                case 15:
                    return 'X';
                case 13:
                    return 'R';
                case 11:
                    return 'A';
                case 10:
                    return 'C';
                case 8:
                    return 'S';
                case 5:
                    return 'H';
            }
            return s;
        };

        if (ball === 1) return getLetter(score);

        if (ball === 2 && frameNumber < 10)
            return frameScore === 15 ? '/' : score;

        if (frameNumber === 10) {
            var ballScore1 = frame._rolls[0];
            var ballScore2 = frame._rolls[1];
            var ballScore3 = frame._rolls[2];

            if (ball === 2) {
                if (ballScore1 === 15)
                    return getLetter(score);
                return ballScore1 + ballScore2 === 15 ? '/' : score;
            } else if (ball === 3) {
                if (ballScore1 + ballScore2 === 30
                    || ballScore1 + ballScore2 === 15) {
                    if (ballScore2 !== 0)
                        return getLetter(score);
                    if (ballScore1 === 15 && ballScore2 !== 15)
                        return ballScore2 + ballScore3 === 15 ? '/' : score;
                }
            }
        }

        return score;
    };

    return game;
})();