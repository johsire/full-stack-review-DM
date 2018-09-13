require('dotenv').config()
const express = require('express');
const session = require('express-session');
const axios = require('axios');

const app = express();

const {
  SERVER_PORT,
  SESSION_SECRET
} = process.env;

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`)
})
