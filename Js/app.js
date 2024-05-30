console.log("Agregado");

// import firebase from "firebase/app";
// import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyD785S6cHJjqRxHLtJ3zugA6cHutfy_9EM",
    authDomain: "prueba2-ebd2e.firebaseapp.com",
    projectId: "prueba2-ebd2e",
    storageBucket: "prueba2-ebd2e.appspot.com",
    messagingSenderId: "665315151798",
    appId: "1:665315151798:web:f9015e5b4340965edf3b17",
    measurementId: "G-DWN48GL4W9"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

//Funciones
function guardar() {
    // Dom 
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var fecha = document.getElementById("fecha").value;

    //Agregar Documentos
    db.collection("users").add({
        first: nombre,
        last: apellido,
        born: fecha
    })
    .then((docRef) => {
    //console.log("Document written with ID: ", docRef.id);
    MsnOK();
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
    document.getElementById("fecha").value = '';
    })

    .catch((error) => {
        //console.error("Error adding document: ", error);
        MsnERROR();
    });   
}

//Funcion botones 
//Correcto
const MsnOK =()=> {
Swal.fire({
    title: "Good job!",
    text: "Se ha Guardado Correctamente!",
    icon: "success"
  });
}
//Error
const MsnERROR =()=> {
Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Algo salio mal Intentelo mas tarde!",
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}
//Leer Documentos
var tabla = document.getElementById('tabla'); 
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = ''; // parte la tabla basia 
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', ${doc.data().born})">Editar</button></td>
        </tr>
        `
    });  
});

// borrar Documentos se aggrego una funcion
function eliminar(id) {
    db.collection("users").doc(id).delete().then (function()  {
        console.log("Document successfully deleted!");
    }).catch(function(error){
        console.error("Error removing document: ", error);
    });
}

function editar(id, nombre, apellido, fecha) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    // Función para editar los datos
    boton.onclick = function() {
        var washingtonRef = db.collection("users").doc(id);
        var nuevoNombre = document.getElementById('nombre').value;
        var nuevoApellido = document.getElementById('apellido').value;
        var nuevaFecha = document.getElementById('fecha').value;

        // Actualizar los datos en Firestore
        return washingtonRef.update({
                first: nuevoNombre,
                last: nuevoApellido,
                born: nuevaFecha
            })
            .then(function() {
                console.log("¡Documento actualizado exitosamente!");
                boton.innerHTML = 'Guardar';
                // Limpiar los campos después de actualizar
                document.getElementById("nombre").value = '';
                document.getElementById("apellido").value = '';
                document.getElementById("fecha").value = '';
            })
            .catch(function(error) {
                console.error("Error al actualizar el documento: ", error);
            });
    }
}
