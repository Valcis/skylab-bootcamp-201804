'use strict';

test(
    function(){
        return ["a","b","c"].wrap("/","/").wrap(".",".").wrap("-", "-");
    },
    '["a","b","c"].wrap(".","/").wrap("/",".").wrap("-", "-"); should return ["-/.a./-","-/.b./-"]',
    function(result){
        return result.toString() === ["-./a/.-","-./b/.-","-./c/.-"].toString();
    }
)
test(
    function(){
        var awrap = [1, 2, 3];
        return awrap.wrap("[", "]").wrap("{", "}").wrap("<", ">");
    },
    'var a = [1, 2, 3]; awrap.wrap("[", "]").wrap("{", "}").wrap("<", ">"); should return ["<{[1]}>", "<{[2]}>", "<{[3]}>"]',
    function(result){
        return result.toString() === ["<{[1]}>", "<{[2]}>", "<{[3]}>"].toString();
    }
)

test(
    errorHandling(
        function() {
            return [].wrap("{","}");
        }
    ),
    '[].wrap("{","}"); should throw error if wrap values are not string.',
    function(result) {
            return result.message === "Array needs to content something.";
    }
)

test(
    errorHandling(
        function() {
            return ["a","b","c"].wrap(1,"/");
        }
    ),
    '["a","b","c"].wrap(1,"/"); should throw error if wrap values are not string.',
    function(result) {
            return result.message === "Wrap input should be two strings.";
    }
)

test(
    errorHandling(
        function() {
            return ["a","b","c"].wrap("/",1);
        }
    ),
    '["a","b","c"].wrap("/",1); should throw error if there are not two wrap values.',
    function(result) {
            return result.message === "Wrap input should be two strings.";
    }
)

test(
    errorHandling(
        function() {
            return ["a","b","c"].wrap({},1);
        }
    ),
    '["a","b","c"].wrap({},1); should throw error if there are not two wrap values.',
    function(result) {
            return result.message === "Wrap input should be two strings.";
    }
)
test(
    errorHandling(
        function() {
            return ["a","b","c"].wrap();
        }
    ),
    '["a","b","c"].wrap(); should throw error if there are not two wrap values.',
    function(result) {
            return result.message === "Wrap input should be two strings.";
    }
)
