const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      type: { type: String, required: true, enum: ['number', 'select', 'check'] },
      name: { type: String, required: true },
      placeholder: { type: String, required: true },
      options: [String]
    }
  ]
});

module.exports = mongoose.model('Form', formSchema);