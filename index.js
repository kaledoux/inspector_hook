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
// get all users
app.get('/users', db.getUsers);
// get specific user
app.get('/users/:id', db.getUserById);
// create user
app.post('/users', db.createUser);
// update user
app.put('/users/:id', db.updateUser);
// delete user
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
