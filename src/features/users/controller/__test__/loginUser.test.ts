import type { Response } from "express";
import {
  type UserCredentialStructure,
  type UserMongooseRepositoryStructure,
} from "../../types";
import usersMock from "../../mocks/mockData";
import UserController from "../UserController";
import { type NextFunction } from "connect";
import type CustomError from "../../../../CustomError/CustomError";

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
  const next = jest.fn();

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
        next as NextFunction,
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
        next as NextFunction,
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

    test("then it should call next with 'Error bad credentials' 401 error", async () => {
      const expectedError: Partial<CustomError> = {
        statusCode: 401,
        message: "Error bad credentials",
      };

      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
