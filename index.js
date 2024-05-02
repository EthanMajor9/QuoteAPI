// Configure express app
const express = require('express');
const app = express();
const port = 3000;

// Import quote controller module
const quotesController = require('./src/quotesController');

// Middleware
app.use(express.json());

// Define routes
app.get('/quotes', quotesController.getAllQuotes);
app.get('/quotes:author', quotesController.getAllQuotesFromAuthor);
app.post('/quotes', quotesController.addQuote);
app.put('/quotes:id', quotesController.updateQuote);
app.delete('/quotes:id', quotesController.deleteQuote);

// Start server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});