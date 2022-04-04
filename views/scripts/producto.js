let form = document.getElementById('frmProducto');
let desc = document.getElementById('descripcion');
let categoria = document.getElementById('categoria');
let existencia = document.getElementById('existencia');
let divErrDescripcion = document.getElementById('divErrDescripcion');
let divErrCategoria = document.getElementById('divErrCategoria');
let divErrExistencia = document.getElementById('divErrExistencia');

let id;


window.comunicacion.recibirDatosCategoriaProducto(function (event, datos) {
    datos.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.idCategoria;
        opt.innerHTML = item.descripcion;
        categoria.appendChild(opt);
    });
});

window.comunicacion.recibirDatosProducto(function (event, datos) {
    id = datos.idProducto;
    desc.value = datos.descripcion;
    categoria.value = datos.idCategoria;
    existencia.value = datos.existencia;
});

form.addEventListener('submit', (event) => {

    event.preventDefault()

    if (!desc.checkValidity()) {
        desc.className = "form-control is-invalid"
        divErrDescripcion.className = "invalid-feedback d-block"
    } else {
        desc.className = "form-control is-valid"
        divErrExistencia.className = "invalid-feedback"
    }

    if (!categoria.checkValidity()) {
        categoria.className = "form-control is-invalid"
        divErrCategoria.className = "invalid-feedback d-block"
    } else {
        categoria.className = "form-control is-valid"
        divErrCategoria.className = "invalid-feedback"
    }

    if (!existencia.checkValidity()) {
        existencia.className = "form-control is-invalid"
        divErrExistencia.className = "invalid-feedback d-block"
    } else {
        existencia.className = "form-control is-valid"
        divErrExistencia.className = "invalid-feedback"
    }

    if (form.checkValidity()) {
        window.comunicacion.guardarProducto({ idProducto: id, descripcion: descripcion.value, idCategoria: categoria.value, existencia: existencia.value });
    }
});