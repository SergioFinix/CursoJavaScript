/**
 * EncuestasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (request, response) {
        try {
            const { titulo, descripcion } = request.body;
            const preguntas = request.body.preguntas;
            const createEntreview = await Encuestas.create({
                titulo: titulo,
                descripcion: descripcion
            }).fetch();
            if (preguntas.length > 0) {
                preguntas.forEach(element => {
                    let result = Promise.all([
                        insert(element, createEntreview.id)
                    ])
                });
            }
            return response.status(200).json({ message: 'true' });
        } catch (error) {
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    },
    get: async function(request, response) {
        try{
            const getEnterviews = await Encuestas.find().populate('preguntas');

            return response.status(200).json(getEnterviews);
        }catch(error){
            return response.status(500).json({message: 'Internal Server Error' });
        }
    }
};

async function insert(data, id) {
    const createAnswer = await Preguntas.create({
        texto: data.texto,
        tipo: data.tipo,
        opciones: [true, false],
        encuesta: id
    }).fetch();
    return createAnswer;
}