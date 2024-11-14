const mongoose = require('mongoose');

const userFormSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    answers: { type: Array, default: [] }
});

module.exports = mongoose.model('UserForm', userFormSchema);