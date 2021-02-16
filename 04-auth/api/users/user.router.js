const { Router } = require('express');

const userController = require('./user.controller');

const userMiddleware = require('./user.middleware');

const {
	singUpUser,
	signInUser,
	signOutUser,
	getCurrentUser,
	updateUserSubscription,
} = userController;

const {
	validateSignUpUser,
	validateSignInUser,
	validateUserToken,
	validateUserID,
	validateSub,
} = userMiddleware;

const userRouter = Router();

// @ POST /api/auth/register
userRouter.post('/register', validateSignUpUser, singUpUser);

// @ POST /api/auth/login
userRouter.post('/login', validateSignInUser, signInUser);

// @ POST /api/auth/logout
userRouter.post('/logout', validateUserToken, signOutUser);

// @ GET /api/users/current
userRouter.get('/current', validateUserToken, getCurrentUser);

// @ PATCH /api/users/:id
userRouter.patch('/:id', validateUserID, validateUserToken, validateSub, updateUserSubscription);

module.exports = userRouter;