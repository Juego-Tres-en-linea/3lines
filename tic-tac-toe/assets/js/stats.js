const url = 'http://localhost:3000/apiGame';
const id = localStorage.getItem("id");
const tr = document.querySelector('.d-stats .table tbody tr');
async function consumirEstadisticas() {
    try {
        const request = await fetch(`${url}/userStatistic/${id}`);
        const response = await request.json();
        if(response.body) {
            llenarTabla(response.body);
        } else {
            crearEstaditicas();
        }
    } catch (error) {
        console.log(error);
    }
}

consumirEstadisticas();

function llenarTabla(userStats) {
    const {UserStatistic_wins, UserStatistic_lost, UserStatistic_draw, UserStatistic_games} = userStats;
    tr.innerHTML = `
        <td>${UserStatistic_wins}</td>
        <td>${UserStatistic_lost}</td>
        <td>${UserStatistic_draw}</td>
        <td>${UserStatistic_games}</td>
    `;

}

async function crearEstaditicas() {
    const userStats = {
        UserStatistic_wins: 0,
        UserStatistic_lost: 0,
        UserStatistic_draw: 0,
        UserStatistic_games: 0,
        user_FK: `${id}`
    }
    try {
        const request = await fetch(`${url}/userStatistic`, {
            method: 'POST',
            body: JSON.stringify(userStats),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        if(response.status == 500) {
            setTimeout(() => {
                location.href = "create.html";
            }, 1500);
        } else {
            llenarTabla(userStats)
        }
    } catch (error) {
        console.log(error)
    }
}
