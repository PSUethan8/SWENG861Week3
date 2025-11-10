const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// GET all
router.get('/', async (req, res, next) => {
  const books = await Book.find();
  res.json(books);
});

// GET one by Mongo _id
router.get('/:id', async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.json(book);
});

// CREATE
router.post('/', async (req, res, next) => {
  // could validate with Joi here too
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.json(book);
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

module.exports = router;
