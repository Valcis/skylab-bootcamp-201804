'use strict';

describe("Array.wrap", function() {
    it('["a","b","c"].wrap("/","/").wrap(".",".").wrap("-", "-"); return ["-./a/.-","-./b/.-","-./c/.-"]', function() {
        expect(["a","b","c"].wrap("/","/").wrap(".",".").wrap("-", "-")).toEqual(["-./a/.-","-./b/.-","-./c/.-"]);
    });

    var awrap = [1, 2, 3];
    it('awrap.wrap("[", "]").wrap("{", "}").wrap("<", ">"); return ["<{[1]}>", "<{[2]}>", "<{[3]}>"]', function() {
        expect(awrap.wrap("[", "]").wrap("{", "}").wrap("<", ">")).toEqual(["<{[1]}>", "<{[2]}>", "<{[3]}>"]);
    });

    it('should [].wrap("{","}") throw an error', function(){
        expect(function() {
            [].wrap("{","}");
        }).toThrow(Error("Array needs to content something."));
    });

    it('should ["a","b","c"].wrap(1,"/") throw an error', function(){
        expect(function() {
            ["a","b","c"].wrap(1,"/");
        }).toThrow(Error("Wrap input should be two strings."));
    });

    it('should ["a","b","c"].wrap("/",1) throw an error', function(){
        expect(function() {
            ["a","b","c"].wrap("/",1);
        }).toThrow(Error("Wrap input should be two strings."));
    });

    it('should ["a","b","c"].wrap({},1) throw an error', function(){
        expect(function() {
            ["a","b","c"].wrap({},1);
        }).toThrow(Error("Wrap input should be two strings."));
    });

    it('should ["a","b","c"].wrap() throw an error', function(){
        expect(function() {
            ["a","b","c"].wrap();
        }).toThrow(Error("Wrap input should be two strings."));
    });
});