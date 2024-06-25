//Variables
const url = 'http://localhost:3000/apiGame';
const email = document.querySelector('#email');
const nombre = document.querySelector("#name");
const password = document.querySelector('#password');
const btnSubmit = document.querySelector('button');
const formulario = document.querySelector('.mensaje');

//eventos
btnSubmit.addEventListener('click', registrarUsuario);


//Funciones
function registrarUsuario() {
    const user = {
        user_email: email.value,
        user_name: nombre.value,
        user_password: password.value,
        status: 1,
        role: 2
    }
    const empty = Object.values(user).every(user => user != '');
    if(!empty) {
        imprimirAlerta("Debe llenar todos los campos", "error");
        return;
    }
    if(user.user_password.length < 7) {
        imprimirAlerta("La contraseña debe mínimo 7 caracteres", 'error');
        return
    } else if (user.user_email.length < 10) {
        imprimirAlerta("El email debe tener min. 10 caracteres", 'error');
        return
    }
    createUser(user);
}

async function createUser(user) {
    try {
        const request = await fetch(`${url}/user`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        if (response.status == 500) {
            imprimirAlerta("El correo ya se encuentra registrado", "error");
            return
        } else if(response.status == 201) {
            imprimirAlerta("Usuario creado correctamente");
            setTimeout(() => {
                location.href = "login.html";
            }, 2500);
        }
    } catch (error) {
        console.log(error)
    }
}

function imprimirAlerta(mensaje, tipo) {
    const alerta = document.querySelector('.alerta');

    if(!alerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('mb-0', 'text-center', 'alerta')
        if(tipo) {
            divMensaje.classList.add('alert', 'alert-danger', 'text-danger');
        }else {
            divMensaje.classList.add('alert', 'alert-success')
        }
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje);
    
        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }
}