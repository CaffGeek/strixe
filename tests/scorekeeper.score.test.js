describe("Score Keeper Score tests", function() {
    'use strict';

    beforeEach(function () {
        this.game = new Game();
        this.scorekeeper = new ScoreKeeper(this.game);
    });

    function rollFrame(one, two, three) {
        if (one) this.game.roll(parseInt(one, 2));
        if (two) this.game.roll(parseInt(two, 2));
        if (three) this.game.roll(parseInt(three, 2));
    };
    
    describe("Gutter Game", function () {
        it("should score 0", function () {
            for (var i = 0; i < 10; i++) rollFrame.call(this, "00000", "00000", "00000");
            expect(this.scorekeeper.score()).toEqual(0);
        });
    });

    describe("Game where all rolls are 5", function () {
        it("should score 150", function () {
            for (var i = 0; i < 10; i++) rollFrame.call(this, "00100", "11000", "00011");
            expect(this.scorekeeper.score()).toEqual(150);
        });
    });

    describe("Game with 11 frames", function () {
        it("should stop after 10 frames", function () {
            for (var i = 0; i < 11; i++) rollFrame.call(this, "00100", "11000", "00011");
            expect(this.scorekeeper.score()).toEqual(150);
        });
    });

    describe("Game with one spare", function () {
        it("should score 25 given a spare followed by 5 and then gutter balls", function () {
            rollFrame.call(this, "11000", "00111");
            rollFrame.call(this, "11000", "00000", "00000");
            for (var i = 0; i < 8; i++) rollFrame.call(this, "00000", "00000", "00000");
            expect(this.scorekeeper.score()).toEqual(25);
        });
    });

    describe("Game with one strike", function () {
        it("should score 35 given a spare followed by 5, 5 and then gutter balls", function () {
            rollFrame.call(this, "11111");
            rollFrame.call(this, "11000", "00011", "00000");
            for (var i = 0; i < 8; i++) rollFrame.call(this, "00000", "00000", "00000");
            expect(this.scorekeeper.score()).toEqual(35);
        });
    });

    describe("Perfect game", function () {
        it("should score 450 given twelve strikes", function () {
            for (var i = 0; i < 9; i++) rollFrame.call(this, "11111");
            rollFrame.call(this, "11111", "11111", "11111");
            expect(this.scorekeeper.score()).toEqual(450);
        });
    });

    describe("Game with all scoring variations including tenth frame", function () {
        it("should score 246", function () {
            /* 1*/rollFrame.call(this, "11111");
            /* 2*/rollFrame.call(this, "11111");
            /* 3*/rollFrame.call(this, "00100", "11000", "00001");
            /* 4*/rollFrame.call(this, "11110", "00001");
            /* 5*/rollFrame.call(this, "00110", "11000", "00001");
            /* 6*/rollFrame.call(this, "00110", "11000", "00001");
            /* 7*/rollFrame.call(this, "11111");
            /* 8*/rollFrame.call(this, "00100", "01000", "00001");
            /* 9*/rollFrame.call(this, "11111");
            /*10*/rollFrame.call(this, "11111", "11111", "11110");
            expect(this.scorekeeper.score()).toEqual(246);
        });

        it("should score 192", function () {
            /* 1*/rollFrame.call(this, "11000", "00111");
            /* 2*/rollFrame.call(this, "00100", "11000", "00001");
            /* 3*/rollFrame.call(this, "11111");
            /* 4*/rollFrame.call(this, "00100", "00010", "11000");
            /* 5*/rollFrame.call(this, "00100", "11000", "00010");
            /* 6*/rollFrame.call(this, "11111");
            /* 7*/rollFrame.call(this, "11110", "00000", "00001");
            /* 8*/rollFrame.call(this, "11111");
            /* 9*/rollFrame.call(this, "00100", "11000", "00010");
            /*10*/rollFrame.call(this, "11111", "11000", "00111");
            expect(this.scorekeeper.score()).toEqual(192);
        });
    });
});