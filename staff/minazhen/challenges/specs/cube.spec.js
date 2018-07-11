'use strict';

describe("cube", function() {
    it("should cube(3) return 9", function() {
        expect(cube(3)).toBe(27);
    });

    it("should cube([1, 2, 3]) return [1, 8, 27]", function() {
        expect(cube([1, 2, 3])).toEqual([1, 8, 27]);
    });

    it("should cube(true) throw an error", function(){
        expect(function() {
            cube(true);
        }).toThrow(Error(true + " is not a valid value."));
    });

    it("should cube(cube({})) throw an error", function(){
        expect(function() {
            cube(cube({}));
        }).toThrow(Error({}.toString()+ " is not a valid value."));
    });

    it("should cube(cube([1, 2, 'a']) throw an error", function(){
        expect(function() {
            cube(cube([1, 2, "a"]));
        }).toThrow(Error("Array can only include numbers, check index 2"));
    });
});



