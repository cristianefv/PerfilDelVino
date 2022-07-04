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

const listaVinos = [vino1, vino2, vino3, vino4, vino5]


let costoTotal = 0;

const sumar = (producto) => (costoTotal = costoTotal + producto);

function comprar() {
    let continuar = true;
    alert("Bienvenido a la tienda de vinos de 'Perfil del vino'");

    while (continuar) {
        let producto = prompt(`
        Seleccione el id que corresponda al vino que desee.

        Lista de vinos:
        ${listaVinos[0].id}) ${listaVinos[0].etiqueta}, ${listaVinos[0].varietal}, ${listaVinos[0].anada} - $${listaVinos[0].precio} 
        ${listaVinos[1].id}) ${listaVinos[1].etiqueta}, ${listaVinos[1].varietal}, ${listaVinos[1].anada} - $${listaVinos[1].precio} 
        ${listaVinos[2].id}) ${listaVinos[2].etiqueta}, ${listaVinos[2].varietal}, ${listaVinos[2].anada} - $${listaVinos[2].precio} 
        ${listaVinos[3].id}) ${listaVinos[3].etiqueta}, ${listaVinos[3].varietal}, ${listaVinos[3].anada} - $${listaVinos[3].precio} 
        ${listaVinos[4].id}) ${listaVinos[4].etiqueta}, ${listaVinos[4].varietal}, ${listaVinos[4].anada} - $${listaVinos[4].precio}  

        6) Terminar compra

        Total de la compra: $${costoTotal}`);

        switch (producto) {
            case "1":
                sumar(listaVinos[0].precio);
                break;
            case "2":
                sumar(listaVinos[1].precio);
                break;
            case "3":
                sumar(listaVinos[2].precio);
                break;
            case "4":
                sumar(listaVinos[3].precio);
                break;
            case "5":
                sumar(listaVinos[4].precio);
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