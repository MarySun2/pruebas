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

//Agregamos Documentos
db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
