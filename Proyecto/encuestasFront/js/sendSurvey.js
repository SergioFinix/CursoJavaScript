const urlS = `${URLENDPOINT}`;

const urlR = `${urlS}api/respuesta`

const buttonSuccess = document.getElementById('success');

let respuestas = [];

buttonSuccess.addEventListener('click', function(e){
    e.preventDefault();
    respuestas = [];
    const surveys = document.querySelectorAll('.card');

    surveys.forEach(survey => {
        const selects = survey.querySelectorAll('select');

        selects.forEach( select => {
            const answerId = select.getAttribute('name');
            const answerValue = select.value;

            const questionId = answerId.replace('question-', '');

            respuestas.push({
                pregunta: questionId,
                respuesta: answerValue === "true"
            })
        });
    });

    sendRequest();
});

function sendRequest(){
    const request = {
        user: user,
        respuestas: respuestas  // No es necesario hacer JSON.stringify aquí, se hará dentro de fetch
    };
    var response = PostSurveys(request);
}

function PostSurveys(request) {
    console.log(request);
    return new Promise((resolve, reject) => {
        fetch(urlR, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Asegúrate de que el Content-Type sea JSON
            },
            body: JSON.stringify(request)  // Aquí convertimos el objeto a JSON
        })
            .then((response) => {
                if (response.ok) {
                    alert('Datos almacenados correctamente');
                } else {
                    reject(new Error('Error al obtener encuestas'));
                }
            })
            .then((data) => resolve(data))
            .catch(() => reject(new Error('Error al conectar con API')));
    })
};