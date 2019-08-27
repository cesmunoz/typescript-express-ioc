import mongoose, { Schema } from "mongoose";
import DataAccess = require("../util/DataAccess");

const Connection = DataAccess.connection;

export interface ICountryModel extends mongoose.Document {
  description: string;
  abbreviation: string;
}

const CountrySchema = new Schema({
  description: {
    type: String,
    required: "Enter a description"
  },
  abbreviation: {
    type: String,
    required: "Enter a abbrevation"
  }
});

export default Connection.model<ICountryModel>("Country", CountrySchema);
