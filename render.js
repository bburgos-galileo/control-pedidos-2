let registros;
let divBarra = document.getElementById('divBarra');

const datos = localStorage.getItem('correo');

divBarra.innerHTML = `<span class='navbar-text'>Usuario: ${datos}</span>`

window.comunicacion.mostrarPedidos();

window.comunicacion.cargarDatosPedidos(function (event, datos) {

    registros = [...datos];

    $('#tblPedidos').dataTable({
        "data": registros,
        "searching": false,
        "lengthChange": false,
        "columns": [
            { "data": "descripcion" },
            { "data": "categoria" },
            { "data": "proveedor" },
            { "data": "ex_cant" },
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        },
        "lengthMenu": [[5, 10, 20, 50], [5, 10, 20, 50]]
    });

});

document.getElementById('nuevo').addEventListener('click', () => {
    window.comunicacion.mostrarUIPedidos();
});

