var Pinsetter = (function() {
    "use strict";

    function pinsetter() {
        this._pins = [];
        this._prevMask = 0;
        this.reset();
    };

    pinsetter.prototype.getPins = function () {
        return this._pins;
    };

    pinsetter.prototype.getRackMask = function () {
        var mask = 0;
        var rack = this.getPins();

        angular.forEach(rack, function (pin) {
            if (!pin.isStanding)
                mask += Math.pow(2, pin.position);
        });

        return mask;
    };

    pinsetter.prototype.getShotMask = function () {
        return this._prevMask ^ this.getRackMask();
    };

    pinsetter.prototype.getRackValue = function () {
        return this.maskToScore(this.getRackMask());
    };

    pinsetter.prototype.getShotValue = function () {
        return this.maskToScore(this.getShotMask());
    };

    pinsetter.prototype.knockDown = function (mask) {
        var rack = this.getPins();
        this.setPrevState();

        angular.forEach(rack, function (pin) {
            var pinMask = Math.pow(2, pin.position);
            if ((pinMask & mask) == pinMask)
                pin.isStanding = false;
        });
    };

    pinsetter.prototype.setPrevState = function () {
        this._prevMask = this.getRackMask();
    };

    pinsetter.prototype.reset = function () {
        this._pins = newRack();
        this._prevMask = 0;
    };

    pinsetter.prototype.maskToScore = function(mask) {
        var score = 0;
        angular.forEach(newRack(), function (pin) {
            var pinMask = Math.pow(2, pin.position);
            if ((pinMask & mask) == pinMask)
                score += pin.value;
        });
        return score;
    };

    function newRack() {
        return [
            { name: "L2", value: 2, position: 0, isStanding: true },
            { name: "L3", value: 3, position: 1, isStanding: true },
            { name: "HP", value: 5, position: 2, isStanding: true },
            { name: "R3", value: 3, position: 3, isStanding: true },
            { name: "R2", value: 2, position: 4, isStanding: true }
        ];
    };

    return pinsetter;
})();