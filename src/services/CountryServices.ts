import { Request, Response } from "express";
import { injectable } from "inversify";
import { inject } from "inversify";
import Country, { ICountryModel } from "../models/Country";
import TYPES from "../constants/Types";
import CountryRepository = require("../repository/CountryRepository");

@injectable()
export class CountryService {
  constructor(
    @inject(TYPES.CountryRepository) private repository: CountryRepository
  ) {}

  public async get() {
    return this.repository.getAll({
      description: "asc"
    });
  }
}
