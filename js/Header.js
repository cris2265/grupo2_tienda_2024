import { obtenerProductoSeleccionado } from './Cargar_producto.js';
document.addEventListener('DOMContentLoaded', () => {
    let header = document.querySelector("#header");
    header.innerHTML = `
    <nav>
        <nav class="logito">
            <a href="https://github.com/DereckAbrahham" class="logo-link">
                <img src="https://st2.depositphotos.com/4265001/12342/v/950/depositphotos_123429310-stock-illustration-pig-logo-illustration.jpg" alt="Logo" class="log">
                <h2>Chicharrones Shop</h2>
            </a>
        </nav>
        <nav class="tipos">
            <div>Home</div>
            <div>Products</div>
            <div>About</div>
            <div>Support</div>
        </nav>
        <nav class="imagen">
            <span class="material-symbols-outlined carrito" style="cursor: pointer;">shopping_cart</span>
            <span class="material-symbols-outlined">search</span>
            <input type="text" class="entradaTxt">
            <span id="loginBtn" class="material-symbols-outlined" style="cursor: pointer;">person</span>
        </nav>
    </nav>
    <div id="loginModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="login-container">
                <h1>Iniciar Sesión</h1>
                <form id="loginForm">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username" required>
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required>
                    <button type="submit">Ingresar</button>
                    <p id="message"></p>
                </form>
            </div>
        </div>
    </div>

    <div id="userInfoModal" class="modal">
        <div class="modal-content">
            <span class="close-user-info">&times;</span>
            <div class="user-info-container">
                <h1>Información del Usuario</h1>
                <p id="userInfo"></p>
                <button id="logoutBtn">Cerrar Sesión</button>
            </div>
        </div>
    </div>

<div id="cartModal" class="modal">
    <div class="modal-content">
        <span class="close-cart">&times;</span>
        <div class="cart-container">
            <h1>Carrito de Compras</h1>
            <p class="empty-cart-message">Tu carrito está vacío.</p>
            <div class="productos-seleccionados"></div>
        </div>
    </div>
</div>
    `;

    // Paso 3: Implementar la funcionalidad en JavaScript
    const cartModal = document.getElementById("cartModal");
    const carrito = document.querySelector(".carrito");
    const closeCart = document.querySelector(".close-cart");
    const productosSeleccionadosContainer = document.querySelector(".productos-seleccionados");
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    
    // Función para obtener producto seleccionado (debe ser definida por el usuario)
    carrito.addEventListener("click", () => {
        const productoSeleccionado = obtenerProductoSeleccionado();
        if (productoSeleccionado) {
            // Lógica para mostrar los detalles del producto en el carrito
            agregarProductoAlCarrito(productoSeleccionado);
        }
        cartModal.style.display = "block";
    });
    

    
    // Cerrar carrito
    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });
    
    // Cerrar carrito al hacer clic fuera de él
    window.addEventListener("click", (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = "none";
        }
    });
    
    // Agregar producto al carrito
    function agregarProductoAlCarrito(producto) {
        // Crear elementos HTML para el producto
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.dataset.id = producto.id;
    
        const productoTitulo = document.createElement("h4");
        productoTitulo.textContent = producto.title;
    
        const productoPrecio = document.createElement("p");
        productoPrecio.textContent = `$${producto.price.toFixed(2)}`;
    
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";

        let imagen = document.createElement("div")
        imagen.innerHTML = `
            <img src="${producto.image}" alt="">
        `

        eliminarBtn.addEventListener("click", () => {
            eliminarProductoDelCarrito(producto.id);
        });
    
        // Añadir elementos al contenedor de producto
        productoDiv.appendChild(productoTitulo);
        productoDiv.appendChild(productoPrecio);
        productoDiv.appendChild(eliminarBtn);
        productoDiv.appendChild(imagen);
        
        // Añadir producto al contenedor de productos seleccionados
        productosSeleccionadosContainer.appendChild(productoDiv);
    
        // Ocultar mensaje de carrito vacío
        emptyCartMessage.style.display = "none";
    }
    
    // Eliminar producto del carrito
    function eliminarProductoDelCarrito(productoId) {
        const productoDiv = document.querySelector(`.producto[data-id='${productoId}']`);
        if (productoDiv) {
            productosSeleccionadosContainer.removeChild(productoDiv);
            
            // Mostrar mensaje de carrito vacío si no hay productos
            if (productosSeleccionadosContainer.children.length === 0) {
                emptyCartMessage.style.display = "block";
            }
        }
    }

    

    const loginModal = document.getElementById("loginModal");
    const userInfoModal = document.getElementById("userInfoModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeLoginSpan = document.getElementsByClassName("close")[0];
    const closeUserInfoSpan = document.getElementsByClassName("close-user-info")[0];
    const logoutBtn = document.getElementById("logoutBtn");
    const messageElement = document.getElementById('message');
    const userInfoElement = document.getElementById('userInfo');

    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    closeLoginSpan.onclick = function() {
        loginModal.style.display = "none";
    }

    closeUserInfoSpan.onclick = function() {
        userInfoModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        } else if (event.target == userInfoModal) {
            userInfoModal.style.display = "none";
        }
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log(`Intentando iniciar sesión con el usuario: ${username}`);

        fetch('https://fakestoreapi.com/users')
            .then(res => res.json())
            .then(users => {
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    console.log(`Usuario ${username} ha iniciado sesión exitosamente.`);
                    messageElement.textContent = 'Inicio de sesión exitoso.';
                    messageElement.style.color = 'green';
                    loginModal.style.display = "none";
                    loginBtn.innerHTML = `${username}`;
                    loginBtn.style.cursor = "pointer";

                    loginBtn.onclick = function() {
                        userInfoElement.innerHTML = `
                            <p><strong>Nombre:</strong> ${user.name.firstname} ${user.name.lastname}</p>
                            <p><strong>Usuario:</strong> ${user.username}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Teléfono:</strong> ${user.phone}</p>
                        `;
                        userInfoModal.style.display = "block";
                    };

                    logoutBtn.onclick = function() {
                        loginBtn.innerHTML = 'person';
                        loginBtn.style.cursor = "pointer";
                        loginBtn.onclick = function() {
                            loginModal.style.display = "block";
                        };
                        userInfoModal.style.display = "none";
                        messageElement.textContent = '';
                    };
                } else {
                    console.log(`Fallo en el inicio de sesión para el usuario: ${username}`);
                    messageElement.textContent = 'Usuario o contraseña incorrectos.';
                    messageElement.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageElement.textContent = 'Hubo un error al verificar los datos.';
                messageElement.style.color = 'red';
            });
    });
});