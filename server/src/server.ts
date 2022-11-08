import path from 'path';
import express, { Application } from 'express';
const cors = require('cors');
import Color from 'colors';
const colors = require('colors');
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/error');

const connectDB = require('./config/db');

const Users = require('./routes/users');
const Goals = require('./routes/goals');

const port = process.env.PORT || 5000;
const app: Application = express();

app.use(cors()); // CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // * Such as bodyParser.json() "body-parser" middleware.
app.use(express.urlencoded({ extended: false }));

connectDB();

// Routes
app.use('/api/users', Users);
app.use('/api/goals', Goals);

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`.cyan));
