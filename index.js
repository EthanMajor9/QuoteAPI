// Configure .ENV
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

// Configure DB connection
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
});


app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});