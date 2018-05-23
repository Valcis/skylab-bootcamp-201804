5h
 # Aprendiendo NODE.JS!

 ## PASOS DE BEBE (Ejercicio 2 de 13)

  Escribe un programa que reciba uno o más números como argumentos de la
  consola e imprima la suma de dichos números a consola(stdout).

 ─────────────────────────────────────────────────────────────────────────────

 ## PISTAS

  Puedes acceder a los argumentos de la línea de comandos usando el objeto
  global process, el cual tiene una propiedad argv que es un array con toda
  la información del comando. Ej: process.argv.

  Para comenzar puedes escribir un programa que contenga:

     console.log(process.argv)

  Luego, para ejecutarlo desde la consola usa node program.js y algunos
  números como arguments. Ej.:

     $ node program.js 1 2 3

  La salida estándar a consola será algo parecido a:

     [ 'node', '/path/to/your/program.js', '1', '2', '3' ]

  Para resolver este ejercicio debes iterar en la lista de argumentos de
  modo que sólo escribas la suma. El primer elemento de la lista siempre es
  'node', el segundo es la ruta al program.js; por ende, debes comenzar a
  iterar en el tercer elemento (índice 2 de la lista) sumando cada elemento
  sucesivo hasta el final.

  Ten en cuenta que todos los elementos de process.argv son cadenas de
  caracteres ('strings') por lo que debes convertirlas a números, por
  ejemplo: agregando el prefijo + o llamando a Number(). Ej:
  +process.argv[2] ó Number(process.argv[2]).

  Cuando ejecutes learnyounode verify program.js no tienes que pasarle
  argumentos pues learnyounode se encarga de hacerlo. Para probar tu
  programa sin verificarlo puedes ejecutar learnyounode run program.js, éste
  ejecutará en el mismo ambiente de prueba que learnyounode crea para cada
  ejercicio.

 ─────────────────────────────────────────────────────────────────────────────

   » Para ver estas instrucciones de nuevo, ejecute: learnyounode print
   » Para ejecutar su programa en un entorno de pruebas, ejecute:
     learnyounode run program.js
   » Para verificar su programa, ejecute: learnyounode verify program.js
   » Para más información, ejecute: learnyounode help