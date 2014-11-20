var Frame = (function () {
    "use strict";

    function frame(number) {
        this._number = number || 1;
        this._rolls = [];
    };

    frame.prototype.roll = function (mask) {
        this._rolls.push({
            mask: mask,
            score: maskToScore(mask)
        });
    };

    frame.prototype.score = function () {
        var total = 0;
        for (var i = 0; i < this._rolls.length; i++) {
            total += this._rolls[i].score;
        }

        return total;
    };

    frame.prototype.totalScore = function (nextFrame1, nextFrame2) {
        var total = this.score();

        var nextRolls = [];
        if (this._number < 10 && nextFrame1) nextRolls = nextRolls.concat(nextFrame1._rolls);
        if (this._number < 9 && nextFrame2) nextRolls = nextRolls.concat(nextFrame2._rolls);
        nextRolls = nextRolls.concat([{ score: 0 }, { score: 0 }]);

        if (this.isStrike()) {
            total += nextRolls[0].score + nextRolls[1].score;
        } else if (this.isSpare()) {
            total += nextRolls[0].score;
        }

        return total;
    };

    frame.prototype.isComplete = function () {
        return (this._number < 10 && (this._rolls.length === 3 || this.score() === 15))
            || (this._number === 10 && this._rolls.length === 3);
    };

    frame.prototype.isStrike = function () {
        return this._number < 10 && this._rolls[0] && this._rolls[0].score === 15;
    };

    frame.prototype.isSpare = function () {
        return this._number < 10 && this._rolls[0] && this._rolls[1] && (this._rolls[0].score + this._rolls[1].score === 15);
    };

    //Duplicated in pinsetter.js
    function newRack() {
        return [
            { name: "L2", value: 2, position: 0, isStanding: true },
            { name: "L3", value: 3, position: 1, isStanding: true },
            { name: "HP", value: 5, position: 2, isStanding: true },
            { name: "R3", value: 3, position: 3, isStanding: true },
            { name: "R2", value: 2, position: 4, isStanding: true }
        ];
    };

    //Duplicated in pinsetter.js
    function maskToScore(mask) {
        var score = 0;
        angular.forEach(newRack(), function (pin) {
            var pinMask = Math.pow(2, pin.position);
            if ((pinMask & mask) == pinMask)
                score += pin.value;
        });
        return score;
    };

    return frame;
})();