const dbConnection = require('./db');

const getAllQuotes = (req, res) => {
	dbConnection.query('SELECT * FROM quotes', (err, rows) => {
		if(err) {
			return res.status(500).send({error: 'Error querying the database.'});
		}

		res.status(200).send(rows);
	});
};

const addQuote = (req, res) => {
	const {author, text, timestamp} = req.body;
	const query = 'INSERT INTO quotes (author, quote_text, timestamp) VALUES (?, ?, ?)';

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

	const query = 'DELETE FROM quotes WHERE id=?';

	dbConnection.query(query, [quoteId], (err) => {
		if(err) {
			return res.status(500).send({error: err});
		}

		res.status(200).send({success: 'Quote deleted from the database successfully'});
	});
};

const updateQuote = (req, res) => {
	const idParam = req.params['id'];
	const quoteId = idParam.substring(idParam.indexOf(':') + 1);

	console.log('Requesting update of quote with id', quoteId);

	const {author, text, timestamp} = req.body;
	const query = 'UPDATE quotes SET author = ?, quote_text = ?, timestamp =? WHERE id=?';

	dbConnection.query(query, [author, text, timestamp, quoteId], (err) => {
		if(err) {
			return res.status(500).send({error: err});
		}

		res.status(200).send({success: 'Quote updated in the database successfully'});
	});
};

module.exports = {
	getAllQuotes,
	addQuote,
	deleteQuote,
	updateQuote,
};