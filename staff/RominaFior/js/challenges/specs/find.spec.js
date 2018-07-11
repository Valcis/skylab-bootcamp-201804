'use strict';

describe('find', function () {
    it("find(['john', 'mary', 'jack'], function(v) { return v.indexOf('a') > -1; }) should return 'mary'", function () {
        expect(find(['john', 'mary', 'jack'], function(v) { return v.indexOf('a') > -1; })).toBe('mary');
    });

    it("find(['john', 'mary', 'jack'], function(v) { return v.indexOf('w') > -1; }) should return undefined", function () {
        expect(['john', 'mary', 'jack'], function(v) { return v.indexOf('w') > -1; }).toBe(undefined);
    });
    
    it('find() should throw error', function () {
        expect(function () {
            find();
        }).toThrow(Error('input array is not valid'));
    });

    it( 'find([]) should throw error', function() {
        expect(function () {
            find([]);
        }).toThrow(Error('input condition is not valid'));
    });
});