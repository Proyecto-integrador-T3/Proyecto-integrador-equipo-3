// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el formulario de inicio de sesión y los elementos de alerta
    var loginForm = document.querySelector("#login form");
    var emailInput = document.getElementsByName("email")[0];
    var passwordInput = document.getElementsByName("password")[0];
    var emailAlert = document.getElementById("emailAlert");
    var passwordAlert = document.getElementById("passwordAlert");

    // Agregar un event listener para el evento submit
    loginForm.addEventListener("submit", function (event) {
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

        // Obtener datos almacenados en localStorage
        var storedUserData = localStorage.getItem("userData");
        
        // Convertir los datos almacenados de JSON a objeto
        var userData = JSON.parse(storedUserData);

        // Verificar si los datos coinciden
        if (email === userData.email && password === userData.password) {
            // Redirigir a la página de inicio
            window.location.href = "../index.html";
            alert("¡Bienvenido!");
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
    });
});
