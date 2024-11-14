const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    typeuser: { type: String, required: true, enum: ['admin', 'respondent'] }
});

module.exports = mongoose.model('User', userSchema);