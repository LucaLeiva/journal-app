// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxHsjg0oiKY4QWq3FppQEOXYDbgAh9XOk",
  authDomain: "pruebas-react-ce1bc.firebaseapp.com",
  projectId: "pruebas-react-ce1bc",
  storageBucket: "pruebas-react-ce1bc.appspot.com",
  messagingSenderId: "418587580780",
  appId: "1:418587580780:web:ba7f291404d256e3a9fb49"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

// aca copiamos la config que esta en la pagina de inicio del proyecto e
// instanciamos la conexion con la app, la autenticacion y la db