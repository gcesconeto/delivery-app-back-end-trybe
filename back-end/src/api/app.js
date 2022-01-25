const express = require('express');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(require('../controllers/root'));

app.use(require('../middlewares/error'));

module.exports = app;
