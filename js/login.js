// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el formulario de inicio de sesión y los elementos de alerta
    var loginForm = document.querySelector("#login form");
    var emailInput = document.getElementsByName("email")[0];
    var passwordInput = document.getElementsByName("password")[0];
    var emailAlert = document.getElementById("emailAlert");
    var passwordAlert = document.getElementById("passwordAlert");

    // Agregar un event listener para el evento submit
    loginForm.addEventListener("submit", async function (event) {
        // Evitar el comportamiento predeterminado del formulario
        event.preventDefault();

        // Obtener datos del formulario
        var email = emailInput.value;
        var password = passwordInput.value;

        // Verificar si el campo de correo está vacío
        if (email.trim() === "") {
            // Mostrar la alerta de correo vacío
            emailAlert.classList.remove("d-none");
            return; // Detener la ejecución de la función
        } else {
            // Ocultar la alerta de correo vacío si se muestra
            emailAlert.classList.add("d-none");
        }

        // Verificar si el campo de contraseña está vacío
        if (password.trim() === "") {
            // Mostrar la alerta de contraseña vacía
            passwordAlert.classList.remove("d-none");
            return; // Detener la ejecución de la función
        } else {
            // Ocultar la alerta de contraseña vacía si se muestra
            passwordAlert.classList.add("d-none");
        }

        try {
            // Enviar la solicitud POST al backend para el inicio de sesión
            let response = await fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.json();
            console.log('Success:', data);
            // Redirigir a la página de inicio si el inicio de sesión fue exitoso
            window.location.href = "../index.html";
            alert("¡Bienvenido!");
        } catch (error) {
            console.error('Error:', error);
            alert("Correo electrónico o contraseña incorrectos.");
        }
    });
});
