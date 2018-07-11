'use strict';

describe('reduce', function () {

    it('reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; }, 0) should return 15', function () {
        expect(reduce([1, 2, 3, 4, 5], function (accum, v) { return accum + v; }, 0)).toBe(15);
    });

    it('reduce([1, 2, 3, 4, 5], function(accum, v) { return accum + v; }) should return 15', function () {
        expect(reduce([1, 2, 3, 4, 5], function (accum, v) { return accum + v; })).toBe(15);
    });

    it('reduce() without arguments should throw an error', function () {
        expect(function () {
            reduce();
        }).toThrow(Error('input array is not an array'));
    });


    it('reduce(undefined, function(accum, v) { return accum + v; }) without first argument should throw an error', function () {
        expect(function () {
            reduce(undefined, function(accum, v) { return accum + v; });
        }).toThrow(Error('input array is not an array'));
    });


    it('reduce(input) without second argument should throw an error', function () {
        expect(function () {
            reduce(input);
        }).toThrow(Error('input handler is not a function'));
    });

})