import { Request, Response } from "express";
import { injectable } from "inversify";
import { inject } from "inversify";
import Player, { IPlayerModel } from "../models/Player";
import TYPES from "../constants/Types";
import PlayerRepository = require("../repository/PlayerRepository");

@injectable()
export class PlayerService {
  constructor(
    @inject(TYPES.PlayerRepository) private repository: PlayerRepository
  ) {}

  public async get() {
    return this.repository.getAll({
      winnings: "desc"
    });
  }

  public async getById(id: number) {
    return await Player.findById(id);
  }

  public async post(player: IPlayerModel) {
    const result = await player.save();
    return result;
  }

  public async put(id: string, player: IPlayerModel) {
    return await Player.findOneAndUpdate({ _id: id }, player, {
      new: true
    });
  }

  public async deleteById(id: string) {
    return await Player.findByIdAndDelete({ _id: id });
  }
}
