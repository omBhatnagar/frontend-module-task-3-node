const {
	createUserService,
	updateUserService,
	loginUserService,
	getUsersService,
	deleteUserService,
} = require("../services/user.service");
const { ErrorHandler } = require("../util/error");

exports.createUser = async (req, res, next) => {
	const { email, name, password, confirmPassword } = req.body;
	const response = await createUserService({
		email,
		name,
		password,
		confirmPassword,
	});

	if (response instanceof ErrorHandler) return next(response);

	return res.status(201).send({
		status: response.status,
		code: 201,
		data: response.body,
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	const response = await loginUserService({ email, password });

	if (response instanceof ErrorHandler) return next(response);

	return res.status(200).send({
		status: response.status,
		code: 200,
		data: response.body,
	});
};

exports.getUsers = async (req, res, next) => {
	const response = await getUsersService();
	if (response instanceof ErrorHandler) return next(response);

	return res.status(200).send({
		status: response.status,
		code: 200,
		data: response.body,
	});
};

exports.updateUser = async (req, res, next) => {
	const { name, password } = req.body;
	const { email } = req.params;
	const response = await updateUserService({ name, password, email });

	if (response instanceof ErrorHandler) return next(response);

	return res.status(201).send({
		status: response.status,
		code: 201,
		data: response.body,
	});
};

exports.deleteUser = async (req, res, next) => {
	const { id } = req.params;
	const response = await deleteUserService(id);

	if (response instanceof ErrorHandler) return next(response);
	return res.status(200).send({
		status: response.status,
		code: 200,
		data: response.body,
	});
};
