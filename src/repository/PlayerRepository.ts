import { RepositoryBase } from "./base/RepositoryBase";
import Player, { IPlayerModel } from "../models/Player";
import { injectable } from "inversify";

class PlayerRepository extends RepositoryBase<IPlayerModel> {
  constructor() {
    super(Player);
  }
}

Object.seal(PlayerRepository);
export = PlayerRepository;
