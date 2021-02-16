const Joi = require('joi');

const configs = require('../../configs/configs');

const {
	Types: { ObjectId },
} = require('mongoose');

const {
	nameLengthMin,
	nameLengthMax,
	passLengthMin,
	passLengthMax,
	phonePattern,
} = configs.contacts;

const { pageNumberMin, limitNumberMin, subscriptionEnum } = configs.queryParams;

//The middleware validate contact credential (create)
function validateCreateContact(req, res, next) {
	const createContactRules = Joi.object({
		name: Joi.string().min(nameLengthMin).max(nameLengthMax).required(),
		email: Joi.string().email().required(),
		phone: Joi.string().pattern(phonePattern).required(),
		subscription: Joi.string().required(),
		password: Joi.string().min(passLengthMin).max(passLengthMax).required(),
	});

	const validatedContact = createContactRules.validate(req.body);

	if (validatedContact.error) {
		return res.status(400).send({ message: 'missing required name field' });
	}

	next();
}

//The middleware validate contact credential (update)
function validateUpdateContact(req, res, next) {
	const updateContactRules = Joi.object({
		name: Joi.string().min(nameLengthMin).max(nameLengthMax),
		email: Joi.string().email(),
		phone: Joi.string().pattern(phonePattern),
		subscription: Joi.string(),
		password: Joi.string().min(passLengthMin).max(passLengthMax),
	}).min(1);

	const validatedContact = updateContactRules.validate(req.body);

	if (validatedContact.error) {
		return res.status(400).send({ message: 'missing fields' });
	}

	next();
}

//The middleware validate contact id (read, delete, update)
function validateContactID(req, res, next) {
	const { id } = req.params;

	if (!ObjectId.isValid(id)) {
		return res.status(400).send({ message: 'invalid id' });
	}

	next();
}

//The middleware validate query params (each of the parameters is optional)
function validateQueryParams(req, res, next) {
	const createQueryRules = Joi.object({
		page: Joi.number().min(pageNumberMin).default(pageNumberMin),
		limit: Joi.number().min(limitNumberMin).default(limitNumberMin),
		sub: Joi.string().valid(...subscriptionEnum),
	});

	const validatedQueryParams = createQueryRules.validate(req.query);

	if (validatedQueryParams.error) {
		const message = validatedQueryParams.error.details[0].message;

		return res.status(400).json({ message });
	}

	req.query = validatedQueryParams.value;

	next();
}

module.exports = {
	validateCreateContact,
	validateUpdateContact,
	validateContactID,
	validateQueryParams,
};