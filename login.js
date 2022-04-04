let form = document.getElementById('frmLogin');

let correo = document.getElementById('email');
let errCorreo = document.getElementById('divErrMail');
let pass = document.getElementById('password');
var errContraseña = document.getElementById('divErrPassword');

const datos = localStorage.getItem('correo'); 

if (datos) {
    correo.value = datos
}

form.addEventListener('submit', (event) => {

    event.preventDefault()

    if (!correo.checkValidity()) {
        correo.className = "form-control is-invalid"
        divErrMail.className = "invalid-feedback d-block"
    } else {
        correo.className = "form-control is-valid"
        divErrMail.className = "invalid-feedback"
    }

    if (!pass.checkValidity()) {
        pass.className = "form-control is-invalid"
        errContraseña.className = "invalid-feedback d-block"
    } else {
        pass.className = "form-control is-valid"
        errContraseña.className = "invalid-feedback"
    }

    if (form.checkValidity()) {
        window.comunicacion.validarUsuario({correo: correo.value, clave: pass.value});
    }

});
