import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";
import { PlayerService } from "../services/PlayerServices";
import { HttpException } from "../util/httpException";
import TYPES from "../constants/Types";
import Player, { IPlayerModel } from "../models/Player";

@controller("/players")
export class PlayerController {
  constructor(@inject(TYPES.PlayerService) private service: PlayerService) {}

  @httpGet("/")
  public async get(req: Request, res: Response): Promise<IPlayerModel[]> {
    return this.service.get();
  }

  @httpGet("/:id")
  public async getById(req: Request): Promise<IPlayerModel> {
    return this.service.getById(req.params.id);
  }

  @httpPost("/")
  public async post(req: Request, res: Response): Promise<void> {
    const body = req.body;
    if (
      !body.firstname ||
      !body.lastname ||
      !body.hometown ||
      !body.country ||
      !body.winnings
    ) {
      res.status(400).json({
        status: 400,
        message: "Missing some fields"
      });
    }

    const model = new Player({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      hometown: req.body.hometown,
      country: req.body.country,
      winnings: req.body.winnings
    });

    const result = await this.service.post(model);
    res.status(201).json(result);
  }

  @httpPut("/:id")
  public async put(req: Request): Promise<IPlayerModel> {
    const model = new Player({
      _id: req.params.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      hometown: req.body.hometown,
      country: req.body.country,
      winnings: req.body.winnings
    });
    return this.service.put(req.params.id, model);
  }

  @httpDelete("/:id")
  public async deleteById(req: Request, res: Response): Promise<void> {
    this.service.deleteById(req.params.id);
    res.status(204);
  }
}
