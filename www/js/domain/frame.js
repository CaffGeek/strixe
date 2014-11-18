var Frame = (function () {
    "use strict";

    function frame(number) {
        this._number = number || 1;
        this._rolls = [];
    };

    frame.prototype.roll = function (pins) {
        this._rolls.push(pins);
    };

    frame.prototype.score = function () {
        var total = 0;
        for (var i = 0; i < this._rolls.length; i++) {
            total += this._rolls[i];
        }

        return total;
    };

    frame.prototype.totalScore = function (nextFrame1, nextFrame2) {
        var total = this.score();

        var nextRolls = [];
        if (this._number < 10 && nextFrame1) nextRolls = nextRolls.concat(nextFrame1._rolls);
        if (this._number < 9 && nextFrame2) nextRolls = nextRolls.concat(nextFrame2._rolls);
        nextRolls = nextRolls.concat([0, 0]);

        if (this.isStrike()) {
            total += nextRolls[0] + nextRolls[1];
        } else if (this.isSpare()) {
            total += nextRolls[0];
        }

        return total;
    };

    frame.prototype.isComplete = function () {
        return (this._number < 10 && (this._rolls.length === 3 || this.score() === 15))
            || (this._number === 10 && this._rolls.length === 3);
    };

    frame.prototype.isStrike = function () {
        return this._number < 10 && this._rolls[0] === 15;
    };

    frame.prototype.isSpare = function () {
        return this._number < 10 && (this._rolls[0] + this._rolls[1] === 15);
    };

    return frame;
})();