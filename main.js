const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const { localStorage } = require('electron-browser-storage');
const mysql = require('mysql2')
const path = require('path');
const bcrypt = require('bcrypt');
const { title } = require('process');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventario'
})

// main window
let mainWindow = null
let mainMenu = null
let child = null;

app.on('ready', () => {
    // don't show the main window
    mainWindow = new BrowserWindow({
        show: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: 'Pedidos',
        webPreferences: {
            preload: path.join(app.getAppPath(), '/preload/preload.js')
        },
    });

    // load index.html on the main window
    mainWindow.loadURL(`file://${__dirname}/login.html`)

    // when the app is ready, the main window is showed
    mainWindow.once('ready-to-show', async () => {
        mainWindow.show()
        //list_users()
    })

    // close the app
    mainWindow.on('closed', () => {
        mainWindow = null
        localStorage.clear();
    })

    // Build menu from template
    mainMenu = Menu.buildFromTemplate(mainMenuTempale)
    mainWindow.setMenuBarVisibility(false)



})

// menu items
// create menu template 
const mainMenuTempale = [
    {
        label: 'Mantenimiento',
        submenu: [
            {
                label: 'Categorias',
                click() {

                    mainWindow.setMenuBarVisibility(false)
                    mainWindow.loadURL(`file://${__dirname}/views/categorias.html`)

                }
            },
            {
                label: 'Proveedores',
                click() {

                    mainWindow.setMenuBarVisibility(false)
                    mainWindow.loadURL(`file://${__dirname}/views/proveedor.html`)

                }
            },
            {
                label: 'Productos',
                click() {
                    mainWindow.setMenuBarVisibility(false)
                    mainWindow.loadURL(`file://${__dirname}/views/productos.html`)
                }
            }
        ]
    }
]

ipcMain.on('go-index', async () => {
    mainWindow.loadURL(`file://${__dirname}/render.html`)
    mainWindow.setMenuBarVisibility(true);
});

ipcMain.on('crear-usuario', async (event, datos) => {

    hashIt(datos.clave).then((password) => {
        connection.promise().query('INSERT INTO usuarios(idusuario, nombre, correo, clave) values(null,?,?,?)', [datos.nombre, datos.correo, password])
            .then(([results, fields]) => {

                showMessage('Registro de Usuarios', 'El usuario fue creado correctamente', 'Ahora puede ingresar utilizando el correo ' + datos.correo)
                    .then(() => {
                        setUser(datos.correo).then(() => mainWindow.loadURL(`file://${__dirname}/login.html`))
                    })

            }).catch((e) => {
                if (e.code == 'ER_DUP_ENTRY') {

                    showErrorMessage('Registro', 'Nombre de usuario ya registrado', 'Verifique sus datos').then(() => {
                        console.log("Error");
                    })
                }
            });
    });

});

ipcMain.on('valida-usuario', async (event, credenciales) => {

    connection.promise().query('select * from usuarios where correo = ?', [credenciales.correo])
        .then(([results, fields]) => {
            if (results[0]) {
                validatePassword(results[0].clave, credenciales.clave).then((validar) => {
                    if (validar) {
                        setUser(credenciales.correo).then(() => {
                            mainWindow.loadURL(`file://${__dirname}/render.html`)
                            Menu.setApplicationMenu(mainMenu);
                            mainWindow.setMenuBarVisibility(true);
                        });
                    } else {
                        showErrorMessage('Registro', 'Verifique', 'Las credenciales ingresada no son validas').then(() => {
                            console.log("Error");
                        });
                    }
                });
            } else {
                showErrorMessage('Registro', 'Verifique', 'Usuario no registrado').then(() => {
                    console.log("Error");
                })
            }
        });

});
/* Categorias */
ipcMain.on('tabla-categoria', async () => {

    connection.promise().query('SELECT * FROM categoria')
        .then(([results, fields]) => {
            if (results) {
                mainWindow.webContents.send('cargarDatosCategoria', results)
            }
        });

});

ipcMain.on('mantenimiento-categoria', async (event, arg) => {

    console.log(arg);

    child = new BrowserWindow({
        width: 450,
        height: 300,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: 'Mantenimiento de Categorias de Productos',
        movable: false,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), '/preload/preload.js')
        },
    })

    child.loadURL(`file://${__dirname}/views/categoriasIU.html`)

    // when the app is ready, the modal window is showed
    child.once('ready-to-show', async () => {
        child.show();
        child.webContents.send('recibirDatosCategoria', arg[0])
    });

    child.setMenuBarVisibility(false);

})

