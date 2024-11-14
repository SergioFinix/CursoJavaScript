const UserForm = require('../models/UserForm');

exports.createUserForm = async (req, res) => {
  try {
    const { userId, formId } = req.body;
    const userForm = new UserForm({ userId, formId, answers: [] });
    await userForm.save();
    res.status(201).json(userForm);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear user-form' });
  }
}

exports.updateUserForm = async (req, res) => {
  try {
    const { userId, formId, answers } = req.body;
    const userForm = await UserForm.findOneAndUpdate({ userId, formId }, { answers }, { new: true });
    res.json(userForm);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar respuestas' });
  }
}