var Frame = (function () {
    "use strict";

    function frame(f) {
        this._rolls = [];

        if (typeof f === 'number')
            this.number = f || 1;

        if (typeof f === 'object')
            this.load(f);
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

    frame.prototype.load = function (loadframe) {
        var that = this;
        that.number = loadframe.number;
        angular.forEach(loadframe._rolls, function (roll) {
            that._rolls.push(roll);
        });
    };

    return frame;
})();