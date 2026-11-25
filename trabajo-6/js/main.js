// 1. Definición de la clase Producto (5 propiedades)
class Producto {
    constructor(id, nombre, precio, categoria, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    sumarIva() {
        return this.precio * 1.21;
    }

    vender(cantidad) {
        if (cantidad <= this.stock) {
            this.stock -= cantidad;
            return true;
        }
        return false;
    }
}

// 2. Base de datos: Array de objetos instanciados
const catalogo = [
    new Producto(1, "Zapatillas Urbanas", 50000, "Calzado", 10),
    new Producto(2, "Remera Oversize", 20000, "Indumentaria", 25),
    new Producto(3, "Buzo Hoodie", 35000, "Indumentaria", 8),
    new Producto(4, "Gorra Trucker", 12000, "Accesorios", 15),
    new Producto(5, "Medias Deportivas", 5000, "Accesorios", 30)
];

console.log("--- Catálogo Inicial ---");
console.table(catalogo);

// Array para acumular las compras del usuario (Carrito)
const carrito = [];

// 3. Funciones con Métodos de Orden Superior

// A. FOS filter: Filtrar productos por categoría elegida
function filtrarPorCategoria() {
    const categoriaIngresada = prompt("Ingresá la categoría a buscar (Calzado / Indumentaria / Accesorios):");
    
    if (!categoriaIngresada) return;

    const productosFiltrados = catalogo.filter(
        (p) => p.categoria.toLowerCase() === categoriaIngresada.trim().toLowerCase()
    );

    if (productosFiltrados.length > 0) {
        let mensaje = `Productos encontrados en '${categoriaIngresada}':\n`;
        productosFiltrados.forEach((p) => {
            mensaje += `- [ID: ${p.id}] ${p.nombre} | $${p.precio} (Stock: ${p.stock})\n`;
        });
        alert(mensaje);
        console.log(`Filtro por categoría (${categoriaIngresada}):`, productosFiltrados);
    } else {
        alert("No se encontraron productos en esa categoría.");
    }
}

// B. FOS find: Buscar un producto por ID y agregarlo al carrito
function comprarProductoPorId() {
    const idBuscado = parseInt(prompt("Ingresá el ID del producto que querés comprar:"), 10);

    const productoEncontrado = catalogo.find((p) => p.id === idBuscado);

    if (productoEncontrado) {
        if (productoEncontrado.vender(1)) {
            carrito.push(productoEncontrado);
            alert(`¡Genial! Sumaste ${productoEncontrado.nombre} al carrito.`);
            console.log(`Producto comprado (find):`, productoEncontrado);
        } else {
            alert(`Lo sentimos, no hay stock disponible de ${productoEncontrado.nombre}.`);
        }
    } else {
        alert("No existe ningún producto con ese ID.");
    }
}

// C. FOS reduce: Calcular el subtotal y total con IVA del carrito
function calcularTotalCarrito() {
    const totalSinIva = carrito.reduce((acumulador, item) => acumulador + item.precio, 0);
    const totalConIva = carrito.reduce((acumulador, item) => acumulador + item.sumarIva(), 0);

    return { totalSinIva, totalConIva };
}

// 4. Interacción con el usuario (Menú principal)
let continuar = true;

while (continuar) {
    const opcion = prompt(
        "--- TIENDA ONLINE ---\n" +
        "1. Ver todo el catálogo\n" +
        "2. Filtrar productos por categoría (filter)\n" +
        "3. Comprar producto por ID (find)\n" +
        "4. Ver carrito y calcular total (reduce)\n" +
        "5. Finalizar compra y salir"
    );

    switch (opcion) {
        case "1":
            // Uso de map para armar el listado completo
            const listado = catalogo.map((p) => `ID: ${p.id} | ${p.nombre} - $${p.precio} (Stock: ${p.stock})`).join("\n");
            alert("Catálogo disponible:\n\n" + listado);
            break;

        case "2":
            filtrarPorCategoria();
            break;

        case "3":
            comprarProductoPorId();
            break;

        case "4":
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
            } else {
                const resumen = calcularTotalCarrito();
                const detalleCarrito = carrito.map((p) => `- ${p.nombre}: $${p.precio}`).join("\n");
                
                alert(
                    `--- Tu Carrito (${carrito.length} productos) ---\n` +
                    detalleCarrito + "\n\n" +
                    `Subtotal sin IVA: $${resumen.totalSinIva}\n` +
                    `Total final con IVA: $${resumen.totalConIva.toFixed(2)}`
                );
            }
            break;

        case "5":
        case null:
            continuar = false;
            break;

        default:
            alert("Opción no válida. Ingresá un número del 1 al 5.");
            break;
    }
}

// 5. Cierre y registros finales por consola
console.log("--- Resumen de la sesión ---");
console.log("Productos en el carrito:", carrito);

if (carrito.length > 0) {
    const totales = calcularTotalCarrito();
    console.log(`Subtotal final: $${totales.totalSinIva}`);
    console.log(`Total final con IVA: $${totales.totalConIva.toFixed(2)}`);
} else {
    console.log("No se realizaron compras.");
}

console.log("--- Estado final del catálogo tras las operaciones ---");
console.table(catalogo);
