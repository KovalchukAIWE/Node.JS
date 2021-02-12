const Joi = require('joi');

function validateCreateContact(req, res, next) {
	const createContactRules = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().email().required(),
		phone: Joi.string()
			.pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
			.required(),
	});

	const validatedContact = createContactRules.validate(req.body);

	if (validatedContact.error) {
		return res.status(400).send({ message: 'missing required name field' });
	}

	next();
}

function validateUpdateContact(req, res, next) {
	const updateContactRules = Joi.object({
		name: Joi.string().min(3).max(30),
		email: Joi.string().email(),
		phone: Joi.string().pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/),
	});

	const validatedContact = updateContactRules.validate(req.body);

	if (validatedContact.error) {
		return res.status(400).send({ message: 'missing fields' });
	}

	next();
}

module.exports = { validateCreateContact, validateUpdateContact };