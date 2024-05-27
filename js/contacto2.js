document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('botonEnviar').addEventListener('click', function (event) {
        event.preventDefault();

        // Variables para guardar los valores de los campos del formulario
        var fullName = document.getElementsByName('fullName')[0].value.trim();
        var cellNumber = document.getElementsByName('cellNumber')[0].value.trim();
        var email = document.getElementsByName('email')[0].value.trim();
        var comments = document.getElementsByName('comments')[0].value.trim();

        // Variables para las alertas de Bootstrap
        var fullNameAlert = document.getElementById('fullNameAlert');
        var cellNumberAlert = document.getElementById('cellNumberAlert');
        var emailAlert = document.getElementById('emailAlert');
        var commentsAlert = document.getElementById('commentsAlert');

        // Flag para verificar si hay errores
        var hasError = false;

        // Validación del nombre completo
        if (fullName === '') {
            fullNameAlert.classList.remove('d-none');
            hasError = true;
        } else {
            fullNameAlert.classList.add('d-none');
        }

        // Validación del número de teléfono
        if (!/^\d{10}$/.test(cellNumber)) {
            cellNumberAlert.classList.remove('d-none');
            hasError = true;
        } else {
            cellNumberAlert.classList.add('d-none');
        }

        // Validación del correo
        if (!/\S+@\S+\.\S+/.test(email)) {
            emailAlert.classList.remove('d-none');
            hasError = true;
        } else {
            emailAlert.classList.add('d-none');
        }

        // Validación de los comentarios
        if (comments === '') {
            commentsAlert.classList.remove('d-none');
            hasError = true;
        } else {
            commentsAlert.classList.add('d-none');
        }

        // Si no hay errores, se puede proceder con el envío del formulario
        if (!hasError) {
            var contactData = {
                fullName: fullName,
                cellNumber: cellNumber,
                email: email,
                comments: comments
            };

            // Convertir el objeto contactData a JSON
            var jsonData = JSON.stringify(contactData);

            // Guardar el JSON en el contenido local
            localStorage.setItem('contactData', jsonData);

            // Redirige a la pagina de envío exitoso
            window.location.href = '../html/envioExitoso.html';
        }
    });
});
