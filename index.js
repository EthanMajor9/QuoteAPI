const express = require('express');
const app = express();
const port = 3000;

const dbConnection = require('./src/db');

app.get('/', (req, res) => {
	dbConnection.query('SELECT * from quotes', (err, results, fields) => {
		if(err) {
			res.status(500).end('Error querying the database.');
		}
		
		res.send(fields);
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});