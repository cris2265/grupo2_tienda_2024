import { Cargar_categorias } from "./Cargar_categoria.js"
import { cargar_producto } from "./Cargar_producto.js";


async function obtenerProductos() {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        let productos_api = data;
        
        Cargar_categorias()    
        // Mi programa
        cargar_producto(productos_api);
    } catch (error) {
        console.error('Ha ocurrido un error al obtener los productos:', error);
    }
}

obtenerProductos()