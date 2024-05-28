document.addEventListener("DOMContentLoaded", () => {
    const orders = [
        { id: 1, fecha: "2024-05-10", total: 150.00, estatus_pago: "pendiente", id_clientes: 101 },
        { id: 2, fecha: "2024-05-11", total: 200.00, estatus_pago: "pagado", id_clientes: 102 },
    ];

    const renderOrders = () => {
        const orderData = document.getElementById('orderData');
        orderData.innerHTML = '';
        orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.id}</td>
                <td>${order.fecha}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${order.estatus_pago}</td>
                <td>${order.id_clientes}</td>
                <td>
                    <button class="btn btn-info" onclick="viewOrder(${order.id})"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-warning" onclick="updateOrder(${order.id})"><i class="bi bi-pencil-square"></i></button>
                </td>
            `;
            orderData.appendChild(tr);
        });
    };

    window.viewOrder = (id) => {
        const order = orders.find(o => o.id === id);
        if (order) {
            document.getElementById('showOrderId').value = order.id;
            document.getElementById('showOrderDate').value = order.fecha;
            document.getElementById('showOrderTotal').value = order.total.toFixed(2);
            document.getElementById('showOrderStatus').value = order.estatus_pago;
            document.getElementById('showClientId').value = order.id_clientes;
            new bootstrap.Modal(document.getElementById('readOrderData')).show();
        }
    };

    window.updateOrder = (id) => {
        const order = orders.find(o => o.id === id);
        if (order) {
            document.getElementById('orderId').value = order.id;
            document.getElementById('orderDate').value = order.fecha;
            document.getElementById('orderTotal').value = order.total.toFixed(2);
            document.getElementById('orderStatus').value = order.estatus_pago;
            document.getElementById('clientId').value = order.id_clientes;
            new bootstrap.Modal(document.getElementById('orderForm')).show();
        }
    };

    document.getElementById('myOrderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('orderId').value);
        const fecha = document.getElementById('orderDate').value;
        const total = parseFloat(document.getElementById('orderTotal').value);
        const estatus_pago = document.getElementById('orderStatus').value;
        const id_clientes = parseInt(document.getElementById('clientId').value);

        const orderIndex = orders.findIndex(o => o.id === id);
        if (orderIndex > -1) {
            orders[orderIndex] = { id, fecha, total, estatus_pago, id_clientes };
        } else {
            orders.push({ id, fecha, total, estatus_pago, id_clientes });
        }
        renderOrders();
        new bootstrap.Modal(document.getElementById('orderForm')).hide();
    });

    renderOrders();
});
