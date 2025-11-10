const { searchBooks } = require('./openLibraryService');
const { validateAndTransform } = require('./validation');
const Book = require('../models/Book');

async function importBooksFromOpenLibrary(query = 'javascript') {
  const data = await searchBooks(query);
  const docs = data.docs || [];
  const books = validateAndTransform(docs);

  // upsert to avoid duplicates
  for (const b of books) {
    await Book.updateOne(
      { ol_key: b.ol_key },
      { $set: b },
      { upsert: true }
    );
  }

  return books.length;
}

module.exports = { importBooksFromOpenLibrary };


