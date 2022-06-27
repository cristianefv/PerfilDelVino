class Vinos {
    constructor (id, etiqueta, varietal, anada, precio){
        this.id = id;
        this.etiqueta = etiqueta;
        this.varietal = varietal;
        this.anada = anada;
        this.precio = precio;
    }
}

const vino1 = new Vinos("1", "Es Vino", "Semillon", "2017", 680);
const vino2 = new Vinos("2", "Don David", "Malbec", "2021", 1080);
const vino3 = new Vinos("3", "El Relator", "Sauvignon Blanc", "2020", 1800);
const vino4 = new Vinos("4", "Ben Marco", "Cabernet Franc", "2017", 2120);
const vino5 = new Vinos("5", "A Lisa", "Malbec", "2021", 2890);

let costoTotal = 0;

const sumar = (producto) => (costoTotal = costoTotal + producto);

function comprar() {
    let continuar = true;
    alert("Bienvenido a la tienda de vinos de 'Perfil del vino'");


while (continuar) {
    let producto = prompt(`
    Seleccione el id que corresponda al vino que desee.

    Lista de vinos:
    ${vino1.id}) ${vino1.etiqueta}, ${vino1.varietal}, ${vino1.anada} - $${vino1.precio} 
    ${vino2.id}) ${vino2.etiqueta}, ${vino2.varietal}, ${vino2.anada} - $${vino2.precio} 
    ${vino3.id}) ${vino3.etiqueta}, ${vino3.varietal}, ${vino3.anada} - $${vino3.precio} 
    ${vino4.id}) ${vino4.etiqueta}, ${vino4.varietal}, ${vino4.anada} - $${vino4.precio} 
    ${vino5.id}) ${vino5.etiqueta}, ${vino5.varietal}, ${vino5.anada} - $${vino5.precio}  
    
    6) Terminar compra
    
    Total de la compra: $${costoTotal}`);


switch (producto) {
    case "1":
        sumar(vino1.precio);
        break;
    case "2":
        sumar(vino2.precio);
        break;
    case "3":
        sumar(vino3.precio);
        break;
    case "4":
        sumar(vino4.precio);
        break;
    case "5":
        sumar(vino5.precio);
        break;
    case "6":
        continuar = false;
        break;
    default:
        alert("El id ingresado no corresponde a alguno de los productos");
        break;
    }


if (producto !=6) continuar = confirm("Desea seguir comprando?");
}

alert(`El monto total a abonar es: $${costoTotal}`);
alert(`Muchas gracias por tu compra!`)

}

comprar();