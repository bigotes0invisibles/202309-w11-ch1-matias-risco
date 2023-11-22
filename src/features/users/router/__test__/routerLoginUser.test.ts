import request from "supertest";
import app from "../../../../server/app";

describe("Given POST /login endpoint", () => {
  describe("When it receives a request with username:'B0Invisibles' and password:'tumadre' ", () => {
    test("Then it should respond with a status 200 and a token", async () => {
      const expectedStatus = 200;
      const mechasPath = "/user/login";

      const response = await request(app)
        .post(mechasPath)
        .send({ username: "B0Invisibles", password: "tumadre" })
        .expect(expectedStatus);

      const responseBody = response.body as { token: string };

      expect(responseBody.token).not.toBeUndefined();
    });
  });
});
