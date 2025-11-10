## Code Walkthrough

### 1. `scripts/import.js`
- CLI script I run manually to bring data in from the **Open Library Search API**.
- Connects to MongoDB, calls my import function, then disconnects.
- Accepts a search term, e.g. `node scripts/import.js "harry potter"`.
- This keeps API calls to Open Library separate from my REST API so I don’t hit the external API on every request.

### 2. `src/services/openLibraryService.js`
- Small helper that actually calls `https://openlibrary.org/search.json?q=...` using Axios.
- Isolating the HTTP call here makes it easy to change the endpoint or add params later.

### 3. `src/services/validation.js`
- Validates the raw Open Library `docs` using Joi.
- Picks only the fields I care about (`key`, `title`, `author_name`, `first_publish_year`, `isbn`).
- Maps them to my internal shape: `ol_key`, `title`, `author`, `first_publish_year`, `isbn`.

### 4. `src/services/importBooks.js`
- Orchestrates Part 1:
  1. call the Open Library service,
  2. validate/transform the results,
  3. **upsert** into MongoDB using the Book model.
- Upserting on `ol_key` lets me run the import multiple times without creating duplicates.

### 5. `src/models/Book.js`
- Mongoose model that defines how a book is stored in MongoDB.
- Fields line up with what I save from Open Library.
- This is the “database persistence” piece.

### 6. `src/routes/bookRoutes.js`
- RESTful CRUD endpoints for books:
  - `GET /api/books`
  - `GET /api/books/:id`
  - `POST /api/books`
  - `PUT /api/books/:id`
  - `DELETE /api/books/:id`
- All of these read/write the same MongoDB collection, so CRUD is persisted.

### 7. `src/app.js`
- Creates the Express app.
- Connects to MongoDB (`mongodb://localhost:27017/bookapi`).
- Mounts the book routes at `/api/books`.
- Mounts Swagger UI at `/api-docs` to provide API documentation.
- Includes a global error handler to return JSON errors — this helps satisfy the “error handling” requirement.

### 8. `src/docs/swagger.json`
- OpenAPI/Swagger definition for the REST API.
- Documents the CRUD endpoints so they can be viewed/tested at `http://localhost:3000/api-docs`.
<img width="975" height="204" alt="image" src="https://github.com/user-attachments/assets/f935522a-939e-4c93-aa78-ab3ecd4cf229" />
