const { Router } = require('express');

const contactsController = require('./contacts.controller');

const contactsMiddleware = require('./contacts.middleware');

const { listContacts, getContactById } = contactsController;
const { addContact, removeContact, updateContact } = contactsController;
const { validateCreateContact, validateUpdateContact, validateContactID } = contactsMiddleware;

const contactRouter = Router();

// @ GET /api/contacts
contactRouter.get('/', listContacts);

// @ GET /api/contacts/:contactId
contactRouter.get('/:contactId', validateContactID, getContactById);

// @ POST /api/contacts
contactRouter.post('/', validateCreateContact, addContact);

// @ DELETE /api/contacts/:contactId
contactRouter.delete('/:contactId', validateContactID, removeContact);

// @ PATCH /api/contacts/:contactId
contactRouter.patch('/:contactId', validateContactID, validateUpdateContact, updateContact);

module.exports = contactRouter;