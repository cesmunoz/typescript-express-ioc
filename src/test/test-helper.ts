import { MongoMemoryServer } from "mongodb-memory-server";
import DataAccess = require("../util/DataAccess");

const server = new MongoMemoryServer();

export const createDB = async () => {
  try {
    const url = await server.getConnectionString();
    DataAccess.connect(url);
  } catch (err) {
    throw err;
  }
};

export const destroyDB = async () => {
  await DataAccess.disconnect();
};
