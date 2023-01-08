let carrito = JSON.parse(localStorage.getItem('productosAgregadosJSON')) || [];
let total = localStorage.getItem(`total`);
total = parseInt(total);
let renderizarTienda = () => {
  let html = `
        <h1 class="titulo">TIENDA DE VINOS</h1>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">ORDENAR VINOS POR </button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li><a class="dropdown-item" style="cursor:pointer;" id="tipoTodos">Default</a></li>
            <li><a class="dropdown-item" style="cursor:pointer;" id="tipoTinto">Tintos</a></li>
            <li><a class="dropdown-item" style="cursor:pointer;" id="tipoBlanco">Blancos</a></li>
            <li><a class="dropdown-item" style="cursor:pointer;" id="tipoRosado">Rosados</a></li>
            <li><a class="dropdown-item" style="cursor:pointer;" id="menorPrecio">Precio (Menor a Mayor)</a></li>
            <li><a class="dropdown-item" style="cursor:pointer;" id="mayorPrecio">Precio (Mayor a Menor) </a></li>
            <li><a class="dropdown-item" style="cursor:pointer;" id="menorNombre">Nombre ascendente (A > Z) </a></li>
            <li><a class="dropdown-item" style="cursor:pointer;" id="mayorNombre">Nombre descendete (Z > A) </a></li>
          </ul>
        </div>
        <div id="listaVinos" class="vinoteca"></div>
        <div class="contenedorSelecciones">
            <h2 class="seleccionados"><u>VINOS SELECCIONADOS</u></h2>
        </div>
        <div class="carrito">
            <table class="table table-striped ">
                <thead class="contenedorEncabezado">
                  <tr class="encabezados">
                    <th class="encabezado" scope="col">Etiqueta</th>
                    <th class="encabezado" scope="col">Nombre</th>
                    <th class="encabezado" scope="col">Añada</th>
                    <th class="encabezado" scope="col">Precio</th>
                    <th class="encabezado" scope="col">Eliminar</th>
                  </tr>
                </thead>
                <tbody id="carritoLista" class="table-group-divider"></tbody>
                <tr class="costo">
                  <td colspan="3" class="table-active"><b>SUBTOTAL:</b></td>
                  <td id="subTotal"></td>
                </tr>
              </table>
        </div>
        <div class="finalizarCompra">
            <button class="btn btn-danger botonReset" onclick="vaciarCarrito()" type="button"><b>VACIAR CARRITO ♻️</b></button>
            <button class="btn btn-success botonFinalizar" onclick="finalizarCompra();" type="button"><b>IR A PAGAR ✔️</b></button>
        </div>
  `;
  document.getElementById('main_tienda').innerHTML = html;
};
renderizarTienda();
let renderizarCarrito = () => {
  let html = ``;
  for (let i = 0; i < carrito.length; i++) {
    html += `
      <tr class="contenedorElementos">
        <th class="imgContenedor" scope="row"><img src="${carrito[i].imagen}" class="card-img-top rounded-circle" alt="etiqueta_vino"></th>
        <td><p class="propiedades">"${carrito[i].nombre}"</p></td>
        <td><p class="propiedades">${carrito[i].aniada}</p></td>
        <td><p class="propiedades">$${carrito[i].precio}</p></td>
        <td class="propiedades"><a class="btn btn-primary" onclick="removerDelCarrito(${i});"><b>❌</b></a></td>
      </tr>
      `;
  }
  document.getElementById('carritoLista').innerHTML = html;
};
renderizarCarrito();
let saveToLocalStorage = () => {
  let storageJSON = JSON.stringify(carrito);
  localStorage.setItem('productosAgregadosJSON', storageJSON);
  localStorage.setItem(`total`, total);
};
function traerProductosAlHtml() {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      let html = '';
      for (let i = 0; i < vinoteca.length; i++) {
        html += `
          <div class="card">
              <img style="" src="${vinoteca[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
              <div class="card-body">
                  <h5 class="card-title">"${vinoteca[i].nombre}"</h5>
                  <p class="card-text">
                      <b>Bodega:</b> ${vinoteca[i].bodega}<br>
                      <b>Variedad de uva:</b> ${vinoteca[i].cepa}<br>
                      <b>Añada:</b> ${vinoteca[i].aniada}<br>
                      <b>Precio:</b> $${vinoteca[i].precio}
                  </p>
                  <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${vinoteca[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
              </div>
          </div>
        `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}
traerProductosAlHtml();
let agregarAlCarrito = (id) => {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const vinoAgregado = vinoteca.find((item) => item.id == id);
      carrito.push(vinoAgregado);
      renderizarCarrito();
      saveToLocalStorage();
      costoTotal();
    })
    .catch((e) => {
      console.log(e);
    });
};
let removerDelCarrito = (id) => {
  carrito.splice(id, 1);
  renderizarCarrito();
  saveToLocalStorage();
  costoTotal();
};
let costoTotal = () => {
  total = carrito.map((item) => item.precio).reduce((acumulado, suma) => acumulado + suma, 0);
  document.getElementById('subTotal').innerHTML = `<b>$${total}</b>`;
  total > 0
    ? Toastify({ text: `Llevas gastando $${total}`, duration: 3000, gravity: `bottom`, position: `right` }).showToast()
    : Toastify({ text: `CARRITO VACIO`, duration: 3000, gravity: `bottom`, position: `right` }).showToast();
  saveToLocalStorage();
};
let vaciarCarrito = () => {
  carrito.length != 0
    ? Swal.fire({
        title: `ESTAS POR VACIAR EL CARRITO`,
        text: `¿Estas seguro que queres eliminar todos los productos?`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonText: `Si, eliminar todo`,
        cancelButtonText: `No, dejarlo como está`,
      }).then((result) => {
        if (result.isConfirmed) {
          carrito.length = 0;
          total = 0;
          renderizarCarrito();
          saveToLocalStorage();
          renderizarSubTotal();
          Swal.fire({
            title: `CARRITO VACIO`,
            icon: `success`,
            text: `Se eliminaron los productos del carrito`,
          });
        } else {
          Swal.fire({
            title: `SE MANTIENEN TUS PRODUCTOS`,
            icon: `success`,
          });
        }
      })
    : Toastify({ text: `NO AGREGASTE NINGUN PRODUCTO`, duration: 3000, gravity: `bottom`, position: `right` }).showToast();
};
let finalizarCompra = () => {
  carrito.length != 0
    ? Swal.fire({
        title: `ESTAS POR FINALIZAR TU COMPRA`,
        text: `¿Queres elegir algo mas o ir a pagar?`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonText: `Ir a pagar`,
        cancelButtonText: `Seguir eligiendo`,
      }).then((result) => {
        if (result.isConfirmed) {
          let timerInterval;
          Swal.fire({
            title: 'Completa tus datos para finalizar la compra',
            html: 'Redirigiendo en <strong></strong> segundos.<br/><br/>',
            icon: 'info',
            timer: 3000,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                Swal.getHtmlContainer().querySelector('strong').textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          });
          setTimeout(() => {
            saveToLocalStorage();
            renderizarSubTotal();
            window.location.href = '../pages/checkout.html';
          }, 3000);
        } else {
          Swal.fire({
            title: `MIRA TRANQUILO NUESTRO CATALOGO`,
            icon: `success`,
          });
        }
      })
    : Toastify({ text: `NO AGREGASTE NINGUN PRODUCTO`, duration: 3000, gravity: `bottom`, position: `right` }).showToast();
};
let renderizarSubTotal = () => {
  let html = `<b>$${total}</b>`;
  document.getElementById('subTotal').innerHTML = html;
};
renderizarSubTotal();
function traerTintosAlHtml() {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const mostrarTintos = vinoteca.filter((vino) => vino.tipo === `tinto`);
      let html = '';
      for (let i = 0; i < mostrarTintos.length; i++) {
        html += `
          <div class="card">
              <img style="" src="${mostrarTintos[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
              <div class="card-body">
                  <h5 class="card-title">"${mostrarTintos[i].nombre}"</h5>
                  <p class="card-text">
                      <b>Bodega:</b> ${mostrarTintos[i].bodega}<br>
                      <b>Variedad de uva:</b> ${mostrarTintos[i].cepa}<br>
                      <b>Añada:</b> ${mostrarTintos[i].aniada}<br>
                      <b>Precio:</b> $${mostrarTintos[i].precio}
                  </p>
                  <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${mostrarTintos[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
              </div>
          </div>
        `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}
function traerBlancosAlHtml() {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const mostrarBlancos = vinoteca.filter((vino) => vino.tipo === `blanco`);
      let html = '';
      for (let i = 0; i < mostrarBlancos.length; i++) {
        html += `
          <div class="card">
              <img style="" src="${mostrarBlancos[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
              <div class="card-body">
                  <h5 class="card-title">"${mostrarBlancos[i].nombre}"</h5>
                  <p class="card-text">
                      <b>Bodega:</b> ${mostrarBlancos[i].bodega}<br>
                      <b>Variedad de uva:</b> ${mostrarBlancos[i].cepa}<br>
                      <b>Añada:</b> ${mostrarBlancos[i].aniada}<br>
                      <b>Precio:</b> $${mostrarBlancos[i].precio}
                  </p>
                  <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${mostrarBlancos[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
              </div>
          </div>
        `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}
function traerRosadosAlHtml() {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const mostrarRosados = vinoteca.filter((vino) => vino.tipo === `rosado`);
      let html = '';
      for (let i = 0; i < mostrarRosados.length; i++) {
        html += `
          <div class="card">
              <img style="" src="${mostrarRosados[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
              <div class="card-body">
                  <h5 class="card-title">"${mostrarRosados[i].nombre}"</h5>
                  <p class="card-text">
                      <b>Bodega:</b> ${mostrarRosados[i].bodega}<br>
                      <b>Variedad de uva:</b> ${mostrarRosados[i].cepa}<br>
                      <b>Añada:</b> ${mostrarRosados[i].aniada}<br>
                      <b>Precio:</b> $${mostrarRosados[i].precio}
                  </p>
                  <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${mostrarRosados[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
              </div>
          </div>
        `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}

let tipoTinto = document.getElementById('tipoTinto');
tipoTinto.onclick = () => {
  traerTintosAlHtml();
};
let tipoBlanco = document.getElementById('tipoBlanco');
tipoBlanco.onclick = () => {
  traerBlancosAlHtml();
};
let tipoRosado = document.getElementById('tipoRosado');
tipoRosado.onclick = () => {
  traerRosadosAlHtml();
};
let tipoTodos = document.getElementById('tipoTodos');
tipoTodos.onclick = () => {
  traerProductosAlHtml();
};
let ordenarMayorPrecio = () => {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const precioDescendente = vinoteca.sort((a, b) => {
        if (a.precio > b.precio) {
          return -1;
        }
        if (a.precio < b.precio) {
          return 1;
        }
        return 0;
      });
      let html = '';
      for (let i = 0; i < precioDescendente.length; i++) {
        html += `
        <div class="card">
            <img style="" src="${precioDescendente[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
            <div class="card-body">
                <h5 class="card-title">"${precioDescendente[i].nombre}"</h5>
                <p class="card-text">
                    <b>Bodega:</b> ${precioDescendente[i].bodega}<br>
                    <b>Variedad de uva:</b> ${precioDescendente[i].cepa}<br>
                    <b>Añada:</b> ${precioDescendente[i].aniada}<br>
                    <b>Precio:</b> $${precioDescendente[i].precio}
                </p>
                <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${precioDescendente[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
            </div>
        </div>
      `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
};
let mayorPrecio = document.getElementById('mayorPrecio');
mayorPrecio.onclick = () => {
  ordenarMayorPrecio();
};
let ordenarMenorPrecio = () => {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const precioAscendente = vinoteca.sort((a, b) => {
        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        return 0;
      });
      let html = '';
      for (let i = 0; i < precioAscendente.length; i++) {
        html += `
        <div class="card">
            <img style="" src="${precioAscendente[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
            <div class="card-body">
                <h5 class="card-title">"${precioAscendente[i].nombre}"</h5>
                <p class="card-text">
                    <b>Bodega:</b> ${precioAscendente[i].bodega}<br>
                    <b>Variedad de uva:</b> ${precioAscendente[i].cepa}<br>
                    <b>Añada:</b> ${precioAscendente[i].aniada}<br>
                    <b>Precio:</b> $${precioAscendente[i].precio}
                </p>
                <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${precioAscendente[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
            </div>
        </div>
      `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
};
let menorPrecio = document.getElementById('menorPrecio');
menorPrecio.onclick = () => {
  ordenarMenorPrecio();
};
let ordenarNombreAtoZ = () => {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const aToZ = vinoteca.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
      let html = '';
      for (let i = 0; i < aToZ.length; i++) {
        html += `
        <div class="card">
            <img style="" src="${aToZ[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
            <div class="card-body">
                <h5 class="card-title">"${aToZ[i].nombre}"</h5>
                <p class="card-text">
                    <b>Bodega:</b> ${aToZ[i].bodega}<br>
                    <b>Variedad de uva:</b> ${aToZ[i].cepa}<br>
                    <b>Añada:</b> ${aToZ[i].aniada}<br>
                    <b>Precio:</b> $${aToZ[i].precio}
                </p>
                <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${aToZ[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
            </div>
        </div>
      `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
};
let nombreAtoZ = document.getElementById('menorNombre');
nombreAtoZ.onclick = () => {
  ordenarNombreAtoZ();
};
let ordenarNombreZtoA = () => {
  fetch('../json/vinos.json')
    .then((res) => res.json())
    .then((vinoteca) => {
      const zToA = vinoteca.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return -1;
        }
        if (a.nombre < b.nombre) {
          return 1;
        }
        return 0;
      });
      let html = '';
      for (let i = 0; i < zToA.length; i++) {
        html += `
        <div class="card">
            <img style="" src="${zToA[i].imagen}" class="card-img-top" alt="etiqueta_vinoEnVenta">
            <div class="card-body">
                <h5 class="card-title">"${zToA[i].nombre}"</h5>
                <p class="card-text">
                    <b>Bodega:</b> ${zToA[i].bodega}<br>
                    <b>Variedad de uva:</b> ${zToA[i].cepa}<br>
                    <b>Añada:</b> ${zToA[i].aniada}<br>
                    <b>Precio:</b> $${zToA[i].precio}
                </p>
                <a class="btn btn-primary" id="addToCart" onclick="agregarAlCarrito(${zToA[i].id});"><b>AGREGAR AL CARRITO 🛒</b></a>
            </div>
        </div>
      `;
      }
      document.getElementById('listaVinos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
};
let nombreZtoA = document.getElementById('mayorNombre');
nombreZtoA.onclick = () => {
  ordenarNombreZtoA();
};