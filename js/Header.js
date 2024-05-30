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
            <span class="material-symbols-outlined">
                shopping_cart
            </span>
            <span class="material-symbols-outlined">
                search
            </span>
            <input type="text" class="entradaTxt">
            <span id="loginBtn" class="material-symbols-outlined" style="cursor: pointer;">
                person
            </span>
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
    `;

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
