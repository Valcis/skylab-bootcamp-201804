'use strict';

describe("countChars", function() {
    it("should countChars('Hello World') return 11", function() {
        expect(countChars("Hello World")).toBe(11);
    });

    it("should countChars('123145167', function(n) {return n=== '1';}) return 3", function() {
        expect(countChars("123145167", function(n) {return n=== "1";})).toBe(3);
    });

    it("should countChars(true) throw an error", function(){
        expect(function() {
            countChars(true);
        }).toThrow(Error("Input str is not a string"));
    });

    it("should countChars(123145167) throw an error", function(){
        expect(function() {
            countChars(123145167);
        }).toThrow(Error("Input str is not a string"));
    });

    it("should countChars([]) throw an error", function(){
        expect(function() {
            countChars([]);
        }).toThrow(Error("Input str is not a string"));
    });

    it("should countChars('Hello World', '...') throw an error", function(){
        expect(function() {
            countChars("Hello World", "...");
        }).toThrow(Error("Input handler is not a function"));
    });
});