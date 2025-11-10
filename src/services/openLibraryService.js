const axios = require('axios');

async function searchBooks(query) {
  const res = await axios.get('https://openlibrary.org/search.json', {
    params: { q: query }
  });
  return res.data;  // has {start, num_found, docs: [...]}
}

module.exports = { searchBooks };
