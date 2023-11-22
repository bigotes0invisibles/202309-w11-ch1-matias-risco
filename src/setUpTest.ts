import "dotenv/config";
import "./server/index";
import MongoMemoryServer from "mongodb-memory-server-core";
import connectToDataBase from "./database";
import mongoose from "mongoose";
import User from "./features/users/model/Users";
import usersMock from "./features/users/mocks/mockData";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDataBase(mongoDbUrl);
  await User.create(usersMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});
