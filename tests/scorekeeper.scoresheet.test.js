describe("Score Keeper ScoreSheet tests", function() {
    'use strict';

    beforeEach(function () {
        this.game = new Game();
        this.pinsetter = new Pinsetter();
        this.scorekeeper = new ScoreKeeper(this.game, this.pinsetter);
    });

    function rollFrame(one, two, three) {
        if (one) this.game.roll(parseInt(one, 2));
        if (two) this.game.roll(parseInt(two, 2));
        if (three) this.game.roll(parseInt(three, 2));
    };
    
    describe("Gutter Frame", function () {
        it("should score ---:0", function () {
            rollFrame.call(this, "00000", "00000", "00000");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(0);
        });
    });

    describe("Fives Frame", function () {
        it("should score 555:15", function () {
            rollFrame.call(this, "11000", "00100", "00011");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('5');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('5');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('5');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(15);
        });
    });

    describe("Headpin", function () {
        it("should score H55:15", function () {
            rollFrame.call(this, "00100", "11000", "00011");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('H');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('5');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('5');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(15);
        });
    });

    describe("Aces", function () {
        it("should score A--:11", function () {
            rollFrame.call(this, "01110", "00000", "00000");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('A');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(11);
        });
    });

    describe("Chop left", function () {
        it("should score C--:10", function () {
            rollFrame.call(this, "00111", "00000", "00000");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('C');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(10);
        });
    });

    describe("Chop right", function () {
        it("should score C--:10", function () {
            rollFrame.call(this, "11100", "00000", "00000");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('C');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(10);
        });
    });

    describe("Right spare", function () {
        it("should score R/:15", function () {
            rollFrame.call(this, "11110", "00001");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('R');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('/');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(15);
        });
    });

    describe("Left miss two", function () {
        it("should score L-2:15", function () {
            rollFrame.call(this, "01111", "00000", "10000");
            expect(this.scorekeeper.scoresheet(1).ball1).toEqual('L');
            expect(this.scorekeeper.scoresheet(1).ball2).toEqual('-');
            expect(this.scorekeeper.scoresheet(1).ball3).toEqual('2');
            expect(this.scorekeeper.scoresheet(1).score).toEqual(15);
        });
    });

    describe("frame with a spare, followed by a 5", function () {
        it("should score 20", function () {
            rollFrame.call(this, "11000", "00111");
            rollFrame.call(this, "11000", "00111");
            expect(this.scorekeeper.scoresheet(1).score).toEqual(20);
        });
    });

    describe("frame with a spare, followed by a strike", function () {
        it("should score 30", function () {
            rollFrame.call(this, "11000", "00111");
            rollFrame.call(this, "11111");
            expect(this.scorekeeper.scoresheet(1).score).toEqual(30);
        });
    });

    describe("frame with a strike", function () {
        it("should score 15", function () {
            rollFrame.call(this, "11111");
            expect(this.scorekeeper.scoresheet(1).score).toEqual(15);
        });
    });

    describe("frame with a strike, followed by a 5", function () {
        it("should score 20", function () {
            rollFrame.call(this, "11111");
            rollFrame.call(this, "11000", "00000", "00111");
            expect(this.scorekeeper.scoresheet(1).score).toEqual(20);
        });
    });

    describe("frame with a strike, followed by a spare", function () {
        it("should score 30", function () {
            rollFrame.call(this, "11111");
            rollFrame.call(this, "11000", "00111");
            expect(this.scorekeeper.scoresheet(1).score).toEqual(30);
        });
    });

    describe("frame with a strike, followed by two strikes", function () {
        it("should score 45", function () {
            rollFrame.call(this, "11111");
            rollFrame.call(this, "11111");
            rollFrame.call(this, "11111");
            expect(this.scorekeeper.scoresheet(1).score).toEqual(45);
        });
    });

    describe("Tenth Frame", function () {
        beforeEach(function () {
            //Roll gutters for the first 9 frames
            for (var i = 0; i < 9; i++) rollFrame.call(this, "00000", "00000", "00000");
        });

        it("should score L-2:15", function () {
            rollFrame.call(this, "01111", "00000", "00001");
            expect(this.scorekeeper.scoresheet(10).ball1).toEqual('L');
            expect(this.scorekeeper.scoresheet(10).ball2).toEqual('-');
            expect(this.scorekeeper.scoresheet(10).ball3).toEqual('2');
            expect(this.scorekeeper.scoresheet(10).score).toEqual(15);
        });

        it("should score XXX:45", function () {
            rollFrame.call(this, "11111", "11111", "11111");
            expect(this.scorekeeper.scoresheet(10).ball1).toEqual('X');
            expect(this.scorekeeper.scoresheet(10).ball2).toEqual('X');
            expect(this.scorekeeper.scoresheet(10).ball3).toEqual('X');
            expect(this.scorekeeper.scoresheet(10).score).toEqual(45);
        });

        it("should score XR/:30", function () {
            rollFrame.call(this, "11111", "11110", "00001");
            expect(this.scorekeeper.scoresheet(10).ball1).toEqual('X');
            expect(this.scorekeeper.scoresheet(10).ball2).toEqual('R');
            expect(this.scorekeeper.scoresheet(10).ball3).toEqual('/');
            expect(this.scorekeeper.scoresheet(10).score).toEqual(30);
        });

        it("should score R/X:30", function () {
            rollFrame.call(this, "11110", "00001", "11111");
            expect(this.scorekeeper.scoresheet(10).ball1).toEqual('R');
            expect(this.scorekeeper.scoresheet(10).ball2).toEqual('/');
            expect(this.scorekeeper.scoresheet(10).ball3).toEqual('X');
            expect(this.scorekeeper.scoresheet(10).score).toEqual(30);
        });
    });
});