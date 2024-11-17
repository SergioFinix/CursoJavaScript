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