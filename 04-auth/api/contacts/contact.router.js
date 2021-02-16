const { Router } = require('express');

const contactsController = require('./contact.controller');

const contactsMiddleware = require('./contact.middleware');

const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} = contactsController;

const {
	validateCreateContact,
	validateUpdateContact,
	validateContactID,
	validateQueryParams,
} = contactsMiddleware;

//Init router
const contactRouter = Router();

// @ GET /api/contacts (can be requested with next params: sub=free, page=1, limit=10)
contactRouter.get('/', validateQueryParams, listContacts);

// @ GET /api/contacts/:contactId
contactRouter.get('/:contactId', validateContactID, getContactById);

// @ POST /api/contacts
contactRouter.post('/', validateCreateContact, addContact);

// @ DELETE /api/contacts/:id
contactRouter.delete('/:id', validateContactID, removeContact);

// @ PATCH /api/contacts/:id
contactRouter.patch('/:id', validateContactID, validateUpdateContact, updateContact);

module.exports = contactRouter;