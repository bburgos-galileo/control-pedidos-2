let form = document.getElementById('frmRegistro');
let nombre = document.getElementById('nombre');
let correo = document.getElementById('correo');
let pass = document.getElementById('password');
let pass2 = document.getElementById('password2');


let divErrNombre = document.getElementById('divErrNombre');
let divErrMail = document.getElementById('divErrMail');
let divErrPass = document.getElementById('divErrPass');
let divErrPass2 = document.getElementById('divErrPass2');

let expMay = RegExp("[A-Z]")
let expMin = RegExp("[a-z]")
let expNum = RegExp("[0-9]")
let expPass = RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}")

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

form.addEventListener('submit', (event) => {

    event.preventDefault();

    let error = ""

    if (!nombre.checkValidity()) {
        nombre.className = "form-control is-invalid"
        divErrNombre.className = "invalid-feedback d-block"
    } else {
        nombre.className = "form-control is-valid"
        divErrNombre.className = "invalid-feedback"
    }

    if (!validateEmail(correo.value)) {
        correo.className = "form-control is-invalid"
        divErrMail.className = "invalid-feedback d-block"
        if (!correo.value == '') {
            divErrMail.innerHTML = "El correo ingresado es invalido"
        } else {
            divErrMail.innerHTML = "El correo es un dato requerido"
        }
    } else {
        correo.className = "form-control is-valid"
        divErrMail.className = "invalid-feedback"
    }

    //valida contraseña


    pass.setCustomValidity('');

    if (!pass.checkValidity()) {
        pass.className = "form-control is-invalid"
        divErrPass.className = "invalid-feedback d-block"
        divErrPass.innerHTML = "El  password es un datos requerido"
    } else {

        error = '';

        if (!pass.value.match(expMay)) {
            error += "Debe tener una mayúscula\n"
        } if (!pass.value.match(expMin)) {
            error += "Debe tener una minúscula\n"
        } if (!pass.value.match(expNum)) {
            error += "Debe tener un número"
        }

        if (error == "") {
            pass.className = "form-control is-valid"
            divErrPass.className = "invalid-feedback"
        } else {
            pass.className = "form-control is-invalid"
            divErrPass.className = "invalid-feedback d-block"
            divErrPass.innerHTML = error;
            pass.setCustomValidity('Clave Invalida');
        }
    }

    pass2.setCustomValidity('');

    if (!pass2.checkValidity()) {
        pass2.className = "form-control is-invalid"
        divErrPass2.className = "invalid-feedback d-block"
        divErrPass2.innerHTML = "El password es un datos requerido"
    } else {

        error = '';

        if (!pass2.value.match(expMay)) {
            error += "Debe tener una mayúscula\n"
        } if (!pass2.value.match(expMin)) {
            error += "Debe tener una minúscula\n"
        } if (!pass2.value.match(expNum)) {
            error += "Debe tener un número"
        }

        if (error == '') {
            pass2.className = "form-control is-valid"
            divErrPass2.className = "invalid-feedback"
        } else {
            pass2.className = "form-control is-invalid"
            divErrPass2.className = "invalid-feedback d-block"
            divErrPass2.innerHTML = error;
            pass2.setCustomValidity('Clave Invalida');
        }
    }

    if (pass.checkValidity() && pass2.checkValidity()) {
        if (pass.value != pass2.value) {
            pass2.className = "form-control is-invalid"
            divErrPass2.className = "invalid-feedback d-block"
            divErrPass2.innerHTML = "La clave de confirmación no coicide, verifique";
            pass2.setCustomValidity('Las claves no coinciden');
        }
    }

    if (form.checkValidity()) {
        window.comunicacion.crearUsuario({ nombre: nombre.value, correo: correo.value, clave: pass.value });
    }

});