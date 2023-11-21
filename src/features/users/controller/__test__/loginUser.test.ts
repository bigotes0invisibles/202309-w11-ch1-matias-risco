import type { Request, Response } from "express";
import {
  type UserCredentialStructure,
  type UserMongooseRepositoryStructure,
} from "../../types";
import usersMock from "../../mocks/mockData";
import UserController from "../UserController";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Given the function getmechas in MechasController", () => {
  const userMockRepository: UserMongooseRepositoryStructure = {
    async getUser(username, password) {
      const user = usersMock.find(
        (user) => user.user === username && user.password === password,
      );

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const userController = new UserController(userMockRepository);
  process.env.JWT_SECRET_KEY = "vareipohu3492t87hHBERG6JPT908456EGHW9-8J";

  describe("When it is call with a Response and Request with a body with the user B0Invisibles and password tumadre as a parameter ", () => {
    const req: Pick<UserCredentialStructure, "body"> = {
      body: {
        username: "B0Invisibles",
        password: "tumadre",
      },
    };

    test("then it should call json with message { token:(starting with)'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' }", async () => {
      const expectedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith({
        token: expect.stringContaining(expectedToken) as string,
      });
    });

    test("then it should call status with 200", async () => {
      const expectstatus = 200;
      const userController = new UserController(userMockRepository);

      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectstatus);
    });
  });

  describe("When it is call with a Response and Request with a body with the user Bob and password 123456 as a parameter ", () => {
    const req: Pick<UserCredentialStructure, "body"> = {
      body: {
        username: "Bob",
        password: "123456",
      },
    };

    test("then it should call json with message { error:'User not found' }", async () => {
      const expectedMessage = { error: "User not found" };
      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });

    test("then it should call status with 401", async () => {
      const expectstatus = 401;
      const userController = new UserController(userMockRepository);

      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectstatus);
    });
  });
});
