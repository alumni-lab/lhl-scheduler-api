// ---- LOAD env variables from the .env file ---- //
require ('dotenv').config();

// ---- WEB SERVER CONFIG ------------------------ //
const port = process.env.PORT || 8000;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sass = require('node-sass-middleware');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');

// ---- INITIALIZING THE SERVER ----------------- //
const server = express();

// ---- INITIALIZING THE DATABASE(POSTGRESQL) --- //
// UNCOMMENT AFTER FILLING THE .env FILE WITH DATABASE CREDENTIALS


const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect();


// require ('./service/passport')(db);
// server.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: ['xiutbgisergnpserigun']
//   })
// );

server.use(cors());
server.use(cookieParser());
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
server.use(express.static('public'));

server.set('view engine', 'ejs');

// ---- SETUP THE DIFFERENT PATHS IN THE ROUTES HERE -------- // <-- DEFINES ALL URL ROUTES
const sampleRoutes = require('./routes/sampleRoutes');
const usersRoutes = require('./routes/usersRoutes');

// ---- SETUP THE DIFFERENT PATHS IN THE REPOSITORY HERE ---- // <-- CONTAINS ALL THE DB LOGIC
const sampleRepositoryFactory = require('./repository/sampleRepository');
const usersRepositoryFactory = require('./repository/usersRepository');

// ---- SETTING UP THE REPOSITORY AND SERVICE TO BE USED BY ROUTE -- // 
const sampleRepository = sampleRepositoryFactory(db);
const usersRepository = usersRepositoryFactory(db);

// ---- SERVER ROUTING -------------------------------------- // 
server.use('/sample', sampleRoutes(sampleRepository));
server.use('/users', usersRoutes(usersRepository));

// ---- HOME PAGE ------------------------------------------- //
server.get('/', (req, res) => {
  res.render('index.ejs') // <===== Renders the index.ejs in the views
});
server.get('/sample2', (req, res) => {
  res.send('Inside the sample page'); // <==== outputs the string in the page
});

// ---- START THE SERVER ------------------------------------ //
server.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
});