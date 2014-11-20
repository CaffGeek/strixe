describe("Frame tests", function () {
    'use strict';

    beforeEach(function () {
        this.frame = new Frame();
    });

    function rollFrame(one, two, three) {
        if (one) this.frame.roll(parseInt(one, 2));
        if (two) this.frame.roll(parseInt(two, 2));
        if (three) this.frame.roll(parseInt(three, 2));
    }

    describe("Gutter Frame", function () {
        it("should score 0", function () {
            rollFrame.call(this, "00000", "00000", "00000");
            expect(this.frame.mask()).toEqual(parseInt("00000", 2));
        });
    });

    describe("Frame where all rolls are 5", function () {
        it("should score 15", function () {
            rollFrame.call(this, "11000", "00100", "00011");
            expect(this.frame.mask()).toEqual(parseInt("11111", 2));
        });
    });

    describe("Frame with a spare", function () {
        it("should score 15", function () {
            rollFrame.call(this, "11000", "00111");
            expect(this.frame.mask()).toEqual(parseInt("11111", 2));
        });
    });
});