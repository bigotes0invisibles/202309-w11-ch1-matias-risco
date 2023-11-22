import type { Request, Response } from "express";
import { notFound } from "./errorMiddleware";
import type CustomError from "../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the middleware notFound", () => {
  describe("When notfound is call with a Response as a parameter", () => {
    test("Then it should call next with  error: 404 'Endpoint not found'", () => {
      const request = {};
      const response: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      const expectedError: Partial<CustomError> = {
        message: "Endpoint not found",
        statusCode: 404,
      };

      notFound(request as Request, response as Response, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
