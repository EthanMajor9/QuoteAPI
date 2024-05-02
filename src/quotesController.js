const dbConnection = require('./db');

//#region Utility functions

const handleDbError = (res, error) => {
	console.error('Database error:', error);
	res.status(500).send({ error: 'Error querying the database.' });
};

const extractId = (req) => {
	return req.params['id'].split(':')[1];
}

//#endregion

//#region Route handlers

const getAllQuotes = (_, res) => {
	// Execute select query on database
	dbConnection.query('SELECT * FROM quotes', (err, rows) => {
		if(err) return handleDbError(res, err);

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
		if(err) return handleDbError(res, err);

		res.status(200).send({success: 'Quote inserted into the database successfully'});
	});
};

const deleteQuote = (req, res) => {
	// Parse ID from request parameters
	const quoteId = extractId(req);

	// Construct query
	const query = 'DELETE FROM quotes WHERE id=?';

	// Execute query
	dbConnection.query(query, [quoteId], (err) => {
		if(err) return handleDbError(res, err);

		res.status(200).send({success: 'Quote deleted from the database successfully'});
	});
};

const updateQuote = (req, res) => {
	// Parse ID from request parameters
	const quoteId = extractId(req);

	// Parse request body for new quote data
	const {author, text, timestamp} = req.body;

	// Construct query
	const query = 'UPDATE quotes SET author = ?, quote_text = ?, timestamp =? WHERE id=?';

	// Execute query
	dbConnection.query(query, [author, text, timestamp, quoteId], (err) => {
		if(err) return handleDbError(res, err);

		res.status(200).send({success: 'Quote updated in the database successfully'});
	});
};

const getAllQuotesFromAuthor = (req, res) => {
	const authorParam = req.params['author'];
	const author = authorParam.substring(authorParam.indexOf(':') + 1);

	const query = 'SELECT * FROM quotes WHERE author = ?';
	dbConnection.query(query, [author], (err, rows) => {
		if(err) return handleDbError(res, err);

		res.status(200).send(rows);
	});
};

//#endregion

module.exports = {
	getAllQuotes,
	addQuote,
	deleteQuote,
	updateQuote,
	getAllQuotesFromAuthor
};