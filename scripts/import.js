// scripts/import.js
const mongoose = require('mongoose');
const { importBooksFromOpenLibrary } = require('../src/services/importBooks');

// adjust this to match your app connection string
const MONGO_URI = 'mongodb://localhost:27017/bookapi';

async function main() {
  // get the query from command line, default to 'javascript'
  const query = process.argv[2] || 'javascript';

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to Mongo. Importing books for query: "${query}"...`);

    const count = await importBooksFromOpenLibrary(query);

    console.log(`Done. Imported/updated ${count} books.`);
  } catch (err) {
    console.error('Import failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();