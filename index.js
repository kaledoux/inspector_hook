require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended : true
	})
);

// root
app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' });
});

// get bins for uuid
app.get('/:uuid', db.getRequests);

// create a new bin id
app.post('/newBin', db.createEndpoint);

// creare request for bin
app.post('/:uuid', db.createRequest);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
