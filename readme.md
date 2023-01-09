<h1 align="center">Perfil del Vino - Sitio web w/ Ecommerce</h1>
   <p align="left">
   <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
   </p>
   
<h2 align="center">Proyecto Final - JavaScript - Coderhouse</h2>
<p align="center"> Creado por Cristian Flores</p>

## Deploy: https://perfildelvino.netlify.app/

Esta aplicacion web fue creada con JavaScript, SASS y Bootstrap.

## Descripcion del proyecto

Sitio web informativo acerca del mundo del vino que incluye un ecommerce de vinos argentinos de autor.

El sitio cuenta con un index donde se encuentra informacion básica para conocer acerca del vino y 2 secciones donde se encontrarán "Variedades de uvas" y "Elaboración del vino"

Además, se encuentra una "Tienda de vinos" que cuenta con una base de datos alojada en LocalStorage que renderiza los productos almacenados para realizar la compra.

### Navbar

La navbar se encuentra a lo largo del sitio, desde el index, hasta la seccion de tienda de vinos.
Esta se encuentra compuesta por una lista con los siguientes Html: Logo Brand / Variedades de uvas / Elaboracion del vino / Tienda de vinos.

#### Logo Brand

Haciendo click en la imagen de Perfil del vino, dirige automaticamente al Index del sitio.

En el index vamos a encontrar un carrousel creado con Bootstrap que muestra algunas imagenes a modo de ambientar al usuario con la informacion que se puede encontrar en el sitio.
El mismo está estructurado con grids para ubicar 2 secciones por debajo de este carrousel.
En las secciones encontramos:

#### "Primeros pasos"

Seccion donde se puede encontrar un resumen acerca de que es el vino.

#### "Entendiendo la etiqueta"

Seccion en la que se encuentra una etiqueta de vino y sus referencias para poder entenderla.

#### Variedaddes de uvas

En el item "Variedades de Uvas" se desplegara un dropdown que permite elegir entre "Tintas" y "Blancas". Al ingresar en alguno de los html, encontraremos una lista con informacion de distintas variedades de uvas con una imagen de la misma. En esta imagen, al hacer un hover, se redimensiona.

#### Elaboracion del vino

Podemos encontrar un dropdown que permitira seleccionar entre "Tinto", "Blanco", "Rosado".
Dentro de este html, vamos a encontrar una grilla que ordena la informacion de los procesos para elaborar el vino junto con unas imagenes que hacen referencia a dicha informacion. Algunas imagenes estan dispuestas en formato carrousel.

#### Tienda de vinos

Este item lleva directamente a un ecommerce de vinos donde tenemos un dropdown que permit ordenar los productos por "tintos", "blancos", "rosados", "precio", "nombre".

### Footer

En el footer se encuentra un Copyright junto a un icono de Instagram que redirecciona directamente en un a nueva pestana al perfil de dicha red social.

## E-commerce

### Productos

El ecommerce esta creado con un local storage, donde se almacenan los productos con los detalles y se renderizan en el html.
Cada producto cuenta con su descripcion y un boton que permite agregar directamente al carrito, desplegando un Sweet Alert que nos comenta cuanto dinero llevamos gastado.

### Carrito

El carrito de compras de la app, se renderiza en una tabla que detalla la imagen del producto, nombre, añada, precio, la opcion de eliminar dicho producto y el monto total a abonar.

El usuario tiene la opcion de borrar un producto especifico o vaciar el carrito completo. Al vaciar el carrito, en un modal se le pregunta al usuario si esta seguro de esta accion. En caso afirmativo, se procede con la funcion que quita los productos y en caso de ser negativo, se mantiene todo como esta.

Al tener los productos cargados y proceder con el pago, se debe cliquear en el boton "Ir a pagar". Si no hay productos cargados, un mensaje nos advertira sobre esto y si los hay, se le pregunta al usuario si esta seguro que quiere proceder con el pago o si quiere seguir eligiendo productos.

### Checkout

Cuando el usuario decide ir a pagar, el sitio lo redirige a un formulario que requiere estar validado si o si para continuar con la compra.

Lo interesante de este formulario, es que tiene 3 selects anidados. Segun la provincia en donde se encuentre el usuario, tendra una opcion de envio del pedido y a su vez, esto sera decisivo para poder seleccionar el tipo de pago.

Al completar todos los campos, deberan confirmarse los datos para poder confirmar el pedido.

Junto al formulario se encuentra un resumen detallado de la compra, indicando: productos, subtotal a abonar y monto total.

### Purchase

Al finalizar el pedido, se renderizara en un html los datos de la compra con el resumen del pedido. Mientras que en el localStorage se vacian los datos y el carrito para que puede efectuarse un nuevo pedido.
Si se actualiza esta pagina, aparecera un mensaje que indicando que "No hay productos agregados al carrito"
