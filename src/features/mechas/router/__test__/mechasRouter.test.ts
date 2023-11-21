import "../../../../server/index";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { connectToDataBase } from "../../../../database/index";
import mongoose from "mongoose";
import type { MechaApiStructure, MechaStructure } from "../../types";
import mechasMock from "../../mocks/mechasMock";
import app from "../../../../server/app";
import Mechas from "../../model/Mechas";
import { mechasWithOutId } from "../../utils/mechasUtils";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDataBase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

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
