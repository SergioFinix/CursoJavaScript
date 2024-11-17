/**
 * RespuestasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function (request, response) {
        try {
            const { user } = request.body;
            const answers = request.body.respuestas;

            if (answers.length > 0) {
                answers.forEach(element => {
                    let result = Promise.all([
                        insert(element, user)
                    ])
                });
            }
            return response.status(200).json(answers);
        } catch (error) {
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getStatics: async function (request, response) {
        try {
            const { id } = request.params;

            const users = await Users.findOne({ id: id }).populate('respuestas');
            const respuestas = users.respuestas;
 
            if (respuestas.length === 0) {
                return response.status(200).json({ message: 'El usuario no tiene respuestas registradas.', resultado: [] });
            }

            const preguntaIds = respuestas.map(respuesta => respuesta.pregunta);
            const preguntas = await Preguntas.find({ id: preguntaIds }).populate('encuesta');
            const estadisticas = {};

            respuestas.forEach(respuesta => {
                const pregunta = preguntas.find(p => p.id === respuesta.pregunta);
                const encuestaTitulo = pregunta.encuesta.titulo;

                if (!estadisticas[encuestaTitulo]) {
                    estadisticas[encuestaTitulo] = { true: 0, false: 0 };
                }

                const respuestaValor = respuesta.respuesta ? 'true' : 'false';
                estadisticas[encuestaTitulo][respuestaValor]++;
            });

            return response.status(200).json(estadisticas);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

async function insert(data, id) {
    const createAnswer = await Respuestas.create({
        respuesta: data.respuesta,
        usuario: id,
        pregunta: data.pregunta
    }).fetch();
    return createAnswer;
}

