require('dotenv').config()

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', require('./routes'))

app.listen(port, () =>
  console.log(`Listening on http port ${port}!`)
)
