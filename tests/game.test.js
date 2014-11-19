describe("Game tests", function () {
    'use strict';

    beforeEach(function () {
        this.game = new Game();
    });

    function rollMany(howMany, score) {
        for (var i = 0; i < howMany; i++)
            this.game.roll(score);
    }

    function rollStrike() {
        this.game.roll(15);
    }

    function rollSpare(firstPins) {
        firstPins = firstPins || 5;
        this.game.roll(firstPins);
        this.game.roll(15 - firstPins);
    }

    function rollFrame(one, two, three) {
        this.game.roll(one);
        this.game.roll(two);
        this.game.roll(three);
    }

    describe("Gutter Game", function () {
        it("should score 0", function () {
            rollMany.call(this, 30, 0);
            expect(this.game.score()).toEqual(0);
        });
    });

    describe("Game where all rolls are 5", function () {
        it("should score 150", function () {
            rollMany.call(this, 30, 5);
            expect(this.game.score()).toEqual(150);
        });
    });

    describe("Game with 11 frames", function () {
        it("should stop after 10 frames", function () {
            rollMany.call(this, 33, 5);
            expect(this.game.score()).toEqual(150);
        });
    });

    describe("Game with one spare", function () {
        it("should score 25 given a spare followed by 5 and then gutter balls", function () {
            rollSpare.call(this);
            rollMany.call(this, 1, 5);
            rollMany.call(this, 26, 0);
            expect(this.game.score()).toEqual(25);
        });
    });

    describe("Game with one strike", function () {
        it("should score 35 given a spare followed by 5, 5 and then gutter balls", function () {
            rollStrike.call(this);
            rollMany.call(this, 2, 5);
            rollMany.call(this, 25, 0);
            expect(this.game.score()).toEqual(35);
        });
    });

    describe("Perfect game", function () {
        it("should score 450 given twelve strikes", function () {
            rollMany.call(this, 12, 15);
            expect(this.game.score()).toEqual(450);
        });

        it("should score 225 in frame 5", function () {
            rollMany.call(this, 12, 15);
            expect(this.game.score(5)).toEqual(225);
        });
    });

    describe("Game with all scoring variations including tenth frame", function () {
        it("should score 246", function () {
            /* 1*/rollStrike.call(this);
            /* 2*/rollStrike.call(this);
            /* 3*/rollFrame.call(this, 5, 5, 2);
            /* 4*/rollSpare.call(this, 13);
            /* 5*/rollFrame.call(this, 8, 5, 2);
            /* 6*/rollFrame.call(this, 8, 5, 2);
            /* 7*/rollStrike.call(this);
            /* 8*/rollFrame.call(this, 5, 3, 2);
            /* 9*/rollStrike.call(this);
            /*10*/rollFrame.call(this, 15, 15, 13);
            expect(this.game.score()).toEqual(246);
        });

        it("should score 192", function () {
            /* 1*/rollSpare.call(this, 5);
            /* 2*/rollFrame.call(this, 5, 5, 2);
            /* 3*/rollStrike.call(this);
            /* 4*/rollFrame.call(this, 5, 3, 5);
            /* 5*/rollFrame.call(this, 5, 5, 3);
            /* 6*/rollStrike.call(this);
            /* 7*/rollFrame.call(this, 13, 0, 2);
            /* 8*/rollStrike.call(this);
            /* 9*/rollFrame.call(this, 5, 5, 3);
            /*10*/rollFrame.call(this, 15, 5, 10);
            expect(this.game.score()).toEqual(192);
        });
    });
});