'use strict';

describe('forEach', function () {

    it('should fulfill output with input values', function () {
        var input = [1, 2, 3];
        var output = [];

        forEach(input, function (v) { output.push(v) });

        expect(input).toEqual(output);
    });


    it('should fulfill output with input values', function () {
        var input = [1, 2, 3];
        var output = [];

        spyOn(output, 'push').and.callThrough();

        forEach(input, function (v) { output.push(v) });
        expect(output.push).toHaveBeenCalled();
        expect(output.push.calls.count()).toEqual(3);

        // expect(input).toEqual(output); // WARN! fails! why? because spy alters the original push method, 
        //and then the toEqual comparator detects that input.push, which in fact is Array.prototype.push, 
        //does not much output.push (altered by the spy);
        expect(input.toString()).toEqual(output.toString());
    });


    it('should fulfill output with input values', function () {
        var input = [1, 2, 3];

        spyOn(console, 'log').and.callThrough();

        forEach(input, function (v) { console.log(v) });

        expect(console.log).toHaveBeenCalled();
        expect(console.log.calls.count()).toEqual(3);
    });

    it('should throw error when no arguments', function () {
        expect(function () {
            forEach();
        }).toThrow(Error('input array is not an array'));
    });

    it('should throw error when no first argument, but second', function () {
        expect(function () {
            forEach(undefined, function () { });
        }).toThrow(Error('input array is not an array'));
    });

    it('should throw error when no second argument', function () {
        expect(function () {
            forEach([]);
        }).toThrow(Error('input handler is not a function'));
    });
});