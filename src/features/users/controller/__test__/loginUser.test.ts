import type { Request, Response } from "express";
import {
  type UserCredentialStructure,
  type UserMongooseRepositoryStructure,
} from "../../types";
import usersMock from "../../mocks/mockData";
import UserController from "../UserController";

describe("Given the function getmechas in MechasController", () => {
  describe("When it is call with a Response as a parameter", () => {
    const userMockRepository: UserMongooseRepositoryStructure = {
      async getUser(username, password) {
        const user = usersMock.find(
          (user) => user.user === username && user.password === password,
        );

        if (!user) {
          throw new Error();
        }

        return user;
      },
    };
    const req: Pick<UserCredentialStructure, "body"> = {
      body: {
        username: "B0Invisibles",
        password: "tumadre",
      },
    };
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("then it should call status with 200 as a Code", async () => {
      const expectedMessage = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      const userController = new UserController(userMockRepository);
      process.env.JWT_SECRET_KEY = "vareipohu3492t87hHBERG6JPT908456EGHW9-8J";
      await userController.loginUser(
        req as UserCredentialStructure,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith({
        token: expect.stringContaining(expectedMessage) as string,
      });
    });
  });
});
