import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
import { DataHelper } from "./DataHelper";

dotenv.config();

const connectionString =
  process.env.DB_CONNECTION || "mongodb://localhost:27017";
const databaseName = process.env.DB_NAME || "db";

class DataAccess {
  static instance: any;
  static connection: mongoose.Connection;

  static async connect(connectionString: string): Promise<mongoose.Connection> {
    if (this.instance) {
      return this.instance;
    }

    this.connection = mongoose.connection;
    this.connection.once("open", () => {
      console.log("Connect to mongo database");

      if (process.env.NODE_ENV !== "test") {
        DataHelper.checkData(DataAccess.connection);
      }
    });

    if (process.env.NODE_ENV === "test") {
      const server = new MongoMemoryServer();
      connectionString = await server.getConnectionString();
    }

    this.instance = await mongoose.connect(`${connectionString}`, {
      useNewUrlParser: true
    });
    return this.instance;
  }

  static async disconnect() {
    await this.connection.close();
  }
}

DataAccess.connect(`${connectionString}/${databaseName}`);
export = DataAccess;
