
window.onload = function () {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productCards = products.map(product => `
                    <div class="card pt-3 m-auto" style="width: 18rem;">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="width: 240px; height: 170px;" >
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">Precio: $${product.price}</p>
                            <a href="#" class="btn btn-primary">Agregar</a>
                        </div>
                    </div>
                `).join('');

    document.getElementById('productCards').innerHTML = productCards;
};
