describe("Frame tests", function () {
    'use strict';

    beforeEach(function () {
        this.frame = new Frame();
    });

    function rollStrike() {
        this.frame.roll(15);
    }

    function rollSpare(firstPins) {
        firstPins = firstPins || 5;
        this.frame.roll(firstPins);
        this.frame.roll(15 - firstPins);
    }

    function rollFrame(one, two, three) {
        this.frame.roll(one);
        this.frame.roll(two);
        this.frame.roll(three);
    }

    describe("Gutter Frame", function () {
        it("should score 0", function () {
            rollFrame.call(this, 0, 0, 0);
            expect(this.frame.score()).toEqual(0);
        });
    });

    describe("Frame where all rolls are 5", function () {
        it("should score 15", function () {
            rollFrame.call(this, 5, 5, 5);
            expect(this.frame.score()).toEqual(15);
        });
    });

    describe("Frame with a spare", function () {
        it("should score 15", function () {
            rollSpare.call(this, 5);
            expect(this.frame.score()).toEqual(15);
        });
    });

    describe("Frame with a spare, followed by a 5", function () {
        it("should score 20", function () {
            rollSpare.call(this, 5);
            expect(this.frame.totalScore({ _rolls: [5, 10] }, { _rolls: [5, 10] })).toEqual(20);
        });
    });

    describe("Frame with a spare, followed by a strike", function () {
        it("should score 30", function () {
            rollSpare.call(this, 5);
            expect(this.frame.totalScore({ _rolls: [15] }, { _rolls: [5, 10] })).toEqual(30);
        });
    });

    describe("Frame with a strike", function () {
        it("should score 15", function () {
            rollStrike.call(this);
            expect(this.frame.score()).toEqual(15);
        });
    });

    describe("Frame with a strike, followed by a 5", function () {
        it("should score 20", function () {
            rollStrike.call(this);
            expect(this.frame.totalScore({ _rolls: [5, 0, 10] }, { _rolls: [5, 10] })).toEqual(20);
        });
    });

    describe("Frame with a strike, followed by a spare", function () {
        it("should score 30", function () {
            rollStrike.call(this);
            expect(this.frame.totalScore({ _rolls: [5, 10] }, { _rolls: [5, 10] })).toEqual(30);
        });
    });

    describe("Frame with a strike, followed by two strikes", function () {
        it("should score 45", function () {
            rollStrike.call(this);
            expect(this.frame.totalScore({ _rolls: [15] }, { _rolls: [15] })).toEqual(45);
        });
    });
});