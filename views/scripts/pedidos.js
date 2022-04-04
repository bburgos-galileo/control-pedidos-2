let form = document.getElementById('frmPedido');

let producto = document.getElementById('producto');
let proveedor = document.getElementById('proveedor');
let cantidad = document.getElementById('cantidad');

let divErrProducto = document.getElementById('divErrProducto');
let divErrProveedor = document.getElementById('divErrProveedor');
let divErrCantidad = document.getElementById('divErrCantidad');

window.comunicacion.recibirDatosProductosPedidos(function (event, datos) {
    datos.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.idProducto;
        opt.innerHTML = item.descripcion;
        producto.appendChild(opt);
    });
});

window.comunicacion.recibirDatosProveedoresPedidos(function (event, datos) {
    datos.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.idProveedor;
        opt.innerHTML = item.nombre;
        proveedor.appendChild(opt);
    });
});

form.addEventListener('submit', (event) => {

    event.preventDefault()

    if (!producto.checkValidity()) {
        producto.className = "form-control is-invalid"
        divErrProducto.className = "invalid-feedback d-block"
    } else {
        producto.className = "form-control is-valid"
        divErrProducto.className = "invalid-feedback"
    }

    if (!proveedor.checkValidity()) {
        proveedor.className = "form-control is-invalid"
        divErrProveedor.className = "invalid-feedback d-block"
    } else {
        proveedor.className = "form-control is-valid"
        divErrProveedor.className = "invalid-feedback"
    }

    if (!cantidad.checkValidity()) {
        cantidad.className = "form-control is-invalid"
        divErrCantidad.className = "invalid-feedback d-block"
    } else {
        cantidad.className = "form-control is-valid"
        divErrCantidad.className = "invalid-feedback"
    }

    if (form.checkValidity()) {
        window.comunicacion.guardarPedido({ idProducto: producto.value, idProveedor: proveedor.value, cantidad: cantidad.value });
    }
});