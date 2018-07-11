"use strict";

test(
    function() {
        return find(["john", "mary", "jack"], function(v) { return v.indexOf("a")>-1; });
    },
    'find(["john", "mary", "jack"], function(v) { v.indexOf("a")>-1; }) should return mary',
    function(result) { return result === "mary";
    }
);

test(
    function() {
        return find(["john", "mary", "jack"], function(v) { return v.indexOf("w")>-1; });
    },
    'find(["john", "mary", "jack"], function(v) { v.indexOf("a")>-1; }) should return undefined',
    function(result) { return result === undefined;
    }
);

test(
    errorHandling(
        function() {
            return find();
        }
    ),
    "find should throw error",
    function(result) {
            return result.message === "Input array not valid";
    }
)

test(
    errorHandling(
        function() {
            return find([]);
        }
    ),
    "find should throw error",
    function(result) {
            return result.message === "Input handler not valid";
    }
)