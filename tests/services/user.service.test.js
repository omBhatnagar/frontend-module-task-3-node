const mockingoose = require("mockingoose");
const Users = require("../../src/models/User");
const {
	createUserService,
	loginUserService,
	updateUserService,
	getUsersService,
	deleteUserService,
} = require("../../src/services/user.service");
const { ErrorHandler } = require("../../src/util/error");
const passwordUtil = require("../../src/util/encryptPassword");

describe("Given empty request body,", () => {
	it("create user service returns 400 error response", async () => {
		const response = await createUserService();

		expect(response instanceof ErrorHandler).toBe(true);
		expect(response.statusCode).toBe(400);
		expect(response.message).toBe("Fields cannot be empty!");
	});

	it("login user service returns 400 error response", async () => {
		const response = await loginUserService();

		expect(response instanceof ErrorHandler).toBe(true);
		expect(response.statusCode).toBe(400);
		expect(response.message).toBe("Fields cannot be empty!");
	});

	it("update user service returns 400 error response", async () => {
		const response = await updateUserService();

		expect(response instanceof ErrorHandler).toBe(true);
		expect(response.statusCode).toBe(400);
		expect(response.message).toBe("Fields cannot be empty!");
	});
});

describe("Given valid credentials,", () => {
	it("create user service creates and returns new user", async () => {
		const user = {
			name: "test",
			email: "test@test.com",
			password: "12345",
			confirmPassword: "12345",
		};
		mockingoose(Users).toReturn(user, "save");
		const response = await createUserService(user);
		expect(response.body.name).toBe(user.name);
	});

	it("login user service should return correct user", async () => {
		const checkPasswordSpy = jest.spyOn(passwordUtil, "checkPassword");
		checkPasswordSpy.mockReturnValue(true);
		const user = {
			email: "test@test.com",
			password: "1234567",
		};
		mockingoose(Users).toReturn(user, "findOne");

		const response = await loginUserService(user);

		expect(response.body.email).toBe(user.email);

		checkPasswordSpy.mockRestore();
	});

	it("update user service should return updated user", async () => {
		const user = {
			email: "test@test.com",
			password: "12345",
			name: "new name",
		};
		mockingoose(Users).toReturn(user, "findOne");
		mockingoose(Users).toReturn(user, "findOneAndUpdate");

		const response = await updateUserService(user);

		expect(response.body.name).toBe(user.name);
	});

	it("delete user service returns deleted user", async () => {
		const user = {
			id: 1,
			email: "test@test.com",
			password: "12345",
		};
		mockingoose(Users).toReturn(user, "findOneAndRemove");

		const response = await deleteUserService(1);

		expect(response.body.email).toBe(user.email);
	});
});

describe("Given invalid credentials,", () => {
	describe("Given password is incorrect,", () => {
		it("login user service returns 400 error response", async () => {
			const checkPasswordSpy = jest.spyOn(passwordUtil, "checkPassword");
			checkPasswordSpy.mockReturnValue(false);
			const user = {
				email: "test@test.com",
				password: "12345",
			};
			mockingoose(Users).toReturn(user, "findOne");

			const response = await loginUserService(user);

			expect(response instanceof ErrorHandler).toBe(true);
			expect(response.statusCode).toBe(400);
			expect(response.message).toBe("Incorrect email/password.");
		});
	});

	describe("Given passwords do not match,", () => {
		it("create user service returns 400 error response", async () => {
			const user = {
				email: "test@test.com",
				password: "12345",
				confirmPassword: "1234",
				name: "test",
			};
			mockingoose(Users).toReturn(user, "save");

			const response = await createUserService(user);

			expect(response instanceof ErrorHandler).toBe(true);
			expect(response.statusCode).toBe(400);
			expect(response.message).toBe("Passwords do not match!");
		});
	});

	describe("Given email is already registered,", () => {
		it("create user service returns 400 error response", async () => {
			const user = {
				email: "test@test.com",
				password: "12345",
				confirmPassword: "12345",
				name: "test",
			};
			mockingoose(Users).toReturn(user, "findOne");

			const response = await createUserService(user);

			expect(response instanceof ErrorHandler).toBe(true);
			expect(response.statusCode).toBe(400);
			expect(response.message).toBe("Account with given email already exists!");
		});
	});

	describe("Given account does not exists,", () => {
		it("login service returns 400 error response", async () => {
			const user = {
				email: "test@test.com",
				password: "12345",
			};
			mockingoose(Users).toReturn(null, "findOne");

			const response = await loginUserService(user);
			expect(response.statusCode).toBe(400);
			expect(response.message).toBe("User with given email not found!");
		});

		it("update user service returns 400 error response", async () => {
			const user = {
				email: "test@test.com",
				password: "12345",
			};
			mockingoose(Users).toReturn(null, "findOne");

			const response = await updateUserService(user);
			expect(response.statusCode).toBe(400);
			expect(response.message).toBe("Account does not exists!");
		});

		it("delete user service returns 400 error response", async () => {
			mockingoose(Users).toReturn(null, "findOneAndRemove");

			const response = await deleteUserService();
			expect(response.statusCode).toBe(400);
			expect(response.message).toBe("User does not exists!");
		});
	});
});

describe("Given request to get all users,", () => {
	it("get users service returns all users", async () => {
		mockingoose(Users).toReturn(
			[
				{
					email: "test@test.com",
					password: "12345",
				},
				{
					email: "test@test.com",
					password: "12345",
				},
				{
					email: "test@test.com",
					password: "12345",
				},
			],
			"find",
		);

		const response = await getUsersService();

		expect(response.body.length).toBe(3);
	});
});
