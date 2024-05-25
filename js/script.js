// Configura tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD785S6cHJjqRxHLtJ3zugA6cHutfy_9EM",
    authDomain: "prueba2-ebd2e.firebaseapp.com",
    projectId: "prueba2-ebd2e",
    storageBucket: "prueba2-ebd2e.appspot.com",
    messagingSenderId: "665315151798",
    appId: "1:665315151798:web:f9015e5b4340965edf3b17",
    measurementId: "G-DWN48GL4W9"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia al Storage de Firebase
const storage = firebase.storage();

// Referencia a Firestore
const firestore = firebase.firestore();

// Función para subir archivo PDF a Firebase Storage y guardar el enlace en Firestore
function subirArchivo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor selecciona un archivo.');
        return;
    }

    // Crea una referencia al archivo en el Storage
    const storageRef = storage.ref('archivos/' + file.name);

    // Sube el archivo al Storage
    storageRef.put(file)
        .then((snapshot) => {
            console.log('Archivo subido correctamente.');

            // Obtiene el enlace de descarga del archivo
            return storageRef.getDownloadURL();
        })
        .then((downloadURL) => {
            console.log('Enlace de descarga:', downloadURL);

            // Guarda el enlace de descarga en Firestore
            return firestore.collection('archivos').add({
                nombre: file.name,
                enlace: downloadURL
            });
        })
        .then(() => {
            console.log('Enlace guardado en Firestore.');
            alert('El archivo se ha subido correctamente.');
        })
        .catch((error) => {
            console.error('Error al subir el archivo o guardar el enlace en Firestore:', error);
            alert('Error al subir el archivo.');
        });
}