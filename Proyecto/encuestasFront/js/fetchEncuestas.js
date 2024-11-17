const urlE = `${URLENDPOINT}api/encuesta`;

const contentEncuestas = document.querySelector('.encuestas');

document.addEventListener('DOMContentLoaded', function () {
    GetSurveys()
        .then((data) => {
            loadSurveys(data);
        })
        .catch((error) => {
            console.log(error);
        })
});

function GetSurveys() {
    return new Promise((resolve, reject) => {
        fetch(urlE)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject(new Error('Error al obtener encuestas'));
                }
            })
            .then((data) => resolve(data))
            .catch(() => reject(new Error('Error al conectar con API')));
    })
};

function loadSurveys(data) {
    console.log(data);
    data.forEach(element => {
        let card = document.createElement('div');
        let bodyCard = document.createElement('div');
        let title = document.createElement('h6');

        card.classList.add('card');
        bodyCard.classList.add('card-body');

        title.innerHTML = element.titulo;

        card.appendChild(title);
        card.appendChild(bodyCard);

        loadAnswersSurvey(element.preguntas, bodyCard);

        contentEncuestas.appendChild(card);
    });
}

function loadAnswersSurvey(data, content) {
    data.forEach(element => {
        let contentSelect = document.createElement('div');
        let label = document.createElement('label');
        let select = document.createElement('select');
        let option1 = document.createElement('option');
        let option2 = document.createElement('option');

        label.setAttribute('for', `question-${element.id}`);
        select.setAttribute('id', `question-${element.id}`);
        select.setAttribute('name', `question-${element.id}`);

        label.innerHTML = element.texto;

        option1.innerHTML = "Si";
        option1.value = element.opciones[0];
        option2.innerHTML = "No";
        option2.value = element.opciones[1];

        select.appendChild(option1);
        select.appendChild(option2);

        contentSelect.appendChild(label);
        contentSelect.appendChild(select);

        content.appendChild(contentSelect);
    });
}