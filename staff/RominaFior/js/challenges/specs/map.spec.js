'use strict';

var input = [1,2,3];

describe('map', function() {
    it('map([1,2,3], function(v){ return v**2; }) should return a new array with values [1,4,9]', function(){
        expect(map([1,2,3], function(v){ return v**2; })).toBe(input !== result && result.toString()==='1,4,6');
    });

    it('map() without arguments should throw an error', function(){
        expect(function(){
            map();
        }).toThrow(Error('input array is not valid'));
    });

    it('map([]) without first argument should throw an error', function(){
        expect(function(){
            map([]);
        }).toThrow(Error('input handler is not valid'))
    });
})