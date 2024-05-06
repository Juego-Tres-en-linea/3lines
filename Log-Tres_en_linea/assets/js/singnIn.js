import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firebase.js";

const formulario = document.getElementById("formulario-login");
const email = formulario.querySelector('input[type="email"]');
const password = formulario.querySelector('input[type="password"]');

// Eventos

formulario.addEventListener("submit", logUsuario);


// Funciones

async function logUsuario(e) {
    e.preventDefault();


    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log(userCredentials);
    } catch (error) {
        console.log(error);
    }
    
    window.location.href = '?c=Dashboard&m=dashboard';
}
