var texto='Hola que tal';
var prueba=toRandomCase(texto);

console.log ('The function works', texto.toLowerCase() === prueba.toLowerCase() && texto !== prueba)


var error;
try{
    var count=toRandomCase(56)
}catch(err){
    error=err;
}finally{
    console.log('This should deliver an error', error!== undefined, error)
}
