// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // helper: leer el usuario almacenado (versión simple actual)
    function getStoredUser() {
        try {
            return JSON.parse(localStorage.getItem('usuarioRegistrado')) || null;
        } catch (e) {
            return null;
        }
    }

    // helper: mostrar el formulario de login
    function showLogin(prefillUser) {
        const registroSection = document.getElementById('registro');
        const loginSection = document.getElementById('login');
        if (registroSection) registroSection.style.display = 'none';
        if (loginSection) {
            loginSection.style.display = 'block';
            const inUser = document.getElementById('login-usuario');
            const inPass = document.getElementById('login-contrasena');
            if (inUser && prefillUser) inUser.value = prefillUser;
            if (inPass) inPass.focus();
        }
    }

    // login handler: compara con el único usuario guardado bajo 'usuarioRegistrado'
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const loginUser = document.getElementById('login-usuario').value.trim();
            const loginPass = document.getElementById('login-contrasena').value;
            const errorSpan = document.getElementById('login-error');

            const stored = getStoredUser();
            if (!stored) {
                errorSpan.textContent = 'No hay usuarios registrados aún.';
                errorSpan.style.display = 'block';
                return;
            }

            if (loginUser !== stored.nombreusuario) {
                errorSpan.textContent = 'Usuario no encontrado.';
                errorSpan.style.display = 'block';
                return;
            }

            if (loginPass !== stored.password) {
                errorSpan.textContent = 'Contraseña incorrecta.';
                errorSpan.style.display = 'block';
                return;
            }

            // redirigir a una página externa como muestra de que el ingreso fue exitoso
            window.location.href = 'https://eljavi0.github.io/ben10-lookbook/#inicio';

            document.getElementById('logout').addEventListener('click', () => {
                localStorage.removeItem('usuarioRegistrado');
                location.reload();
            });
        });
    }
    // Referenciacion a los elementos del DOM
    const formulario = document.getElementById('formulario-registro');
    const password = document.getElementById('contrasena');
    const seguridad = document.getElementById('nivelseguridad');
    const usuario = document.getElementById('nombreusuario');
    const correoElectronico = document.getElementById('correo');

    // medidor de nivel de fortaleza de contraseña en tiempo real
    password.addEventListener('input', () => {
        const valor = password.value;
        let fortaleza = 0;

        // heurística simple para fortaleza
        if (valor.length >= 8) fortaleza += 40;
        else if (valor.length >= 5) fortaleza += 20;
        if (valor.match(/[A-Z]/)) fortaleza += 20;
        if (valor.match(/[0-9]/)) fortaleza += 20;
        if (valor.match(/[^A-Za-z0-9]/)) fortaleza += 10; // simbolos

        fortaleza = Math.min(100, fortaleza);

        // se cambia el tamaño (ancho) de la barra
        seguridad.style.width = fortaleza + '%';

        // cambia el color según nivel
        if (fortaleza < 40) seguridad.style.backgroundColor = '#ef4444';
        else if (fortaleza < 70) seguridad.style.backgroundColor = '#f59e0b';
        else seguridad.style.backgroundColor = '#10b981';
    });

    // validacion al enviar (registro)
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // evita recarga

        // Usar reportValidity para mostrar mensajes nativos y bloquear envío si inválido
        if (!formulario.reportValidity()) {
            // si hay campos inválidos, salir
            return;
        }

        // todos los campos válidos: capturar datos y guardar
        const datosUsuario = {
            nombreusuario: usuario.value,
            email: correoElectronico.value,
            password: password.value,
            fecha: new Date().toLocaleString()
        };

        localStorage.setItem('usuarioRegistrado', JSON.stringify(datosUsuario));

        // Mostrar login y prefill
        showLogin(usuario.value);
    });
});