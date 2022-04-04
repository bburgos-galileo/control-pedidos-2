let form = document.getElementById('frmProveedor');
let nombre = document.getElementById('nombre');
let divErrNombre = document.getElementById('divErrNombre');
let id;

window.comunicacion.recibirDatosProveedor(function (event, datos) {
    id = datos.idProveedor;
    nombre.value = datos.nombre;
});

form.addEventListener('submit', (event) => {

    event.preventDefault()

    if (!nombre.checkValidity()) {
        nombre.className = "form-control is-invalid"
        divErrNombre.className = "invalid-feedback d-block"
    } else {
        nombre.className = "form-control is-valid"
        divErrNombre.className = "invalid-feedback"
    }

    if (form.checkValidity()) {
        window.comunicacion.guardarProveedor({ idProveedor: id, nombre: nombre.value });
    }
});