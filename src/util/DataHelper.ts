import mongoose, { Collection } from "mongoose";
import Country from "../models/Country";
import Player from "../models/Player";
import DataAccess = require("./DataAccess");

export class DataHelper {
  static async checkData(connection: any) {
    // eslint:disable-next-line
    const countries = require("./mock/countries.json");
    // eslint:disable-next-line
    const players = require("./mock/players.json");

    const countryCollection = await connection.db
      .listCollections({
        name: "countries"
      })
      .next();

    if (!countryCollection) {
      await connection.db.collection("countries").insertMany(countries);
    }

    const playerCollection = await connection.db
      .listCollections({
        name: "players"
      })
      .next();

    if (!playerCollection) {
      players.forEach(element => {
        var country = countries[Math.floor(Math.random() * countries.length)];
        element.country = country._id;
      });

      await connection.db.collection("players").insertMany(players);
    }
  }
}
