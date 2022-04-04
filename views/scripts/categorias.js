let form = document.getElementById('frmCategoria');
let desc = document.getElementById('descripcion');
let divErrDescripcion = document.getElementById('divErrDescripcion');
let id;

window.comunicacion.recibirDatosCategoria(function (event, datos) {
    id = datos.idCategoria;
    desc.value = datos.descripcion;
});

form.addEventListener('submit', (event) => {

    event.preventDefault()

    if (!desc.checkValidity()) {
        desc.className = "form-control is-invalid"
        divErrDescripcion.className = "invalid-feedback d-block"
    } else {
        desc.className = "form-control is-valid"
        divErrDescripcion.className = "invalid-feedback"
    }

    if (form.checkValidity()) {
        window.comunicacion.guardarCategoria({ idCategoria: id, descripcion: desc.value });
    }
});