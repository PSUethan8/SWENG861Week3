const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/books', bookRoutes);

// swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler (after routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
