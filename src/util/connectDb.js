const mongoose = require("mongoose");

const connectDb = () => {
	const db_uri = process.env.DATABASE_URL;
	mongoose.connect(
		"mongodb+srv://omishb2001:Omi%40ch82%2311%40mongoDB@meanmerntask.22g6zba.mongodb.net/test",
	);
	const database = mongoose.connection;

	database.on("error", (error) => console.log(error));
	database.once("connected", () => console.log("Database connected!"));
};

module.exports = connectDb;
