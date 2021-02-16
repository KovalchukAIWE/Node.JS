const { Schema, model } = require('mongoose');

const { subscriptionEnum } = require('../../configs/configs').users;

const userSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	subscription: {
		type: String,
		enum: subscriptionEnum,
		required: false,
		default: 'free',
	},
	token: { type: String, required: false },
});

module.exports = model('User', userSchema);