// Array para almacenar los productos
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

// Función para guardar los productos en el almacenamiento local
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(listaProductos));
}

// Función para mostrar el formulario para agregar un nuevo producto
function mostrarFormulario() {
    document.getElementById("formularioNuevoProducto").style.display = "block";
}

// Función para mostrar los productos en tarjetas
function mostrarProductos() {
    const contenedorProductos = document.getElementById("listaProductos");
    contenedorProductos.innerHTML = ""; // Limpiar el contenido previo
    
    listaProductos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.style.maxWidth = "18rem";
        
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        
        const titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = producto.nombre;
        cardBody.appendChild(titulo);
        
        const descripcion = document.createElement("p");
        descripcion.classList.add("card-text");
        descripcion.textContent = producto.descripcion;
        cardBody.appendChild(descripcion);
        
        const precio = document.createElement("p");
        precio.classList.add("card-text");
        precio.textContent = "Precio: $" + producto.precio;
        cardBody.appendChild(precio);
        
        const botonEditar = document.createElement("button");
        botonEditar.classList.add("btn", "btn-primary", "me-2");
        botonEditar.textContent = "Editar";
        botonEditar.onclick = () => mostrarFormularioEditar(producto.id);
        cardBody.appendChild(botonEditar);
        
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn", "btn-danger");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarProducto(producto.id);
        cardBody.appendChild(botonEliminar);
        
        card.appendChild(cardBody);
        contenedorProductos.appendChild(card);
    });
}

// Función para procesar el envío del formulario de agregar nuevo producto
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    
    // Crear un nuevo objeto de producto
    const nuevoProducto = {
        id: listaProductos.length + 1, // Generar un ID único
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    };
    
    listaProductos.push(nuevoProducto); // Agregar el producto a la lista
    mostrarProductos(); // Actualizar la vista de productos
    guardarProductos(); // Guardar los productos en el almacenamiento local
    
    //
