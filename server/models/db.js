var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.SQL_HOST,
    port     : process.env.SQL_PORT,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DATABASE
});

connection.connect((err) => {
    if (err) console.log(err);

    console.log('sql connected')
});

module.exports = connection;
