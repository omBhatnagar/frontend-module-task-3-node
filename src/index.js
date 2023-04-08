const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000;
app.set("port", PORT);

const server = http.createServer(app);
server.listen(PORT, () =>
	console.log(`Server up and running on port: ${PORT}`),
);
