var ScoreKeeper = (function() {
    "use strict";

    function scorekeeper(game) {
        this._game = game;
    };

    scorekeeper.prototype.score = function (frameNumber) {
        var total = 0;

        var frames = this._game.getFrames();
        frameNumber = frameNumber || frames.length;

        for (var i = 0; i < frameNumber; i++) {
            var frame = frames[i];
            total += frame.totalScore(frames[i + 1], frames[i + 2]);
        }

        return total;
    };

    scorekeeper.prototype.scoresheet = function (frameNumber) {
        var frameScore = { ball1: '', ball2: '', ball3: '', score: 0 };
        var frames = this._game.getFrames();

        frameNumber = frameNumber || frames.length;

        var frame = frames[frameNumber-1];
        frameScore.ball1 = translateFrame(frame, 1);
        frameScore.ball2 = translateFrame(frame, 2);
        frameScore.ball3 = translateFrame(frame, 3);
        frameScore.score = frame.totalScore(frames[frameNumber + 1], frames[frameNumber + 2]);

        return frameScore;
    };
    
    function translateFrame(frame, ball) {
        if (frame._rolls.length < ball)
            return '';

        var score = frame._rolls[ball - 1].score;
        var mask = frame._rolls[ball - 1].mask;
        var frameNumber = frame._number;

        if (score === 0) return '-';

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
            }
            return s.toString();
        };

        if (ball === 1) return getLetter(mask, score);

        if (ball === 2 && frameNumber < 10)
            return (frame._rolls[0].score + frame._rolls[1].score) === 15 ? '/' : score.toString();

        if (frameNumber === 10) {
            var ballScore1 = frame._rolls[0].score;
            var ballScore2 = frame._rolls[1] ? frame._rolls[1].score : 0;
            var ballScore3 = frame._rolls[2] ? frame._rolls[2].score : 0;

            if (ball === 2) {
                if (ballScore1 === 15)
                    return getLetter(mask, score);
                return ballScore1 + ballScore2 === 15 ? '/' : score.toString();
            } else if (ball === 3) {
                if (ballScore1 + ballScore2 === 30
                    || ballScore1 + ballScore2 === 15
                    || ballScore1 === 15) {
                    if (ballScore1 === 15 && ballScore2 !== 15)
                        return ballScore2 + ballScore3 === 15 ? '/' : score.toString();
                    if (ballScore2 !== 0)
                        return getLetter(mask, score);
                }
            }
        }
        return score.toString();
    }

    return scorekeeper;
})();
