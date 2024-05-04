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
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="width: 260px; height: 170px;">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Precio: $${product.price}</p>
                <button class="btn btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                <button class="btn btn-warning" onclick="editarProducto(${index})">Editar</button>
            </div>
        </div>
    `).join('');

    document.getElementById('productCards').innerHTML = productCards;
}

// Mostrar productos al cargar la página
window.onload = mostrarProductos;

document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;

    // Verificar si el producto ya está registrado
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const existingProduct = products.find(product => product.name === productName);
    if (existingProduct) {
        document.getElementById('existingProductAlert').classList.remove('d-none');
        return;
    }

    // Validar nombre del producto
    const productNameRegex = /^[A-Z][a-zA-Z\s]*$/;
    if (!productNameRegex.test(productName)) {
        document.getElementById('productNameAlert').classList.remove('d-none');
        return;
    }

    // Validar descripción
    const productDescriptionRegex = /^[a-zA-Z0-9\s]*$/;
    if (!productDescriptionRegex.test(productDescription)) {
        document.getElementById('productDescriptionAlert').classList.remove('d-none');
        return;
    }

    // Validar precio
    if (parseFloat(productPrice) < 0 || isNaN(parseFloat(productPrice))) {
        document.getElementById('productPriceAlert').classList.remove('d-none');
        return;
    }

    // Validar URL de la imagen
    const productImageRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!productImageRegex.test(productImage)) {
        document.getElementById('productImageAlert').classList.remove('d-none');
        return;
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

    // Limpiar los campos del formulario
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
});

document.getElementById('editProductForm').addEventListener('submit', function (event) {
    event.preventDefault();

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

});
