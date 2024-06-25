//Variables
const url = 'http://localhost:3000/apiGame';
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSubmit = document.querySelector('button');
const formulario = document.querySelector('.mensaje');
const btnStats = document.querySelector('.stats');
const btnHistory = document.querySelector('.history');
const btnGame = document.querySelector('.game');
const btnSala = document.querySelector('.sala');
const btnLocal = document.querySelector('.local');

//eventos
btnSubmit.addEventListener('click', iniciarSesion);
if (btnStats || btnHistory || btnGame) {
    btnStats.addEventListener('click', verEstadísticas);
    btnHistory.addEventListener('click', verHistorial);
    btnGame.addEventListener('click', opcionesJuego);
}
btnLocal.addEventListener('click', enviarLocal);
btnSala.addEventListener('click', enviarSala)
//Funciones 
function iniciarSesion() {
    const user = {
        email: email.value,
        password: password.value
    }
    const empty = Object.values(user).every(user => user != '');
    if(!empty) {
        imprimirAlerta("Debe llenar todos los campos", "error");
        return;
    }
    if(user.email.length < 10) {
        imprimirAlerta("El email debe tener min. 10 caracteres", 'error');
        return
    } else if (user.password.length < 7) {
        imprimirAlerta("Contraseña mínimo de 7 caracteres", 'error');
        return
    }
    login(user);
}

async function login(user) {
    try {
        const request = await fetch(`${url}/user/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        if (response.message == "TypeError: Cannot read properties of null (reading 'dataValues')") {
            imprimirAlerta("El email no se encuentra registrado", "error");
            return;
        }
        if (response.error == "Invalid credentials") {
            imprimirAlerta("El email y la contraseña no coinciden", "error");
            return;
        }
        if (response.status == 200) {
            imprimirAlerta("Bienvenido");
            guardarIdLocalStorage(response.id)
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

function guardarIdLocalStorage(id) {
    localStorage.setItem("id", `${id}`);
    setTimeout(() => {
        location.href = "stats.html";
    }, 2500);
}


function verEstadísticas() {
    location.href = "detail-stats.html";
}

function verHistorial() {
    location.href = "detail-history.html";
}

function opcionesJuego() {
    const activo = document.querySelector('.activo');
    const btnOptions = document.querySelectorAll('.opt');
    if(!activo) {
        btnOptions.forEach(btn => {
            btn.classList.add('activo');
            btn.style.transform = "translateY(0px)"
        });
    } else {
        btnOptions.forEach(btn => {
            btn.classList.remove('activo');
            btn.style.transform = "translateY(-46px)"
        });
    }
}

function enviarLocal() {
    location.href = "index.html"
}

function enviarSala() {
    urlSala = 'http://localhost:3000/apiGame'
    location.href = "sala.html"

}