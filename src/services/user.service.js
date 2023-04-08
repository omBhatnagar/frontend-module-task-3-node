const Users = require("../models/User");

const { ErrorHandler } = require("../util/error");
const { hashPassword, checkPassword } = require("../util/encryptPassword");

exports.createUserService = async (userData) => {
	const { name, email, password, confirmPassword } = userData;
	if (!name || !email || !password || !confirmPassword)
		return new ErrorHandler(400, "Fields cannot be empty!");

	if (password !== confirmPassword)
		return new ErrorHandler(400, "Passwords do not match!");

	try {
		const isUser = await Users.findOne({ email }).exec();
		if (isUser)
			return new ErrorHandler(400, "Account with given email already exists!");

		const hashedPassword = hashPassword(password);

		const user = new Users({
			name,
			email,
			password: hashedPassword,
		});

		var userToSave = await user.save();
	} catch (error) {
		console.log(error);
		return new ErrorHandler(500, error.message);
	}
	return { status: true, body: userToSave };
};

exports.loginUserService = async (userData) => {
	const { email, password } = userData;

	if (!email || !password)
		return new ErrorHandler(400, "Fields cannot be empty!");

	try {
		const user = await Users.findOne({ email }).exec();
		if (!user) return new ErrorHandler(404, "User with given email not found!");

		const validated = checkPassword(password, user.password);
		console.log({ validated });
		if (!validated) return new ErrorHandler(400, "Incorrect email/password.");

		return { status: true, body: user };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.getUsersService = async () => {
	try {
		const users = await Users.find();
		return { status: true, body: users };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.updateUserService = async (userData) => {
	const { name, password, email } = userData;
	try {
		const user = await Users.findOne({ email }).exec();
		if (!user) return new ErrorHandler(400, "Account does not exists!");

		let hashedPassword;
		if (password) hashedPassword = hashPassword(password);

		const updatedUser = await Users.findOneAndUpdate(
			{ email },
			{
				name: name ? name : user.name,
				password: password ? hashedPassword : user.password,
			},
			{ new: true },
		);

		return { status: true, body: updatedUser };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};

exports.deleteUserService = async (id) => {
	try {
		const deletedUser = await Users.findByIdAndDelete(id);
		if (!deletedUser) return new ErrorHandler(400, "User does not exists!");

		return { status: true, body: deletedUser };
	} catch (error) {
		return new ErrorHandler(500, error.message);
	}
};
