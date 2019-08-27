import mongoose, { Schema } from "mongoose";
import DataAccess = require("../util/DataAccess");

const Connection = DataAccess.connection;

export interface IPlayerModel extends mongoose.Document {
  firstname: string;
  lastname: string;
  hometown: string;
  country: string;
  winnings: string;
}

const PlayerSchema = new Schema({
  firstname: {
    type: String,
    required: "Enter a first name"
  },
  lastname: {
    type: String,
    required: "Enter a last name"
  },
  hometown: {
    type: String,
    required: "Enter a hometown"
  },
  winnings: {
    type: String,
    required: "Enter a winning amount"
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country"
  }
});

export default Connection.model<IPlayerModel>("Player", PlayerSchema);
