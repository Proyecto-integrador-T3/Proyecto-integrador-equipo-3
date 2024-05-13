// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el formulario de inicio de sesión
    var loginForm = document.querySelector("#login form");

    // Agregar un event listener para el evento submit
    loginForm.addEventListener("submit", function (event) {
        // Evitar el comportamiento predeterminado del formulario
        event.preventDefault();

        // Obtener datos del formulario
        var email = document.getElementsByName("email")[0].value;
        var password = document.getElementsByName("password")[0].value;

        // Obtener datos almacenados en localStorage
        var storedEmail = localStorage.getItem("userData");
        
        // Convertir los datos almacenados de JSON a objeto
        var userData = JSON.parse(storedEmail);

        // Verificar si los datos coinciden
        if (email === userData.email && password === userData.password) {
            // Redirigir a la página de inicio
            window.location.href = "../index.html";
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
    });
});
