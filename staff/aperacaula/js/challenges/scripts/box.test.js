'use strict';

test(
    function(){
        box.keep('123','test');
        return box.retrieve('123');
    }, 'box.keep () should save "test" as my secret properly',
    function(obtained_in_try){
        return obtained_in_try==='test';
    }
)


test(
    runWithErrorCapturing(function(){
        return box.retrieve('456');
    }), 'box.retrieve () should throw an error',
    function(obtained_in_try){
        return obtained_in_try.message==='Invalid password';
    }
)