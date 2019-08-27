import { RepositoryBase } from "./base/RepositoryBase";
import Country, { ICountryModel } from "../models/Country";
import { injectable } from "inversify";

class CountryRepository extends RepositoryBase<ICountryModel> {
  constructor() {
    super(Country);
  }
}

Object.seal(CountryRepository);
export = CountryRepository;
