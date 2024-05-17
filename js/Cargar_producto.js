
function cargar_producto(productos_list) {
    let div_producto_list = document.querySelector("#cuerpo")
 

    productos_list.forEach(producto => {
        let div = document.createElement("div")
        div.classList = "item_producto"

        let text = producto.title.split(' ').slice(0,4).join(' ')


        div.innerHTML = `
        <div class="box_img">
            <img src="${producto.image}" alt="">
            
        </div>        
        <span class="name">${text}</span>
        <div class ="estrellas">
        <p class="calificacion">0.0</p>
        <span class="material-symbols-outlined">
        star
        </span>
        <span class="material-symbols-outlined">
        star
        </span>
        <span class="material-symbols-outlined">
        star
        </span>
        <span class="material-symbols-outlined">
        star
        </span>
        <span class="material-symbols-outlined">
        star
        </span>
        <p>(1)</p>
        </div>
        <div class="box_description">
            <span class="price">Q.${producto.price}</span>
            <div class="buy_btn" id="${producto.id}">Comprar Produc. ${producto.id}</div>
            <div class="envio">Envio GRATIS</div>
=======
        </div>        
        `
        div_producto_list.appendChild(div)

    });

}



export {cargar_producto}
