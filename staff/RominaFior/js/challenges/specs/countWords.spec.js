'use strict';

describe('countWords', function () {
    it('countWords ("hello world") should return 2', function () {
        expect(countWords('hello world')).toBe(2);
    });
    
    it('countWords(true) should throw an error', function () {
        expect(function () {
            countWords(true);
        }).toThrow(Error('input words is not a string'));
    });

    it('countWords({}) should throw an error', function() {
        expect(function () {
            countWords({});
        }).toThrow(Error('input words is not a string'));
    });

    it('countWords(1) should throw an error', function() {
        expect(function () {
            countWords(1);
        }).toThrow(Error('input words is not a string'));
    });

    it('countWords([]) should throw an error', function() {
        expect(function () {
            countWords([]);
        }).toThrow(Error('input words is not a string'));
    });
});