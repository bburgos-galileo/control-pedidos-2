const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        regresar: () => ipcRenderer.send('go-index'),
        /*usuarios*/
        validarUsuario: (credenciales) => ipcRenderer.send('valida-usuario', credenciales),
        crearUsuario: (datos) => ipcRenderer.send('crear-usuario', datos),
        /*categorias*/
        mostrarCategorias: () => ipcRenderer.send('tabla-categoria'),
        cargarDatosCategoria: (callback) => ipcRenderer.on('cargarDatosCategoria',callback),
        mostrarUICategoria: (registro) => ipcRenderer.send('mantenimiento-categoria', registro),
        recibirDatosCategoria: (callback) => ipcRenderer.on('recibirDatosCategoria',callback),
        guardarCategoria: (datos) => ipcRenderer.send('guardar-categoria', datos),
        borrarCategoria: (datos) => ipcRenderer.send('eliminar-categoria', datos),
        /* proveedores*/
        mostrarProveedores: () => ipcRenderer.send('tabla-Proveedores'),
        cargarDatosProveedor: (callback) => ipcRenderer.on('cargarDatosProveedor',callback),
        mostrarUIProveedor: (registro) => ipcRenderer.send('mantenimiento-Proveedor', registro),
        recibirDatosProveedor: (callback) => ipcRenderer.on('recibirDatosProveedor',callback),
        guardarProveedor: (datos) => ipcRenderer.send('guardar-Proveedor', datos), 
        borrarProveedor: (datos) => ipcRenderer.send('eliminar-proveedor', datos), 
        /* Productos */      
        mostrarProductos: () => ipcRenderer.send('tabla-Productos'),
        cargarDatosProducto: (callback) => ipcRenderer.on('cargarDatosProducto',callback),
        mostrarUIProducto: (registro) => ipcRenderer.send('mantenimiento-Producto', registro),
        recibirDatosCategoriaProducto: (callback) => ipcRenderer.on('recibirDatosCategoriaProducto',callback),
        recibirDatosProducto: (callback) => ipcRenderer.on('recibirDatosProducto',callback),
        guardarProducto: (datos) => ipcRenderer.send('guardar-Producto', datos),
        borrarProducto: (datos) => ipcRenderer.send('eliminar-producto', datos),
        /* pedidos */      
        mostrarPedidos: () => ipcRenderer.send('tabla-Pedidos'),
        cargarDatosPedidos: (callback) => ipcRenderer.on('cargarDatosPedidos',callback),
        mostrarUIPedidos: () => ipcRenderer.send('mantenimiento-Pedidos'),
        recibirDatosProductosPedidos: (callback) => ipcRenderer.on('recibirDatosProductosPedidos',callback),
        recibirDatosProveedoresPedidos: (callback) => ipcRenderer.on('recibirDatosProveedoresPedidos',callback),
        recibirDatosPedidos: (callback) => ipcRenderer.on('recibirDatosPedidos',callback),
        guardarPedido: (datos) => ipcRenderer.send('guardarPedido', datos)

    });

