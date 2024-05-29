document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm() && validateCaptcha()) {
            form.submit();
            form.reset(); // Restablecer el formulario después del envío
        }
    });

    function validateForm() {
        let isValid = true;

        // Validar el nombre
        const name = document.querySelector('[name="fullName"]');
        if (name.value.trim() === '') {
            name.classList.add('is-invalid');
            document.getElementById('fullNameAlert').classList.remove('d-none');
            isValid = false;
        } else {
            name.classList.remove('is-invalid');
            document.getElementById('fullNameAlert').classList.add('d-none');
        }

        // Validar el teléfono
        const phone = document.querySelector('[name="cellNumber"]');
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone.value.trim())) {
            phone.classList.add('is-invalid');
            document.getElementById('cellNumberAlert').classList.remove('d-none');
            isValid = false;
        } else {
            phone.classList.remove('is-invalid');
            document.getElementById('cellNumberAlert').classList.add('d-none');
        }

        // Validar el correo electrónico
        const email = document.querySelector('[name="email"]');
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add('is-invalid');
            document.getElementById('emailAlert').classList.remove('d-none');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
            document.getElementById('emailAlert').classList.add('d-none');
        }

        // Validar comentarios
        const comments = document.querySelector('[name="comments"]');
        if (comments.value.trim() === '') {
            comments.classList.add('is-invalid');
            document.getElementById('commentsAlert').classList.remove('d-none');
            isValid = false;
        } else {
            comments.classList.remove('is-invalid');
            document.getElementById('commentsAlert').classList.add('d-none');
        }

        return isValid;
    }

    function validateCaptcha() {
        const captchaResponse = document.querySelector('[name="h-captcha-response"]').value;
        if (captchaResponse === '') {
            document.getElementById('captchaAlert').classList.remove('d-none');
            return false;
        } else {
            document.getElementById('captchaAlert').classList.add('d-none');
            return true;
        }
    }
});
