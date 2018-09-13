
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const massive = require('massive');

const app = express();

const {
 SERVER_PORT,
 SESSION_SECRET,
 REACT_APP_DOMAIN,
 REACT_APP_CLIENT_ID,
 CLIENT_SECRET,
 CONNECTION_STRING
} = process.env;

// set-up massive:
massive(CONNECTION_STRING).then(db => app.set('db', db));

// set-up session:
app.use(session({
 secret: SESSION_SECRET,
 resave: false,
 saveUninitialized: true
}));

// authentification & user info display:
app.get('/auth/callback', async (req, res) => {
 // code ====> req.query.code
 let payload = {
  client_id: REACT_APP_CLIENT_ID,
  client_secret: CLIENT_SECRET,
  code: req.query.code,
  grant_type: 'authorization_code',
  redirect_uri: `http://${req.headers.host}/auth/callback`
 };

 // post request with code for token:
 let toeknRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)

 // use token to get uesr data:
 let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${toeknRes.data.access_token}`)

const db = req.app.get('db');
const { email, name, picture, sub } = userRes.data;

// check if user exists in db by checking the auth_id/sub:
// always returns an array -data type: 
// Thus foundUser will eithr be an array of 1 for found or 0 for not found:
let foundUser = await db.find_user([sub]);
if (foundUser[0]) {
 req.session.user = foundUser[0];
} else {
 // if no user found - create user;
 let createdUser = await db.create_user([ name, email, picture, sub ]);

 // placing the createdUser obj on req.session.user obj:
 req.session.user = createdUser[0];
};
 res.redirect('http://localhost:3000');

 // console.log(userRes.data)

 // put user data on session:
 // req.session.user = userRes.data;
 // res.redirect('/');
});

app.get('/api/user-data', (req, res) => {
 if (req.session.user) {
  res.status(200).send(req.session.user)
 } else {
  res.status(401).send('Go log in')
 }
});

app.get('/logout', (req, res) => {
 req.session.destroy();
 res.redirect('http://localhost:3000');
});


app.listen(SERVER_PORT, () => {
 console.log(`Server listening on port: ${SERVER_PORT}`)
});
