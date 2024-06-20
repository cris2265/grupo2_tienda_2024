function cargar_producto(productos_list) {
    let div_producto_list = document.querySelector("#cuerpo");

    productos_list.forEach(producto => {
        let div = document.createElement("div");
        div.classList = "item_producto";

        let text = producto.title.split(' ').slice(0, 4).join(' ');

        div.innerHTML = `
        <div class="box_img">
            <img src="${producto.image}" alt="">
        </div>        
        <span class="name">${text}</span>
        <div class ="estrellas">
            <p class="calificacion">0.0</p>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <span class="material-symbols-outlined">star</span>
            <p>(1)</p>
        </div>
        <div class="box_description">
            <span class="price">Q.${producto.price}</span>
            <div class="buy_btn" id="${producto.id}">Comprar Produc. ${producto.id}</div>
            <div class="envio">Envio GRATIS</div>
        </div>        
        `;

        div_producto_list.appendChild(div);

        // Añadir el event listener al botón de compra
        const buyBtn = div.querySelector('.buy_btn');
        buyBtn.addEventListener('click', () => {
            alert(`Producto ${producto.id} agregado al carrito!`);
            agregarAlCarrito(producto); // Llamar a la función de agregar al carrito
        });
    });
}

let productoSeleccionado = null;

function agregarAlCarrito(producto) {
    // Aquí podemos implementar cualquier lógica adicional antes de exportar
    exportarProductoSeleccionado(producto);
}

function exportarProductoSeleccionado(producto) {
    productoSeleccionado = producto;
}

function obtenerProductoSeleccionado() {
    return productoSeleccionado;
}

export { cargar_producto, agregarAlCarrito, obtenerProductoSeleccionado };
