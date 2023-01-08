carrito = JSON.parse(localStorage.getItem('productosAgregadosJSON')) || [];
total = localStorage.getItem(`total`);
total = parseInt(total);
userName = localStorage.getItem(`userName`);
userSurname = localStorage.getItem(`userSurname`);
userEmail = localStorage.getItem(`userEmail`);
userState = localStorage.getItem(`userState`);
userAdress = localStorage.getItem(`userAdress`);
userPostalCode = localStorage.getItem(`userPostalCode`);
userPhone = localStorage.getItem(`userPhone`);
shippingMethod = localStorage.getItem(`shippingMethod`);
paymentMethod = localStorage.getItem(`paymentMethod`);
addInformation = localStorage.getItem(`addInformation`);
let verRecibo = () => {
  let renderRecibo;
  if (carrito.length != 0) {
    renderRecibo = `
       <h1 class="titulo">MUCHAS GRACIAS POR ELEGIRNOS</h1>
       <p class="instruccion"><b><i>A continuacion, detallamos la informacion de su pedido.</b></i></p>
       <button class="download" onclick="print();">Descargar recibo</button>
       <ul id="detailList">
        <li id="nombreApellidoUsuario"></li>
        <li id="numeroContacto"></li>
        <li id="domicilio"></li>
        <li id="verProvincia"></li>
        <li id="fechaPedido"></li>
        <li id="comments"></li>
       </ul>
       <div class="pedidoDetallado">
       <table class="recibo table table-bordered border-dark border-opacity-50">
         <thead class="border border-dark border-3 border-opacity-50">
           <tr>
             <th class="encabezadoRecibo" scope="col">Imagen</th>
             <th class="encabezadoRecibo" scope="col">Nombre</th>
             <th class="encabezadoRecibo" scope="col">Precio</th>
           </tr>
         </thead>
         <tbody id="detalleRecibo"></tbody>
       </table>
       <section class="detallesRecibo">
         <div class="otrosDetalles">
          <p id="formaPago"></p>
          <p id="formaEnvio"></p>
          <p><b>Estado:</b> Pedido Recibido</p>
         </div>
         <div class="detalleSubtotal">
           <table class="table table-bordered border-dark border-opacity-50">
               <thead>
                 <tr>
                   <th scope="col"><b>Subtotal</b></th>
                   <td scope="col" id="subtotalRecibo"></td>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td scope="row" id="envioRecibo">TIPO DE ENVIO</td>
                   <td id="precioEnvio"></td>
                 </tr>
                 <tr>
                   <th scope="row"><b>Total</b></th>
                   <td id="totalRecibo"></td>
                 </tr>
               </tbody>
             </table>
         </div>
         </div>
       </section>
       `;
    document.getElementById('renderRecibo').innerHTML = renderRecibo;
    document.getElementById('nombreApellidoUsuario').innerHTML = `<b>Nombre y Apellido:</b> ${userName}, ${userSurname}`;
    document.getElementById('numeroContacto').innerHTML = `<b>Número de contacto:</b> ${userPhone}`;
    document.getElementById('domicilio').innerHTML = `<b>Domicilio (C.P.):</b> ${userAdress} (${userPostalCode})`;
    document.getElementById('verProvincia').innerHTML = `<b>Provincia:</b> ${userState}`;
    document.getElementById('formaEnvio').innerHTML = `<b>Método de envío:</b> ${shippingMethod}`;
    document.getElementById('formaPago').innerHTML = `<b>Forma de pago:</b> ${paymentMethod}`;
    if (addInformation !== ``) {
      document.getElementById('comments').innerHTML = `<b>Informacion extra:</b> ${addInformation}`;
    } else {
      let html = ``;
      document.getElementById('comments').innerHTML = html;
    }
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let fechaPedido = `${day} / ${month} / ${year}`;
    document.getElementById('fechaPedido').innerHTML = `<b>Fecha del pedido:</b> ${fechaPedido}`;
    let subTotal = total;
    let htmlSubtotal = `$${subTotal}`;
    document.getElementById('subtotalRecibo').innerHTML = htmlSubtotal;
    if (shippingMethod == 'Envío por Correo - TODO EL PAIS - ($700)') {
      total = localStorage.getItem(`total`);
      total = parseInt(total);
      document.getElementById('envioRecibo').innerHTML = `${shippingMethod.slice(0, 31)}`;
      document.getElementById('precioEnvio').innerHTML = `$700`;
      document.getElementById('totalRecibo').innerHTML = `<b>$${total + 700}</b>`;
    } else if (shippingMethod == 'Reparto propio - CAPITAL FEDERAL - ($500)') {
      total = localStorage.getItem(`total`);
      total = parseInt(total);
      document.getElementById('envioRecibo').innerHTML = `${shippingMethod.slice(0, 32)}`;
      document.getElementById('precioEnvio').innerHTML = `$500`;
      document.getElementById('totalRecibo').innerHTML = `<b>$${total + 500}</b>`;
    } else {
      document.getElementById('envioRecibo').innerHTML = `${shippingMethod.slice(0, 35)}`;
      document.getElementById('precioEnvio').innerHTML = `SIN CARGO`;
      document.getElementById('totalRecibo').innerHTML = `<b>$${total}</b>`;
    }
    let html = ``;
    for (let i = 0; i < carrito.length; i++) {
      html += `
           <tr>
             <td><img src="${carrito[i].imagen}" class="img rounded-circle" alt="etiqueta_vino"></td>
             <td><i>${carrito[i].nombre}, ${carrito[i].cepa}, ${carrito[i].aniada}</i></td>
             <td>$${carrito[i].precio}</td>
           </tr>
           `;
    }
    document.getElementById('detalleRecibo').innerHTML = html;
  } else {
    renderRecibo = `<h1 class="tituloAlternativo">NO TENES PRODUCTOS EN EL CARRITO</h1>`;
    document.getElementById('renderRecibo').innerHTML = renderRecibo;
  }
  setTimeout(() => {
    carrito.length = 0;
    total = 0;
    userName = ``;
    userSurname = ``;
    userEmail = ``;
    userState = ``;
    userAdress = ``;
    userPostalCode = ``;
    userPhone = ``;
    shippingMethod = ``;
    paymentMethod = ``;
    addInformation = ``;
    let storageJSON = JSON.stringify(carrito);
    localStorage.setItem('productosAgregadosJSON', storageJSON);
    localStorage.setItem(`total`, total);
    localStorage.setItem(`userName`, userName);
    localStorage.setItem(`userSurname`, userSurname);
    localStorage.setItem(`userEmail`, userEmail);
    localStorage.setItem(`userState`, userState);
    localStorage.setItem(`userAdress`, userAdress);
    localStorage.setItem(`userPostalCode`, userPostalCode);
    localStorage.setItem(`userPhone`, userPhone);
    localStorage.setItem(`shippingMethod`, shippingMethod);
    localStorage.setItem(`paymentMethod`, paymentMethod);
    localStorage.setItem(`addInformation`, addInformation);
  });
};
verRecibo();
let print = () => {
  window.print();
};
