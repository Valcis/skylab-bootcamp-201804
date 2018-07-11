"use strict";

describe("foreach", function (){

    it ("should fulfill output with input values", function(){
        var input = [1, 2, 3];
        var output = [];
        
        forEach(input, function(v){output.push(v)});
        expect(input).toEqual(output);
    });

    it ("should fulfill output with input values (checking spy calls)", function(){
        var input = [1, 2, 3];
        var output = [];

        spyOn(output, "push");

        forEach(input, function(v){output.push(v)});

        expect(output.push).toHaveBeenCalled();
        expect(output.push.calls.count()).toEqual(3);
    });



});