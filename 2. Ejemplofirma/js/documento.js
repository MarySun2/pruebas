if (window.opener) {
    document.querySelector("#firma").src = window.opener.obtenerImagen();
    // Imprimir documento. Si no quieres imprimir, remueve la siguiente línea
    window.print();
}