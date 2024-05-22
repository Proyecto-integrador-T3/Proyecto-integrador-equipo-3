function eliminarProducto(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1); // Elimina el producto en la posición 'index'
    localStorage.setItem('products', JSON.stringify(products));
    mostrarProductos(); // Vuelve a mostrar la lista de productos actualizada
}

function editarProducto(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    // Rellenar el formulario de edición con los datos del producto seleccionado
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.imageUrl;

    // Almacena el índice del producto que se está editando
    document.getElementById('editProductForm').setAttribute('data-product-index', index);

    // Mostrar el modal para editar el producto
    var myModal = new bootstrap.Modal(document.getElementById('editProductModal'));
    myModal.show();
}

function mostrarProductos() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productCards = products.map((product, index) => `
        <div class="card pt-3 m-auto mb-4 " style="width: 18rem;">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="width: 240px; height: 170px;">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Precio: $${product.price}</p>
                <button class="btn btn btn-outline-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                <button class="btn btn btn-outline-primary" onclick="editarProducto(${index})">Editar</button>
            </div>
        </div>
    `).join('');

    document.getElementById('productCards').innerHTML = productCards;
}

// Mostrar productos al cargar la página
window.onload = mostrarProductos;

// Función para validar el formulario de registro de productos
function validarFormulario() {
    const productName = document.getElementById('productName').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const productImage = document.getElementById('productImage').value.trim();

    // Verificar si el producto ya está registrado
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const existingProduct = products.find(product => product.name === productName);
    if (existingProduct) {
        document.getElementById('existingProductAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('existingProductAlert').classList.add('d-none');
    }

    // Validar nombre del producto
    const productNameRegex = /^[A-Z][a-zA-Z\s]*$/;
    if (!productNameRegex.test(productName)) {
        document.getElementById('productNameAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('productNameAlert').classList.add('d-none');
    }

    // Validar descripción
    const productDescriptionRegex = /^[a-zA-Z0-9\s]*$/;
    if (!productDescriptionRegex.test(productDescription)) {
        document.getElementById('productDescriptionAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('productDescriptionAlert').classList.add('d-none');
    }

    // Validar precio
    if (parseFloat(productPrice) < 0 || isNaN(parseFloat(productPrice))) {
        document.getElementById('productPriceAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('productPriceAlert').classList.add('d-none');
    }

    // Validar URL de la imagen
    const productImageRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!productImageRegex.test(productImage)) {
        document.getElementById('productImageAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('productImageAlert').classList.add('d-none');
    }

    // Si pasa todas las validaciones y el producto no está registrado, guardarlo
    const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        imageUrl: productImage
    };

    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));
    mostrarProductos(); // Vuelve a mostrar la lista de productos actualizada
    alert('¡Producto guardado!');

   // Después de validar el formulario y guardar exitosamente
// Habilitar la opción data-bs-dismiss del botón para cerrar el modal
document.getElementById('saveChangesBtn').setAttribute('data-bs-dismiss', 'modal');


    // Limpiar los campos del formulario
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';

    return true;
}

// Asignar la función de validación al evento de envío del formulario
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    validarFormulario();
});

// Añadir eventos de clic para ocultar las alertas cuando se hace clic en los cuadros de texto correspondientes
document.getElementById('productName').addEventListener('click', function () {
    document.getElementById('productNameAlert').classList.add('d-none');
});

document.getElementById('productDescription').addEventListener('click', function () {
    document.getElementById('productDescriptionAlert').classList.add('d-none');
});

document.getElementById('productPrice').addEventListener('click', function () {
    document.getElementById('productPriceAlert').classList.add('d-none');
});

document.getElementById('productImage').addEventListener('click', function () {
    document.getElementById('productImageAlert').classList.add('d-none');
});

document.getElementById('editProductForm').addEventListener('submit', function (event) {
    event.preventDefault();

    if (validarFormularioModal()) {
        // Captura los valores actualizados del formulario de edición
        const editedProductName = document.getElementById('editProductName').value;
        const editedProductDescription = document.getElementById('editProductDescription').value;
        const editedProductPrice = document.getElementById('editProductPrice').value;
        const editedProductImage = document.getElementById('editProductImage').value;

        // Obtén el índice del producto que se está editando
        const index = parseInt(document.getElementById('editProductForm').getAttribute('data-product-index'));

        // Actualiza el producto correspondiente en el almacenamiento local
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products[index] = {
            name: editedProductName,
            description: editedProductDescription,
            price: editedProductPrice,
            imageUrl: editedProductImage
        };
        localStorage.setItem('products', JSON.stringify(products));

        // Vuelve a mostrar la lista de productos actualizada
        mostrarProductos();
    }
});

//Función para mostrar alertas en el formulario de edición de productos
function validarFormularioModal() {
    const editedProductName = document.getElementById('editProductName').value.trim();
    const editedProductDescription = document.getElementById('editProductDescription').value.trim();
    const editedProductPrice = document.getElementById('editProductPrice').value.trim();
    const editedProductImage = document.getElementById('editProductImage').value.trim();

    // Validar nombre del producto
    const productNameRegex = /^[A-Z][a-zA-Z\s():]*$/;
    if (!productNameRegex.test(editedProductName)) {
        document.getElementById('editProductNameAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('editProductNameAlert').classList.add('d-none');
    }

    // Validar descripción
    const productDescriptionRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s.:]*$/;
    if (!productDescriptionRegex.test(editedProductDescription)) {
        document.getElementById('editProductDescriptionAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('editProductDescriptionAlert').classList.add('d-none');
    }

    // Validar precio
    if (parseFloat(editedProductPrice) < 0 || isNaN(parseFloat(editedProductPrice))) {
        document.getElementById('editProductPriceAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('editProductPriceAlert').classList.add('d-none');
    }

    // Validar URL de la imagen
    const productImageRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!productImageRegex.test(editedProductImage)) {
        document.getElementById('editProductImageAlert').classList.remove('d-none');
        return false;
    } else {
        document.getElementById('editProductImageAlert').classList.add('d-none');
    }

    return true; // Todos los campos son válidos
}

// Añadir eventos de clic para ocultar las alertas cuando se hace clic en los cuadros de texto
document.getElementById('editProductName').addEventListener('click', function () {
    document.getElementById('editProductNameAlert').classList.add('d-none');
});

document.getElementById('editProductDescription').addEventListener('click', function () {
    document.getElementById('editProductDescriptionAlert').classList.add('d-none');
});

document.getElementById('editProductPrice').addEventListener('click', function () {
    document.getElementById('editProductPriceAlert').classList.add('d-none');
});

document.getElementById('editProductImage').addEventListener('click', function () {
    document.getElementById('editProductImageAlert').classList.add('d-none');
});

