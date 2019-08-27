import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { CountryService } from "../services/CountryServices";
import { HttpException } from "../util/httpException";
import TYPES from "../constants/Types";
import Country, { ICountryModel } from "../models/Country";

@controller("/countries")
export class CountryController {
  constructor(@inject(TYPES.CountryService) private service: CountryService) {}

  @httpGet("/")
  public async get(req: Request, res: Response): Promise<ICountryModel[]> {
    return this.service.get();
  }
}
