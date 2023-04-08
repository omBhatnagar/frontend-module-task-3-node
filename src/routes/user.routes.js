const router = require("express").Router();

const {
	createUser,
	updateUser,
	getUsers,
	deleteUser,
	login,
} = require("../controllers/user.controller");

router.post("/register", createUser);
router.post("/login", login);
router.get("/", getUsers);
router.put("/:email", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
