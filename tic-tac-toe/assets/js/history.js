const url = 'http://localhost:3000/apiGame';
const id = localStorage.getItem("id");
const tbody = document.querySelector('.d-history .table tbody');
const table = document.querySelector('.d-history .table');
const title = document.querySelector('.d-history h1');

async function consumirEstadisticas() {
    try {
        const request = await fetch(`${url}/gameHistory/${id}`);
        const response = await request.json();
        console.log(response.body);
        if(response.body.length != 0) {
            llenarTabla(response.body);
        } else {
            mostrarMensaje();
        }
    } catch (error) {
        console.log(error);
    }
}

consumirEstadisticas();


function llenarTabla(history) {
    history.forEach(async (users) => {
        const {gameHistory_user1, gameHistory_user2, gameHistory_winner, createdAt} = users;
        const request_uno = await fetch(`${url}/user/${gameHistory_user1}`);
        const request_dos = await fetch(`${url}/user/${gameHistory_user2}`);
        const request_tres = await fetch(`${url}/user/${gameHistory_winner}`);
        const response_uno = await request_uno.json();
        const response_dos = await request_dos.json();
        const response_tres = await request_tres.json();
        const user_uno = response_uno.body.user_name;
        const user_dos = response_dos.body.user_name;
        const winner = response_tres.body.user_name;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user_uno}</td>
            <td>${user_dos}</td>
            <td>${winner}</td>
            <td>${createdAt.slice(0,10)}</td>
        `
        tbody.appendChild(tr)
    });
}

function mostrarMensaje() {
    table.innerHTML = '';
    title.innerHTML = 'No registra partidas aún'
}
