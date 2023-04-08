const Express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Utils
const connectDb = require("./util/connectDb");
const { handleError } = require("./util/error");

const app = Express();

dotenv.config();

// Database connection
connectDb();

const routes = require("./routes");

// Middleware
app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Error handler
app.use((error, req, res, next) => {
	console.log(error);
	handleError(error, res);
});

module.exports = app;
