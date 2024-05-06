import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { auth, db } from "../app/firebase.js";
import * as FunApp from "../app/functions.js";

const idInputPasswordRP = 'repeatPassword';
const idInputPassword = 'password';
const btnPasswordRP = document.getElementById('btn-passwordRP');
const btnPassword = document.getElementById('btn-password');
const objForm = document.getElementById('formUser');
const objFormPasswordRecover = document.getElementById('formPasswordRecover');
const objFormLogin = document.getElementById('formLogin');

// Evento para el botón de password
if (btnPassword) {
    btnPassword.addEventListener('click', (e) => {
        FunApp.viewText(idInputPassword);
    });
}

// Evento para el botón de recuperar contraseña
if (btnPasswordRP) {
    btnPasswordRP.addEventListener('click', (e) => {
        FunApp.viewText(idInputPasswordRP);
    });
}

// Evento para el formulario de creación de usuario
if (objForm) {
    objForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let jsonUser = FunApp.sendData(objForm.id);
        if (typeof jsonUser.password !== 'undefined' && typeof jsonUser.user !== 'undefined') {
            try {
                let pass = jsonUser.password;
                let user = (jsonUser.user).toLowerCase();
                let name = jsonUser.name;
                let phone = jsonUser.phone;

                // Crear usuario en Firebase Authentication
                const userCredentials = await createUserWithEmailAndPassword(auth, user, pass);

                // Crear datos adicionales en Realtime Database
                const userDataRef = ref(db, 'users/' + userCredentials.user.uid);
                await set(userDataRef, {
                    email: userCredentials.user.email,
                    name: name,
                    phone: phone
                });
                
                console.log('User data saved to Realtime Database.');
                alert("User Create");
                FunApp.cleanForm(objForm);
            }
            catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode);
                console.error(errorMessage);
                alert("Validate the data entered");
            }
        } else {
            alert("Validate the data entered");
        }
    });
}

if (objFormPasswordRecover)
    objFormPasswordRecover.addEventListener("submit", async (e) => {
        e.preventDefault();
        let jsonUser = FunApp.sendData(objFormPasswordRecover.id);

        if (typeof jsonUser.user !== 'undefined') {
            try {
                let user = (jsonUser.user).toLowerCase();
                const userCredentials = await sendPasswordResetEmail(auth, user).then((data) => {
                    console.log(data);
                    alert("Password reset email sent!");
                    FunApp.cleanForm(objFormPasswordRecover);
                });
                console.log(userCredentials);

            }
            catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode);
                console.error(errorMessage);
                alert("Validate the data entered");
            }
        } else {
            alert("Validate the data entered");
        }

    });


if (objFormLogin)
    objFormLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        let jsonUser = FunApp.sendData(objFormLogin.id);
        if (typeof jsonUser.password !== 'undefined' && typeof jsonUser.user !== 'undefined') {
            try {
                let pass = jsonUser.password;
                let user = (jsonUser.user).toLowerCase();
                const userCredentials = await signInWithEmailAndPassword(auth, user, pass).then((userCredential) => {
                    console.log(userCredential.user);
                    alert("User Login");
                });

            }
            catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode);
                console.error(errorMessage);
                alert("Validate the data entered");
            }
        } else {
            alert("Validate the data entered");
        }

    });