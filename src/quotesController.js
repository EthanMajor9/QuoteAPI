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
	const {author, text, timestamp} = req.body;
	const query = 'INSERT into quotes (author, quote_text, timestamp) values (?, ?, ?)';

	dbConnection.query(query, [author, text, timestamp], (err) => {
		if(err) {
			return res.status(500).send({error: err});
		}

		res.status(200).send({success: 'Quote inserted into the database successfully'});
	});
};

const deleteQuote = (req, res) => {
	const idParam = req.params['id'];
	const quoteId = idParam.substring(idParam.indexOf(':') + 1);

	console.log('Requesting deletion of quote with id', quoteId);

	const query = `DELETE from quotes where id=?`;
	dbConnection.query(query, [quoteId], (err) => {
		if(err) {
			return res.status(500).send({error: err});
		}

		res.status(200).send({success: 'Quote deleted from the database successfully'});
	});
};

const updateQuote = (req, res) => {

};

module.exports = {
	getAllQuotes,
	addQuote,
	deleteQuote,
	updateQuote,
};