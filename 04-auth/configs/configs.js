module.exports = {
	users: {
		passLengthMin: 6,
		passLengthMax: 20,
		subscriptionEnum: ['free', 'pro', 'premium'],
	},

	contacts: {
		nameLengthMin: 3,
		nameLengthMax: 30,
		passLengthMin: 6,
		passLengthMax: 20,
		phonePattern: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
	},

	queryParams: {
		pageNumberMin: 1,
		limitNumberMin: 20,
		subscriptionEnum: ['free', 'pro', 'premium'],
	},
};