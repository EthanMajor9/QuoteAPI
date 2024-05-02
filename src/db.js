// Configure .ENV
require('dotenv').config();

// Configure database connection
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
});

connection.connect((err) => {
	if(err) throw err;

	console.log('Database connection established.');
});

module.exports = connection;