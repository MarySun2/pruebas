console.log("Agregado");

// import firebase from "firebase/app";
// import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDm-pUlENsgifuh5l_JWh8qcPmgdTV6Ew0",
    authDomain: "prueba1-cbd49.firebaseapp.com",
    projectId: "prueba1-cbd49",
    storageBucket: "prueba1-cbd49.appspot.com",
    messagingSenderId: "642390832379",
    appId: "1:642390832379:web:16e4e533d631f9994aac5e",
    measurementId: "G-RKETW3YWGZ"
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
    console.log("Document written with ID: ", docRef.id);
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
    document.getElementById("fecha").value = '';
    })

    .catch((error) => {
        console.error("Error adding document: ", error);
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
          <td><button class="btn btn-warning" onclick="editar('${doc.id}')">Editar</button></td>
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
