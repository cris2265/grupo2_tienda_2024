function Cargar_categorias() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categorias => {
            imprimir_categorias(categorias)
        })
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
]

function imprimir_categorias(lista_categorias) {
    let div_informacion = document.querySelector("#categorias")

    lista_categorias.forEach((element, index) => {
        let div = document.createElement("div")
        div.classList.add("opciones", `categoria-${index}`)
        
        // Obtener la imagen correspondiente del array `imagenes`, usando el índice
        let img_src = imagenes[index] ? imagenes[index].img : '';

        div.innerHTML = `
            <div class="imagenes imagen-${index}">
                <img src="${img_src}" alt="${element}">
            </div>
            <label for="${element}" class= "label-${index}">${element}</label>
        `

        div_informacion.appendChild(div)
    });
}

export { Cargar_categorias }


