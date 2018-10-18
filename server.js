const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile =  require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Ani',
      password : '',
      database : 'smart-brain'
    }
  });

//returns a promise
// postgres.select('*').from('users').then(data => {
//     console.log(data);
// })

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

//signin
app.post('/signin', (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt)
})

//register
//register.handleRegister(req, res, db, bcrypt) => dependency injection
app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

//profile
app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
} )

//image
app.put('/image', (req, res) => {
    image.handleImagePut(req, res, db)
})

//api handling
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})

app.listen(3000, () => {
    console.log('Server is running at port 3000');
})


/*
/ --> res = app is working
/signin --> POST = success/fail
/register --> POST = user details
/profile/userid --> GET = user details
/image --> PUT = user
*/