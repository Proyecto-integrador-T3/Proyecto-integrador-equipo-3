document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Formulario enviado con éxito.');
            form.submit();
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar el nombre
        const name = document.getElementById('exampleInputName');
        if (name.value.trim() === '') {
            name.classList.add('is-invalid');
            isValid = false;
        } else {
            name.classList.remove('is-invalid');
        }

        // Validar los apellidos
        const lastName = document.getElementById('exampleInputLastName');
        if (lastName.value.trim() === '') {
            lastName.classList.add('is-invalid');
            isValid = false;
        } else {
            lastName.classList.remove('is-invalid');
        }

        // Validar el correo electrónico
        const email = document.getElementById('exampleInputEmail1');
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
        }

        // Validar el teléfono
        const phone = document.getElementById('exampleInputPhone');
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone.value.trim())) {
            phone.classList.add('is-invalid');
            isValid = false;
        } else {
            phone.classList.remove('is-invalid');
        }

        // Validar comentarios
        const comments = document.getElementById('floatingTextarea');
        if (comments.value.trim() === '') {
            comments.classList.add('is-invalid');
            isValid = false;
        } else {
            comments.classList.remove('is-invalid');
        }

        return isValid;
    }
});
