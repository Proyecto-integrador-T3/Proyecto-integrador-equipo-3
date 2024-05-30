document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('botonRegistrarse').addEventListener('click', async function (event) {
        event.preventDefault();

        // Variables para guardar los valores de los campos del formulario
        var fullName = document.getElementsByName('fullName')[0].value.trim();
        var cellNumber = document.getElementsByName('cellNumber')[0].value.trim();
        var email = document.getElementsByName('email')[0].value.trim();
        var password = document.getElementsByName('password')[0].value.trim();
        var passwordValidate = document.getElementsByName('passwordValidate')[0].value.trim();

        // Variables para las alertas de Bootstrap
        var fullNameAlert = document.getElementById('fullNameAlert');
        var cellNumberAlert = document.getElementById('cellNumberAlert');
        var emailAlert = document.getElementById('emailAlert');
        var passwordAlert = document.getElementById('passwordAlert');
        var passwordWrongAlert = document.getElementById('passwordWrongAlert');

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

        // Validación de la contraseña
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passwordAlert.classList.remove('d-none');
            hasError = true;
        } else {
            passwordAlert.classList.add('d-none');
        }

        // Validación de la coincidencia de las contraseñas
        if (password !== passwordValidate) {
            passwordWrongAlert.classList.remove('d-none');
            hasError = true;
        } else {
            passwordWrongAlert.classList.add('d-none');
        }

        // Si no hay errores, se puede proceder con el envío del formulario
        if (!hasError) {
            var userData = {
                name: fullName,
                number: cellNumber,
                email: email,
                password: password
            };

            console.log('Enviando datos del usuario:', userData);

            try {
                // Enviar la solicitud POST al backend usando async/await
                let response = await fetch('http://localhost:8081/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                // Verificar si la respuesta es exitosa
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                let data = await response.json();
                console.log('Success:', data);
                // Redirige a la página de registro exitoso
                window.location.href = '../html/registroExitoso.html';
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});
