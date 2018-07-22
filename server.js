const path = require('path');
const express = require('express');
const errorHandler = require('./errorHandling');
const logger = require('./logger');
const app = express();

// json parser middleware
app.use(express.json());

// static files middleware
app.use(express.static(path.join(__dirname, 'public')));

const partsRouter = require('./routes/parts.route');
const robotsRouter = require('./routes/robots.route');

app.use(logger);
app.use('/api', partsRouter);
app.use('/api', robotsRouter);

app.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/error.html'));
});

app.all('/test', (req, res) => {
  throw new Error()
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(errorHandler);

app.listen(3000,
  () => console.log('Robot labs API server listening on port 3000!')
);