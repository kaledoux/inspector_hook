require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

// use cors for cross origin
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended : true
	})
);

//cross origin
app.use(cors());

// root
app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' });
});

// get bins for uuid
app.get('/api/:uuid', db.getRequests);

// create a new bin id
app.post('/api/newBin', db.createEndpoint);

// creare request for bin
app.post('/api/:uuid', db.createRequest);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
