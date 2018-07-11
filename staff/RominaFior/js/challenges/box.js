


var box;
/* var box= {
    keep:function (password, secret) {};
    retrieve:
    updatePassword:
}
 */
(function() {
	box = function(text) { return secret(text); }

	function secret(text) { return text}
})();

box("este es el secreto")



function box(pass) {
    return{
        retrieve: function (password) {
            return secret
        }
    }
}
function box(password){
    return{
        updatePassword: function (password) {
            return password
        }
    }
}