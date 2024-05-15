// const firebaseConfig = {
//     apiKey: "AIzaSyCyQ9MIcfKW4XONR6eLfqhLPXrIbkxHXf0",
//     authDomain: "engranajecien.firebaseapp.com",
//     projectId: "engranajecien",
//     storageBucket: "engranajecien.appspot.com",
//     messagingSenderId: "246647848226",
//     appId: "1:246647848226:web:996b6034cc04595b22b97b",
//     measurementId: "G-YENP1H7RL1"
// };
// // Inicializar Firebase
// firebase.initializeApp(firebaseConfig);

const $canvas = document.querySelector("#canvas"),
    $btnDescargar = document.querySelector("#btnDescargar"),
    $btnLimpiar = document.querySelector("#btnLimpiar"),
    $btnGenerarDocumento = document.querySelector("#btnGenerarDocumento"),
    $btnGenerarPDF = document.querySelector("#btnGenerarPDF");

const contexto = $canvas.getContext("2d");
const COLOR_PINCEL = "black";
const COLOR_FONDO = "white";
const GROSOR = 2;
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
const obtenerXReal = (clientX) => clientX - $canvas.getBoundingClientRect().left;
const obtenerYReal = (clientY) => clientY - $canvas.getBoundingClientRect().top;
let haComenzadoDibujo = false; // Bandera que indica si el usuario está presionando el botón del mouse sin soltarlo

const limpiarCanvas = () => {
    // Colocar color blanco en fondo de canvas
    contexto.fillStyle = COLOR_FONDO;
    contexto.fillRect(0, 0, $canvas.width, $canvas.height);
};
limpiarCanvas();
$btnLimpiar.onclick = limpiarCanvas;

// Escuchar clic del botón para descargar el canvas
$btnDescargar.onclick = () => {
    const enlace = document.createElement('a');
    // El título
    enlace.download = "Firma.png";
    // Convertir la imagen a Base64 y ponerlo en el enlace
    enlace.href = $canvas.toDataURL();
    // Hacer click en él
    enlace.click();
};

window.obtenerImagen = () => {
    return $canvas.toDataURL();
};

$btnGenerarDocumento.onclick = () => {
    window.open("documento.html");
};

$btnGenerarPDF.onclick = () => {
    // Crear instancia de html2pdf
    const element = document.getElementById("contenido-a-pdf");
    html2pdf().from(element).save();

    // Guardar en Firebase
    const storageRef = firebase.storage().ref();
    const pdfFile = element.toDataURL('application/pdf');
    const metadata = {
        contentType: 'application/pdf'
    };
    const uploadTask = storageRef.child('nombre_del_archivo.pdf').putString(pdfFile, 'data_url', metadata);

    uploadTask.on('state_changed',
        null,
        error => {
            console.error('Error al guardar en Firebase:', error);
        },
        () => {
            console.log('PDF guardado en Firebase.');
        }
    );
};

const onClicOToqueIniciado = evento => {
    // En este evento solo se ha iniciado el clic, así que dibujamos un punto
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.fillStyle = COLOR_PINCEL;
    contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
    contexto.closePath();
    // Y establecemos la bandera
    haComenzadoDibujo = true;
}

const onMouseODedoMovido = evento => {
    evento.preventDefault(); // Prevenir scroll en móviles
    if (!haComenzadoDibujo) {
        return;
    }
    // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo
    let target = evento;
    if (evento.type.includes("touch")) {
        target = evento.touches[0];
    }
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(target.clientX);
    yActual = obtenerYReal(target.clientY);
    contexto.beginPath();
    contexto.moveTo(xAnterior, yAnterior);
    contexto.lineTo(xActual, yActual);
    contexto.strokeStyle = COLOR_PINCEL;
    contexto.lineWidth = GROSOR;
    contexto.stroke();
    contexto.closePath();
}

const onMouseODedoLevantado = () => {
    haComenzadoDibujo = false;
};

// Lo demás tiene que ver con pintar sobre el canvas en los eventos del mouse
["mousedown", "touchstart"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, onClicOToqueIniciado);
});

["mousemove", "touchmove"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, onMouseODedoMovido);
});
["mouseup", "touchend"].forEach(nombreDeEvento => {
    $canvas.addEventListener(nombreDeEvento, onMouseODedoLevantado);
});