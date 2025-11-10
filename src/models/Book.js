const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  ol_key: { type: String, required: true, unique: true }, // from doc.key
  title: { type: String, required: true },
  author: { type: String },
  first_publish_year: { type: Number },
  isbn: { type: String },
}, { timestamps: true });

module.exports = model('Book', bookSchema);