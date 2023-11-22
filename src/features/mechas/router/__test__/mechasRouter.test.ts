import request from "supertest";
import type { MechaStructure } from "../../types";
import mechasMock from "../../mocks/mechasMock";
import app from "../../../../server/app";
import Mechas from "../../model/Mechas";
import { mechasWithOutId } from "../../utils/mechasUtils";

describe("Given GET /mechas endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and a list of mechas", async () => {
      const expectedStatus = 200;
      const expectedData = mechasWithOutId(mechasMock);
      const mechasPath = "/mechas";

      await Mechas.create(mechasMock);

      const response = await request(app)
        .get(mechasPath)
        .expect(expectedStatus);

      const responseBody = response.body as { mechas: MechaStructure[] };

      expect(responseBody.mechas).toEqual(
        expect.arrayContaining([
          expect.objectContaining(expectedData[0]),
          expect.objectContaining(expectedData[1]),
        ]),
      );
    });
  });
});
