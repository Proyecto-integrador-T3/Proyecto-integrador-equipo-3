document.addEventListener('DOMContentLoaded', async () => {
    const addForm = document.getElementById('addForm');
    const dataContainer = document.getElementById('data');
    let users = [];

    // Función para cargar los usuarios del servidor
    const loadUsers = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            users = await response.json();
            renderTable();
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudieron cargar los usuarios');
        }
    };

    // Función para renderizar la tabla de usuarios
    const renderTable = () => {
        dataContainer.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.number}</td>
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

    // Iniciar carga de usuarios
    loadUsers();

    // Función para añadir un nuevo usuario
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newUser = {
            name: document.getElementById('name').value,
            number: document.getElementById('number').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('http://localhost:8081/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const addedUser = await response.json();
            users.push(addedUser);
            renderTable();
            addForm.reset();
            document.querySelector('.btn-close').click();
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo agregar el usuario');
        }
    });

    // Funciones para ver, editar y eliminar usuarios
    window.viewUser = (index) => {
        const user = users[index];
        document.getElementById('showId').value = user.id;
        document.getElementById('showName').value = user.name;
        document.getElementById('showEmail').value = user.email;
        new bootstrap.Modal(document.getElementById('readData')).show();
    };

    window.editUser = (index) => {
        const user = users[index];
        document.getElementById('editId').value = user.id;
        document.getElementById('editName').value = user.name;
        document.getElementById('editNumber').value = user.number;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editPassword').value = user.password;
        new bootstrap.Modal(document.getElementById('editForm')).show();
    };

    window.deleteUser = async (index) => {
        const user = users[index];
        try {
            const response = await fetch(`http://localhost:8081/api/users/${user.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            users.splice(index, 1);
            renderTable();
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo eliminar el usuario');
        }
    };
});
