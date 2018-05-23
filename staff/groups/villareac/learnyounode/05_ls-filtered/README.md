5h
 # Aprendiendo NODE.JS!

 ## LS FILTRADO (Ejercicio 5 de 13)

  Crea un programa que dado un directorio imprima una lista de archivos
  filtrados por la extensión. El primer argumento será la ruta al directorio
  (ej: '/path/dir/') y el segundo la extensión a filtrar, por ejemplo si
  recibes 'txt' deberás filtrar todos los archivos que terminen en .txt.

  Nota: el segundo argumento no incluye el punto '.'.

  La lista de archivos a imprimir en consola debe hacerse un archivo por
  línea y debes utilizar Async I/O.

 ─────────────────────────────────────────────────────────────────────────────

 ## PISTAS

  La función fs.readdir() recibe como parámetros: una ruta(path) y un
  callback. La firma del callback es:

     function callback (error, lista) { /* ... */ }

  La lista es un arreglo de nombres de archivos de tipo String.

  La documentación del módulo fs puede verse en:
  file:///usr/local/lib/node_modules/learnyounode/node_apidoc/fs.html

  Además, el módulo path puede resultar útil, especialmente la función
  extname.

  La documentación del módulo path puede verse en:
  file:///usr/local/lib/node_modules/learnyounode/node_apidoc/path.html

 ─────────────────────────────────────────────────────────────────────────────

   » Para ver estas instrucciones de nuevo, ejecute: learnyounode print
   » Para ejecutar su programa en un entorno de pruebas, ejecute:
     learnyounode run program.js
   » Para verificar su programa, ejecute: learnyounode verify program.js
   » Para más información, ejecute: learnyounode help