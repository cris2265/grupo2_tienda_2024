function Cargar_categorias() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categorias => {
            imprimir_categorias(categorias);
        });
}

let imagenes = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/3556/3556550.png"
    },
    {
        img: "https://images.vexels.com/media/users/3/234041/isolated/preview/4c4475f872c35752cd08cef5ad0f8468-joyas-de-collar-de-perlas.png"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/2331/2331716.png"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/3534/3534312.png"
    },
];

function imprimir_categorias(lista_categorias) {
    let div_informacion = document.querySelector("#categorias");

    lista_categorias.forEach((element, index) => {
        let div = document.createElement("div");
        div.classList.add("opciones", `categoria-${index}`);
        
        // Obtener la imagen correspondiente del array `imagenes`, usando el índice
        let img_src = imagenes[index] ? imagenes[index].img : '';

        div.innerHTML = `
            <div class="imagenes imagen-${index}">
                <img src="${img_src}" alt="${element}">
            </div>
            <label for="${element}" class="label-${index}">${element}</label>
        `;

        // Agregar evento click a cada categoría
        div.addEventListener('click', () => {
            cargar_productos_por_categoria(element);
        });

        div_informacion.appendChild(div);
    });
}

function cargar_productos_por_categoria(categoria) {
    fetch(`https://fakestoreapi.com/products/category/${categoria}`)
        .then(res => res.json())
        .then(productos => {
            cargar_producto(productos);
        });
}

function cargar_producto(productos_list) {
    let div_producto_list = document.querySelector("#cuerpo");
    div_producto_list.innerHTML = ''; // Limpiar productos anteriores

    productos_list.forEach(producto => {
        let div = document.createElement("div");
        div.classList = "item_producto";

        let text = producto.title.split(' ').slice(0, 4).join(' ');

        div.innerHTML = `
        <div class="box_img">
            <img src="${producto.image}" alt="">
        </div>        
        <span class="name">${text}</span>
        <div class="estrellas">
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
    });
}

export { Cargar_categorias, cargar_producto };
