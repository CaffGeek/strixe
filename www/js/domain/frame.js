var Frame = (function () {
    "use strict";

    function frame(number) {
        this.number = number || 1;
        this._rolls = [];
    };

    frame.prototype.mask = function () {
        var frameMask = 0;
        if (this.getBall(1)) frameMask |= this.getBall(1).mask;
        if (this.getBall(2)) frameMask |= this.getBall(2).mask;
        if (this.getBall(3)) frameMask |= this.getBall(3).mask;
        return frameMask;
    }

    frame.prototype.getBall = function (ball) {
        return this._rolls[ball - 1];
    };

    frame.prototype.roll = function (mask) {
        this._rolls.push({
            mask: mask
        });
    };

    frame.prototype.isComplete = function() {
        return (this.number < 10 && (this._rolls.length === 3 || this.mask() === parseInt('11111', 2)))
            || (this.number === 10 && this._rolls.length === 3);
    };

    return frame;
})();