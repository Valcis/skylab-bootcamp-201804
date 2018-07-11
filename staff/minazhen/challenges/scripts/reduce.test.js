"use strict";

var a = [{ name: 'jeans', price: 10.5 }, { name: 't-shirt', price: 5.99 }, 
{ name: 'socks', price: 19.99 }];

test(
    function() {
        return reduce(a, function(acc, a_id) {if (a_id.price > 10) return acc + a_id.price; return acc});
    },
    'reduce(a, function(acc, a_id) {if (a_id.price > 10) return acc + a_id; return acc})'+
    ' should return 30.49',
    function(result) { return result === 30.49;
    }
);

test(
    function() {
        return reduce([1,2,3,4,5], function(acc, a_id) {if (a_id > 2) return acc + a_id; return acc}, 10);
    },
    'reduce([1,2,3,4,5], function(acc, a_id) {if (a_id > 2) return acc + a_id; return acc}, 10);'+
    ' should return 22',
    function(result) { return result === 22;
    }
);

test(
    function() {
        return reduce([1,2,3,4,5], function(acc, a_id) {if (a_id < 3) return acc + a_id; return acc});
    },
    'reduce([1,2,3,4,5], function(acc, a_id) {if (a_id < 3) return acc + a_id; return acc}) should return 3',
    function(result) { return result === 3;
    }
);

test(
    function(){
        return reduce([1,2,3,4,5], function(acc, a_id) {if ((a_id % 2)===1) return acc + a_id; return acc}, 0.1);
    },
    'reduce([1,2,3,4,5], function(acc, a_id) {if ((a_id % 2)===1) return acc + a_id; return acc}, 0.1) should return 9.1',
    function(result) { return result === 9.1;
    }
);

test(
    errorHandling(
        function() {
            return reduce(a, function(acc, a_id) {return acc + a_id});
        }
    ),
    "reduce(a, function(acc, a_id) {return acc + a_id}) should throw error if there is one on handler is invalid",
    function(result) {
            return result.message === "Check your handler, doesn't return a number.";
    }
);

test(
    errorHandling(
        function() {
            return reduce(1, function(acc, a_id) {return acc + a_id.price});
        }
    ),
    "reduce(a, function(acc, a_id) {return acc + a_id}) should throw error if there is one on handler is invalid",
    function(result) {
            return result.message === "Write a valid array on input.";
    }
);

test(
    errorHandling(
        function() {
            return reduce("A", function(acc, a_id) {return acc + a_id.price});
        }
    ),
    "reduce('A', function(acc, a_id) {return acc + a_id.price}) should throw error if there is one on handler is invalid",
    function(result) {
            return result.message === "Write a valid array on input.";
    }
);

test(
    errorHandling(
        function() {
            return reduce(function(acc, a_id) {return acc + a_id.price});
        }
    ),
    "reduce(function(acc, a_id) {return acc + a_id.price}) should throw error if there is one on handler is invalid",
    function(result) {
            return result.message === "Write a valid array on input.";
    }
);

test(
    errorHandling(
        function() {
            return reduce(a, function() {});
        }
    ),
    "reduce(a, function() {}) should throw error if there is one on handler is invalid",
    function(result) {
            return result.message === "Check your handler, doesn't return a number.";
    }
);

test(
    errorHandling(
        function() {
            return reduce(a);
        }
    ),
    "reduce(a) should throw error if there is one on handler is invalid",
    function(result) {
            return result.message === "Input handler is not a function.";
    }
);

test(
    errorHandling(
        function() {
            return reduce(a, "...");
        }
    ),
    "reduce(a, '...') should throw error if there is one on handler is invalid",
    function(result) {
            return result.message === "Input handler is not a function.";
    }
);