const dbConnection = require('./db');

const getAllQuotes = (_, res) => {
	// Execute select query on database
	dbConnection.query('SELECT * FROM quotes', (err, rows) => {
		if(err) return res.status(500).send({error: 'Error querying the database.'});

		res.status(200).send(rows);
	});
};

const addQuote = (req, res) => {
	// Parse request body
	const {author, text, timestamp} = req.body;

	// Construct SQL query
	const query = 'INSERT INTO quotes (author, quote_text, timestamp) VALUES (?, ?, ?)';

	// Execute query
	dbConnection.query(query, [author, text, timestamp], (err) => {
		if(err) return res.status(500).send({error: err});

		res.status(200).send({success: 'Quote inserted into the database successfully'});
	});
};

const deleteQuote = (req, res) => {
	// Parse ID from request parameters
	const idParam = req.params['id'];
	const quoteId = idParam.substring(idParam.indexOf(':') + 1);

	// Construct query
	const query = 'DELETE FROM quotes WHERE id=?';

	// Execute query
	dbConnection.query(query, [quoteId], (err) => {
		if(err) return res.status(500).send({error: err});

		res.status(200).send({success: 'Quote deleted from the database successfully'});
	});
};

const updateQuote = (req, res) => {
	// Parse ID from request parameters
	const idParam = req.params['id'];
	const quoteId = idParam.substring(idParam.indexOf(':') + 1);

	// Parse request body for new quote data
	const {author, text, timestamp} = req.body;

	// Construct query
	const query = 'UPDATE quotes SET author = ?, quote_text = ?, timestamp =? WHERE id=?';

	// Execute query
	dbConnection.query(query, [author, text, timestamp, quoteId], (err) => {
		if(err) return res.status(500).send({error: err});

		res.status(200).send({success: 'Quote updated in the database successfully'});
	});
};

const getAllQuotesFromAuthor = (req, res) => {
	const authorParam = req.params['author'];
	const author = authorParam.substring(authorParam.indexOf(':') + 1);

	const query = 'SELECT * FROM quotes WHERE author = ?';
	dbConnection.query(query, [author], (err, rows) => {
		if(err) return res.status(500).send({error: err});

		res.status(200).send(rows);
	});
};

module.exports = {
	getAllQuotes,
	addQuote,
	deleteQuote,
	updateQuote,
	getAllQuotesFromAuthor
};