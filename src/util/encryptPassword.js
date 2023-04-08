const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	return hash;
};

exports.checkPassword = (password, hash) => bcrypt.compareSync(password, hash);