ipcMain.on('guardar-categoria', async (event, datos) => {

    if (datos.idCategoria == 0) {
        console.log('agregando');
        connection.promise().query('INSERT INTO categoria (idCategoria, descripcion) values(null,?)', [datos.descripcion])
            .then(([results, fields]) => {
                showMessage('Registros', 'Categorias', 'El registro fue creado correctamente')
                    .then(() => {
                        child.close();
                        mainWindow.loadURL(`file://${__dirname}/views/categorias.html`);
                    })

            });
    } else {
        console.log('actualizando')
        connection.promise().query('UPDATE categoria SET descripcion = ? WHERE idCategoria = ?', [datos.descripcion, datos.idCategoria])
            .then(([results, fields]) => {
                showMessage('Registros', 'Categorias', 'El registro fue actualizado correctamente')
                    .then(() => {
                        child.close();
                        mainWindow.loadURL(`file://${__dirname}/views/categorias.html`);
                    })

            });
    }


});

ipcMain.on('eliminar-categoria', async (event, datos) => {

    showConfirmMessage('Registros', 'Esta seguro de elimnar la categoria ' + datos[0].descripcion)
        .then((response) => {
            if (response.response == 0) {
                connection.promise().query('DELETE FROM categoria WHERE idCategoria = ?', [datos[0].idCategoria])
                    .then(([results, fields]) => {
                        if (results) {
                            mainWindow.loadURL(`file://${__dirname}/views/categorias.html`);
                        }
                    })
                    .catch((err) => {
                        showErrorMessage('Registro', 'No se puede eliminar', 'La categoría esta asociada a un producto').then(() => {
                            console.log("Error");
                        })
                    });
            }
        })
});

/* proveedores */
ipcMain.on('tabla-Proveedores', async () => {

    connection.promise().query('SELECT * FROM proveedores')
        .then(([results, fields]) => {
            if (results) {
                mainWindow.webContents.send('cargarDatosProveedor', results)
            }
        });

});

ipcMain.on('mantenimiento-Proveedor', async (event, arg) => {

    

    child = new BrowserWindow({
        width: 450,
        height: 300,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: 'Mantenimiento de Proveedores',
        movable: false,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), '/preload/preload.js')
        },
    })

    child.loadURL(`file://${__dirname}/views/proveedoresIU.html`)

    // when the app is ready, the modal window is showed
    child.once('ready-to-show', async () => {
        child.show();
        child.webContents.send('recibirDatosProveedor', arg[0])
    });

    child.setMenuBarVisibility(false);

})

ipcMain.on('guardar-Proveedor', async (event, datos) => {

    if (datos.idProveedor == 0) {
        connection.promise().query('INSERT INTO proveedores (idProveedor, nombre) values(null,?)', [datos.nombre])
            .then(([results, fields]) => {
                showMessage('Registros', 'Proveedores', 'El registro fue creado correctamente')
                    .then(() => {
                        child.close();
                        mainWindow.loadURL(`file://${__dirname}/views/proveedor.html`);
                    })

            });
    } else {
        connection.promise().query('UPDATE proveedores SET nombre = ? WHERE idProveedor = ?', [datos.nombre, datos.idProveedor])
            .then(([results, fields]) => {
                showMessage('Registros', 'Proveedores', 'El registro fue actualizado correctamente')
                    .then(() => {
                        child.close();
                        mainWindow.loadURL(`file://${__dirname}/views/proveedor.html`);
                    })

            });
    }


});

ipcMain.on('eliminar-proveedor', async (event, datos) => {

    showConfirmMessage('Registros', 'Esta seguro de eliminar el proveedor ' + datos[0].nombre)
        .then((response) => {
            if (response.response == 0) {
                connection.promise().query('DELETE FROM proveedores WHERE idProveedor = ?', [datos[0].idProveedor])
                    .then(([results, fields]) => {
                        if (results) {
                            mainWindow.loadURL(`file://${__dirname}/views/proveedor.html`);
                        }
                    })
                    .catch((err) => {
                        showErrorMessage('Registro', 'No se puede eliminar', 'El proveedor tiene pedidos').then(() => {
                            console.log("Error");
                        })
                    });
            }
        })
});

/* productos */
ipcMain.on('tabla-Productos', async () => {

    connection.promise().query('SELECT p.idProducto, p.descripcion, c.idCategoria, c.descripcion categoria, p.existencia FROM productos p inner join categoria c on p.idCategoria = c.idCategoria')
        .then(([results, fields]) => {
            if (results) {
                mainWindow.webContents.send('cargarDatosProducto', results)
            }
        });

});

ipcMain.on('mantenimiento-Producto', async (event, arg) => {

    child = new BrowserWindow({
        width: 450,
        height: 450,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: 'Mantenimiento de Productos',
        movable: false,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), '/preload/preload.js')
        },
    })

    child.loadURL(`file://${__dirname}/views/productoIU.html`)

    // when the app is ready, the modal window is showed
    child.once('ready-to-show', async () => {

        connection.promise().query('SELECT * FROM categoria')
            .then(([results, fields]) => {
                if (results) {
                    child.show();
                    child.webContents.send('recibirDatosCategoriaProducto', results);
                    child.webContents.send('recibirDatosProducto', arg[0]);
                }
            });

    });

    child.setMenuBarVisibility(false);

})

