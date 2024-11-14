const Form = require('../models/Form');
const UserForm = require('../models/UserForm');

exports.createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear formulario' });
  }
};

exports.getFormsWithoutUser = async (req, res) => {
  try {
    const relatedForms = await UserForm.find({ userId: req.params.userId }).select('formId');
    const relatedFormIds = relatedForms.map((uf) => uf.formId);
    const forms = await Form.find({ _id: { $nin: relatedFormIds } });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener formularios no relacionados' });
  }
}

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener formularios' });
  }
}

exports.getStatsForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    const userForms = await UserForm.find({ formId: req.params.id });

    const stats = form.questions.map((question) => {
      const answerStats = {};
      userForms.forEach((userForm) => {
        const answer = userForm.answers[form.questions.indexOf(question)];
        if (Array.isArray(answer)) {
          answer.forEach((val) => answerStats[val] = (answerStats[val] || 0) + 1);
        } else {
          answerStats[answer] = (answerStats[answer] || 0) + 1;
        }
      });
      return { name: question.name, stats: answerStats };
    });

    res.json({ form, stats });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas del formulario' });
  }
}

exports.getFormByUser = async (req, res) => {
  try {
    const userForm = await UserForm.findOne({ formId: req.params.id, userId: req.params.userId });
    const hasAnswered = userForm && userForm.answers.length > 0;
    res.json({ hasAnswered, form: hasAnswered ? null : await Form.findById(req.params.id) });
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar respuesta' });
  }
}