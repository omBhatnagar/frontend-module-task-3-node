const mongoose = require("mongoose");

const connectDb = () => {
	const db_uri = process.env.DATABASE_URL;
	mongoose.connect(db_uri);
	const database = mongoose.connection;

	database.on("error", (error) => console.log(error));
	database.once("connected", () => console.log("Database connected!"));
};

module.exports = connectDb;
