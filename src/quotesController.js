const dbConnection = require('./db');

const getAllQuotes = (req, res) => {
	dbConnection.query('SELECT * from quotes', (err, rows) => {
		if(err) {
			return res.status(500).send({error: 'Error querying the database.'});
		}

		res.status(200).send(rows);
	});
};

const addQuote = (req, res) => {

};

const deleteQuote = (req, res) => {

};

const updateQuote = (req, res) => {

};

module.exports = {
	getAllQuotes,
	addQuote,
	deleteQuote,
	updateQuote,
};