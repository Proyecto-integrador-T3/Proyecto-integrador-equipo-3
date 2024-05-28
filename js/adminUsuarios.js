document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const dataContainer = document.getElementById('data');
    let users = [];

    // Función para renderizar la tabla de usuarios
    const renderTable = () => {
        dataContainer.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td><img src="${user.picture}" width="50" height="50" alt="Imagen de Perfil"></td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-info" onclick="viewUser(${index})"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-warning" onclick="editUser(${index})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger" onclick="deleteUser(${index})"><i class="bi bi-trash"></i></button>
                </td>
            `;
            dataContainer.appendChild(row);
        });
    };

    // Función para añadir un nuevo usuario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUser = {
            id: document.getElementById('id').value,
            picture: document.querySelector('.img').src,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        users.push(newUser);
        renderTable();
        form.reset();
        document.querySelector('.btn-close').click();
    });

    // Funciones para ver, editar y eliminar usuarios
    window.viewUser = (index) => {
        const user = users[index];
        document.getElementById('showId').value = user.id;
        document.querySelector('.showImg').src = user.picture;
        document.getElementById('showName').value = user.name;
        document.getElementById('showEmail').value = user.email;
        new bootstrap.Modal(document.getElementById('readData')).show();
    };

    window.editUser = (index) => {
        const user = users[index];
        document.getElementById('id').value = user.id;
        document.querySelector('.img').src = user.picture;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('password').value = user.password;
        users.splice(index, 1);
        new bootstrap.Modal(document.getElementById('userForm')).show();
    };

    window.deleteUser = (index) => {
        users.splice(index, 1);
        renderTable();
    };

    // Función para previsualizar la imagen cargada
    document.getElementById('imgInput').addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            document.querySelector('.img').src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });
});
