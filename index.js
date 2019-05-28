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

app.use('/api', require('./routes'))

// app.get('/*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// })

app.listen(port, () =>
  console.log(`Listening on http port ${port}!`)
)
