const userModel = require('./user.model');

const configs = require('../../configs/configs');

const Joi = require('joi');

const jwt = require('jsonwebtoken');

const {
	Types: { ObjectId },
} = require('mongoose');

const { passLengthMin, passLengthMax, subscriptionEnum } = configs.users;

//The middleware validate to register user
function validateSignUpUser(req, res, next) {
	const createRegisterRules = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(passLengthMin).max(passLengthMax).required(),
	});

	const validatedRegister = createRegisterRules.validate(req.body);

	if (validatedRegister.error) {
		const message = validatedRegister.error.details[0].message;

		return res.status(400).json({ message });
	}

	next();
}

//The middleware validate to login user
function validateSignInUser(req, res, next) {
	const createLoginRules = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(passLengthMin).max(passLengthMax).required(),
	});

	const validatedLogin = createLoginRules.validate(req.body);

	if (validatedLogin.error) {
		const message = validatedLogin.error.details[0].message;

		return res.status(400).json({ message });
	}

	next();
}

//The middleware validate user token
async function validateUserToken(req, res, next) {
	try {
		const authorizationHeader = req.get('Authorization') || '';
		const token = authorizationHeader.replace('Bearer ', '');

		try {
			const userId = await jwt.verify(token, process.env.JWT_SECRET).userId;
			const user = await userModel.findById(userId);

			if (!user || user.token !== token) {
				return res.status(401).json({ message: 'Not authorized' });
			}

			req.user = user;

			next();
		} catch (err) {
			return res.status(401).json({ message: 'Not authorized' });
		}
	} catch (err) {
		next(err);
	}
}

//The middleware validate user id
function validateUserID(req, res, next) {
	const { id } = req.params;

	if (!ObjectId.isValid(id)) {
		return res.status(400).send({ message: 'invalid id' });
	}

	next();
}

//The middleware validate user subscription
function validateSub(req, res, next) {
	const { subscription } = req.body;

	if (!subscriptionEnum.includes(subscription)) {
		return res.status(400).send({ message: 'invalid subscription' });
	}

	next();
}

module.exports = {
	validateSignUpUser,
	validateSignInUser,
	validateUserToken,
	validateUserID,
	validateSub,
};