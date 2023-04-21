const userService = require("../../src/services/user.service");
const {
	createUser,
	login,
	getUsers,
	updateUser,
	deleteUser,
} = require("../../src/controllers/user.controller");
const { mockResponse, mockRequest } = require("../helpers/interceptor");

const user = {
	email: "test@test.com",
	password: "12345",
};

const controllerResponse = { status: true, code: 200 };
let req;
let res;

beforeEach(() => {
	req = mockRequest();
	res = mockResponse();
});

afterEach(() => jest.restoreAllMocks());

describe("user controllers", () => {
	it("create user controller calls create user service", async () => {
		const spy = jest.spyOn(userService, "createUserService");
		spy.mockReturnValue({
			status: true,
			body: {
				...user,
				name: "test",
				confirmPassword: "12345",
				confirmPassword: "12345",
			},
		});

		req.body = {
			...user,
			name: "test",
			confirmPassword: "12345",
			confirmPassword: "12345",
		};

		const response = await createUser(req, res);
		expect(spy).toHaveBeenCalled();
		expect(response.status).toHaveBeenCalledWith(201);
		expect(response.send).toHaveBeenCalledWith({
			...controllerResponse,
			code: 201,
			data: {
				...user,
				name: "test",
				confirmPassword: "12345",
				confirmPassword: "12345",
			},
		});
	});

	it("login controller calls login user service", async () => {
		const spy = jest.spyOn(userService, "loginUserService");
		spy.mockReturnValue({ status: true, body: user });

		req.body = user;

		const response = await login(req, res);
		expect(spy).toHaveBeenCalled();
		expect(response.status).toHaveBeenCalledWith(200);
		expect(response.send).toHaveBeenCalledWith({
			...controllerResponse,
			data: user,
		});
	});

	it("get users controller returns list of users", async () => {
		const spy = jest.spyOn(userService, "getUsersService");
		spy.mockReturnValue({ status: true, body: Array(3).fill(user) });

		const response = await getUsers(req, res);
		expect(spy).toHaveBeenCalled();
		expect(response.status).toHaveBeenCalledWith(200);
		expect(response.send).toHaveBeenCalledWith({
			...controllerResponse,
			data: Array(3).fill(user),
		});
	});

	it("update user controller calls udpate user service", async () => {
		const spy = jest.spyOn(userService, "updateUserService");
		spy.mockReturnValue({ status: true, body: { ...user, name: "test1" } });

		req.body = { ...user, name: "test1" };

		const response = await updateUser(req, res);
		expect(spy).toHaveBeenCalled();
		expect(response.status).toHaveBeenCalledWith(201);
		expect(response.send).toHaveBeenCalledWith({
			...controllerResponse,
			code: 201,
			data: { ...user, name: "test1" },
		});
	});

	it("delete user controller calls delete user service", async () => {
		const spy = jest.spyOn(userService, "deleteUserService");
		spy.mockReturnValue({ status: true, body: user });

		const response = await deleteUser(req, res);
		expect(spy).toHaveBeenCalled();
		expect(response.status).toHaveBeenCalledWith(200);
		expect(response.send).toHaveBeenCalledWith({
			...controllerResponse,
			data: user,
		});
	});
});
