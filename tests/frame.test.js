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
            rollFrame.call(this, 0, 0, 0);
            expect(this.frame.score()).toEqual(0);
        });
    });

    describe("Frame where all rolls are 5", function () {
        it("should score 15", function () {
            rollFrame.call(this, "11000", "00100", "00011");
            expect(this.frame.score()).toEqual(15);
        });
    });

    describe("Frame with a spare", function () {
        it("should score 15", function () {
            rollFrame.call(this, "11000", "00111");
            expect(this.frame.score()).toEqual(15);
        });
    });

    describe("Frame with a spare, followed by a 5", function () {
        it("should score 20", function () {
            rollFrame.call(this, "11000", "00111");
            expect(this.frame.totalScore({ _rolls: [{ score: 5 }, { score: 10 }] }, { _rolls: [{ score: 5 }, { score: 10 }] })).toEqual(20);
        });
    });

    describe("Frame with a spare, followed by a strike", function () {
        it("should score 30", function () {
            rollFrame.call(this, "11000", "00111");
            expect(this.frame.totalScore({ _rolls: [{ score: 15 }] }, { _rolls: [{ score: 5 }, { score: 10 }] })).toEqual(30);
        });
    });

    describe("Frame with a strike", function () {
        it("should score 15", function () {
            rollFrame.call(this, "11111");
            expect(this.frame.score()).toEqual(15);
        });
    });

    describe("Frame with a strike, followed by a 5", function () {
        it("should score 20", function () {
            rollFrame.call(this, "11111");
            expect(this.frame.totalScore({ _rolls: [{ score: 5 }, { score: 0 }, { score: 10 }] }, { _rolls: [{ score: 5 }, { score: 10 }] })).toEqual(20);
        });
    });

    describe("Frame with a strike, followed by a spare", function () {
        it("should score 30", function () {
            rollFrame.call(this, "11111");
            expect(this.frame.totalScore({ _rolls: [{ score: 5 }, { score: 10 }] }, { _rolls: [{ score: 5 }, { score: 10 }] })).toEqual(30);
        });
    });

    describe("Frame with a strike, followed by two strikes", function () {
        it("should score 45", function () {
            rollFrame.call(this, "11111");
            expect(this.frame.totalScore({ _rolls: [{ score: 15 }] }, { _rolls: [{ score: 15 }] })).toEqual(45);
        });
    });
});