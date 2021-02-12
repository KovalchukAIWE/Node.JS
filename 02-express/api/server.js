const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

const contactRouter = require('./contacts/contacts.router');

const accessLogStream = require('./accessLogStream');

class ContactsServer {
	constructor() {
		this.server = null;
		this.port = 8080;
	}
	start() {
		this.initServer();
		this.initMiddleware();
		this.initRoutes();
		this.startListening();
	}
	initServer() {
		this.server = express();
	}
	initMiddleware() {
		this.server.use(express.json());
		this.server.use(morgan('combined', { stream: accessLogStream }));
		this.server.use(cors({ origin: 'http://localhost:3000' }));
	}
	initRoutes() {
		this.server.use('/api/contacts', contactRouter);
	}
	startListening() {
		this.server.listen(this.port, () => {
			console.log('Server started listening on port', this.port);
		});
	}
}

module.exports = ContactsServer;