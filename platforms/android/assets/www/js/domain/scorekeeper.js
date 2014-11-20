var ScoreKeeper = (function() {
    "use strict";

    function scorekeeper(game, pinsetter) {
        this._game = game;
        this._pinsetter = pinsetter;
    };

    scorekeeper.prototype.score = function (frameNumber) {
        var total = 0;

        var frames = this._game.getFrames();
        frameNumber = frameNumber || frames.length;

        for (var i = 0; i < frameNumber; i++) {
            var frame = frames[i];

            if (frame.number < 10) {
                var score = this._pinsetter.maskToScore(frame.mask());
                total += score;

                if (frame.getBall(2) === undefined && frames[i + 1]) {
                    var strikeNextBall1 = frames[i + 1].getBall(1);
                    var strikeNextBall2 = frames[i + 1].getBall(2)
                        || (frames[i + 2] ? frames[i + 2].getBall(1) : {});

                    total += this._pinsetter.maskToScore(strikeNextBall1.mask);
                    total += this._pinsetter.maskToScore(strikeNextBall2.mask);
                } else if (frame.getBall(3) === undefined && frames[i + 1]) {
                    var spareNextBall1 = frames[i + 1].getBall(1);
                    total += this._pinsetter.maskToScore(spareNextBall1.mask);
                }
            } else if (frame.number === 10) {
                if (frame.getBall(1)) total += this._pinsetter.maskToScore(frame.getBall(1).mask);
                if (frame.getBall(2)) total += this._pinsetter.maskToScore(frame.getBall(2).mask);
                if (frame.getBall(3)) total += this._pinsetter.maskToScore(frame.getBall(3).mask);
            }
        }

        return total;
    };

    scorekeeper.prototype.scoresheet = function (frameNumber) {
        var frameScore = { ball1: '', ball2: '', ball3: '', score: 0 };
        var frames = this._game.getFrames();

        frameNumber = frameNumber || frames.length;

        var frame = frames[frameNumber-1];
        frameScore.ball1 = translateFrame.call(this, frame, 1);
        frameScore.ball2 = translateFrame.call(this, frame, 2);
        frameScore.ball3 = translateFrame.call(this, frame, 3);
        frameScore.score = this.score(frameNumber);

        return frameScore;
    };
    
    function translateFrame(frame, ball) {
        if (frame._rolls.length < ball)
            return '';

        var mask = frame._rolls[ball - 1].mask;
        var frameNumber = frame.number;

        var score = this._pinsetter.maskToScore(mask);
        if (score === 0) return '-';

        var ball1Score = this._pinsetter.maskToScore((frame._rolls[0] || {}).mask);
        var ball2Score = this._pinsetter.maskToScore((frame._rolls[1] || {}).mask);
        var ball3Score = this._pinsetter.maskToScore((frame._rolls[2] || {}).mask);

        var getLetter = function (m, s) {
            switch (m) {
                case parseInt('11111', 2):
                    return 'X';
                case parseInt('11110', 2):
                    return 'R';
                case parseInt('01111', 2):
                    return 'L';
                case parseInt('01110', 2):
                    return 'A';
                case parseInt('00111', 2):
                case parseInt('11100', 2):
                    return 'C';
                case parseInt('00110', 2):
                case parseInt('01100', 2):
                    return 'S';
                case parseInt('00100', 2):
                    return 'H';
                default:
                    return s.toString();
            }
        };

        if (ball === 1) return getLetter(mask, score);

        if (ball === 2 && frameNumber < 10)
            return (ball1Score + ball2Score) === 15 ? '/' : score.toString();

        if (frameNumber === 10) {
            if (ball === 2) {
                if (ball1Score === 15)
                    return getLetter(mask, score);
                return ball1Score + ball2Score === 15 ? '/' : score.toString();
            } else if (ball === 3) {
                if (ball1Score + ball2Score === 30
                    || ball1Score + ball2Score === 15
                    || ball1Score === 15) {
                    if (ball1Score === 15 && ball2Score !== 15)
                        return ball2Score + ball3Score === 15 ? '/' : score.toString();
                    if (ball2Score !== 0)
                        return getLetter(mask, score);
                }
            }
        }
        return score.toString();
    }

    return scorekeeper;
})();
