
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');

const app = express();

const {
 SERVER_PORT,
 SESSION_SECRET,
 REACT_APP_DOMAIN,
 REACT_APP_CLIENT_ID,
 CLIENT_SECRET
} = process.env;

app.use(session({
 secret: SESSION_SECRET,
 resave: false,
 saveUninitialized: true
}));

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
 let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/ userinfo?access_token=${toeknRes.data.access_token}`)
 // console.log(userRes.data)

 // put user data on session:
 req.session.user = userRes.data;
 res.redirect('/');
});



app.listen(SERVER_PORT, () => {
 console.log(`Server listening on port: ${SERVER_PORT}`)
});
