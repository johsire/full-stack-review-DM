require('dotenv').config()
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

massive(CONNECTION_STRING).then(db => app.set('db', db));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.get('/auth/callback', async (req, res) => {
  let payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: `http://${req.headers.host}/auth/callback`
  }
  // post request with code for token
  let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
  // use token to get user data
  let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)
  console.log()



})

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`)
})
