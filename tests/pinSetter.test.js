describe("Pinsetter tests", function() {
    'use strict';

    beforeEach(function() {
        this.pinsetter = new Pinsetter();
    });

    describe("New pinsetter", function() {
        it("should start with 5 pins", function() {
            expect(this.pinsetter.getPins().length).toEqual(5);
        });

        it("should have a pinmask of 0", function() {
            expect(this.pinsetter.getRackMask()).toEqual(0);
        });
    });

    describe("Strike thrown", function() {
        it("should have a pinmask of 31", function() {
            this.pinsetter.knockDown(31);
            expect(this.pinsetter.getRackMask()).toEqual(31);
        });
        it("should have a score of 15", function() {
            this.pinsetter.knockDown(31);
            expect(this.pinsetter.getRackValue()).toEqual(15);
        });
    });

    describe("Left five thrown", function() {
        it("should have a pinmask of 3", function() {
            this.pinsetter.knockDown(3);
            expect(this.pinsetter.getRackMask()).toEqual(3);
        });
        it("should have a score of 5", function() {
            this.pinsetter.knockDown(3);
            expect(this.pinsetter.getRackValue()).toEqual(5);
        });
    });

    describe("Two shots thrown", function () {
        it("should return last shot mask of 24", function () {
            this.pinsetter.knockDown(3);
            this.pinsetter.knockDown(24);
            expect(this.pinsetter.getShotMask()).toEqual(24);
        });
        it("should return last shot value of 5", function () {
            this.pinsetter.knockDown(3);
            this.pinsetter.knockDown(24);
            expect(this.pinsetter.getShotValue()).toEqual(5);
        });
    });

    describe("Gutter thrown ball two", function () {
        it("should return last shot mask of 0", function () {
            this.pinsetter.knockDown(3);
            expect(this.pinsetter.getRackMask()).toEqual(3);
            this.pinsetter.knockDown(3); //same pins as before
            expect(this.pinsetter.getShotMask()).toEqual(0);
        });
        it("should return last shot value of 0", function () {
            this.pinsetter.knockDown(3);
            expect(this.pinsetter.getShotValue()).toEqual(5);
            this.pinsetter.knockDown(3); //same pins as before
            expect(this.pinsetter.getShotValue()).toEqual(0);
        });
    });
});