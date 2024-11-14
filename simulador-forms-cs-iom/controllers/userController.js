const User = require('../models/User');
const UserForm = require('../models/UserForm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { username, password, typeuser } = req.body;
  if (!['admin', 'respondent'].includes(typeuser)) return res.status(400).json({ error: "typeuser es inválido" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, typeuser });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ userId: user._id, username: user.username, typeuser: user.typeuser }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

exports.getUsersByType = async (req, res) => {
  const { typeuser } = req.params;
  const query = typeuser === 'all' ? {} : { typeuser };

  try {
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.getUserWithForms = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userForms = await UserForm.find({ userId: req.params.id }).populate('formId');
    res.json({ user, forms: userForms });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener información del usuario' });
  }
};