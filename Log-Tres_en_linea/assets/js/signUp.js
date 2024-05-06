import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "./firebase.js";

//variables
const formulario = document.getElementById("formulario-register");
const url = "https://api-users-6a304-default-rtdb.firebaseio.com/api/users.json";
const name = formulario.querySelector('#name');
const phone = formulario.querySelector('#phone');
const documento = formulario.querySelector('#document');
const email = formulario.querySelector('input[type="email"]');
const password = formulario.querySelector('input[type="password"]');


// Eventos

formulario.addEventListener("submit", registrarUsuario);


// Funciones

async function registrarUsuario(e) {
    e.preventDefault();


    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log(userCredentials);
    } catch (error) {
        console.log(error);
    }

    sentDataApi();    

}

async function sentDataApi() {
    const user = {
        nombre: name.value,
        telefono: phone.value,
        documento: documento.value,
        email: email.value,
        password: password.value,
        estado: "Activo",
        id: 5

    }
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (error) {
        console.log(error)
    }
}
