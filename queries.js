require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const Pool = require('pg').Pool;
const pool = new Pool({
	user     : process.env.POSTGRESUSER,
	host     : 'localhost',
	database : process.env.POSTGRESDB,
	password : process.env.POSTGRESPASS,
	port     : 5432
});

const getRequests = (request, response) => {
	const id = request.params.uuid;

	console.log('params: ', request.params);
	console.log('id is : ', id);
	console.log(typeof id);

	pool.query('SELECT (request, created_on) FROM requests WHERE bin_id = ($1)', [ id ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json({ uuid: id, requests: results.rows });
	});
};

const createEndpoint = (request, response) => {
	const identifier = uuidv4();
	pool.query('INSERT INTO bins (uuid) VALUES ($1)', [ identifier ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(201).json({ binID: identifier });
	});
	return identifier;
};

const createRequest = (request, response) => {
	const id = request.params.uuid;
	const body = request.body;

	pool.query('INSERT INTO requests (bin_id, request) VALUES ($1, $2)', [ id, body ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(201).send(`Request added into bin with UUID ${id}`);
	});
};

module.exports = {
	getRequests,
	createEndpoint,
	createRequest
};