ipcMain.on('guardar-Producto', async (event, datos) => {

    if (datos.idProducto == 0) {
        connection.promise().query('INSERT INTO productos (idProducto, descripcion, idCategoria, existencia) values(null,?,?,?)', [datos.descripcion, datos.idCategoria, datos.existencia])
            .then(([results, fields]) => {
                showMessage('Registros', 'Productos', 'El registro fue creado correctamente')
                    .then(() => {
                        child.close();
                        mainWindow.loadURL(`file://${__dirname}/views/productos.html`);
                    })

            });
    } else {
        connection.promise().query('UPDATE productos SET descripcion = ?, idCategoria = ?, existencia = ? WHERE idProducto = ?', [datos.descripcion, datos.idCategoria, datos.existencia, datos.idProducto])
            .then(([results, fields]) => {
                showMessage('Registros', 'Productos', 'El registro fue actualizado correctamente')
                    .then(() => {
                        child.close();
                        mainWindow.loadURL(`file://${__dirname}/views/productos.html`);
                    })

            });
    }


});

ipcMain.on('eliminar-producto', async (event, datos) => {

    showConfirmMessage('Registros', 'Esta seguro de eliminar el producto ' + datos[0].descripcion)
        .then((response) => {
            if (response.response == 0) {
                connection.promise().query('DELETE FROM productos WHERE idProducto = ?', [datos[0].idProducto])
                    .then(([results, fields]) => {
                        if (results) {
                            mainWindow.loadURL(`file://${__dirname}/views/productos.html`);
                        }
                    })
                    .catch((err) => {
                        showErrorMessage('Registro', 'No se puede eliminar', 'El producto tiene pedidos').then(() => {
                            console.log("Error");
                        })
                    });
            }
        })
});

/* pedidos */

ipcMain.on('tabla-Pedidos', async () => {
    connection.promise().query('SELECT * FROM vw_pedidos order by cant_pedida desc')
        .then(([results, fields]) => {
            if (results) {
                mainWindow.webContents.send('cargarDatosPedidos', results)
            }
        });

});

ipcMain.on('mantenimiento-Pedidos', async () => {

    child = new BrowserWindow({
        width: 450,
        height: 450,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: 'Ingreso de Pedidos',
        movable: false,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            preload: path.join(app.getAppPath(), '/preload/preload.js')
        },
    })

    child.loadURL(`file://${__dirname}/views/pedidosIU.html`)

    // when the app is ready, the modal window is showed
    child.once('ready-to-show', async () => {

        connection.promise().query('SELECT * FROM productos')
            .then(([results, fields]) => {
                if (results) {
                    child.show();
                    child.webContents.send('recibirDatosProductosPedidos', results);
                    connection.promise().query('SELECT * FROM proveedores')
                        .then(([results, fields]) => {
                            if (results) {
                                child.webContents.send('recibirDatosProveedoresPedidos', results);
                            }
                        });
                }
            });

    });

    child.setMenuBarVisibility(false);

})

ipcMain.on('guardarPedido', async (event, datos) => {

    connection.promise().query('SELECT * FROM pedidos where idProducto = ? and idProveedor = ?', [datos.idProducto, datos.idProveedor])
        .then(([results, fields]) => {
            if (results[0]) {
                showErrorMessage('Registros', 'Pedidos', 'El producto ya tiene registrado un pedido para el proveedor seleccionado');
            } else {
                connection.promise().query('INSERT INTO pedidos (idPedidos, idProducto, idProveedor, cantidad) values(null,?,?,?)', [datos.idProducto, datos.idProveedor, datos.cantidad])
                    .then(([results, fields]) => {
                        showMessage('Registros', 'Pedidos', 'El registro fue creado correctamente')
                            .then(() => {
                                child.close();
                                mainWindow.loadURL(`file://${__dirname}/render.html`);
                            })
                    });
            }
        });

});

async function hashIt(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

async function setUser(correo) {
    await localStorage.setItem('correo', correo);
}


async function showMessage(titulo, mensaje, detalle) {

    const options = {
        type: 'info',
        title: titulo,
        message: mensaje,
        detail: detalle
    }

    return dialog.showMessageBox(mainWindow, options);

}

async function showErrorMessage(titulo, mensaje, detalle) {

    const options = {
        type: 'error',
        title: titulo,
        message: mensaje,
        detail: detalle
    }

    return dialog.showMessageBox(mainWindow, options);
}

async function showConfirmMessage(titulo, mensaje) {

    const options = {
        type: 'question',
        buttons: ["Si", "No", "Cancelar"],
        title: titulo,
        message: mensaje
    }

    return dialog.showMessageBox(mainWindow, options);
}

async function validatePassword(claveDB, claveInput) {
    const match = bcrypt.compareSync(claveInput, claveDB);
    return match;
}