// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
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

    // validacion al enviar
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // evita recarga

        // Usar reportValidity para mostrar mensajes nativos y bloquear envío si inválido
        if (!formulario.reportValidity()) {
            // si hay campos inválidos, salir (reportValidity ya muestra mensajes)
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

    // retroalimentación al usuario
    alert('🚀 ¡Registro exitoso! Serás redirigido...');
    console.log('Datos en LocalStorage:', JSON.parse(localStorage.getItem('usuarioRegistrado')));

    // redirigir a una página de agradecimiento/confirmación
    window.location.href = 'https://eljavi0.github.io/ben10-lookbook/#inicio';
    });
});