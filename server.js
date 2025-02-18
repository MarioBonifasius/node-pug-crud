const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const karyawanRoutes = require('./routes/karyawan');
const karyawanRoutesApi = require('./routes/api');
const db = require('./db.js');
var cors = require('cors');

var corsOptions = {
  origin: '*',
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const { init: initAuth } = require('./auth');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.set('view engine', 'pug');
app.use("/public", express.static(path.join(__dirname, 'public')));

initAuth();
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(cors(corsOptions))
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/karyawan', karyawanRoutes);
app.use('/api/karyawan', karyawanRoutesApi);

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
  });
    });