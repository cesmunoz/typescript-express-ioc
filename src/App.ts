import { Request, Response } from "express";
import "reflect-metadata";
import * as bodyParser from "body-parser";
import { Container } from "inversify";
import { PlayerService } from "./services/PlayerServices";
import { CountryService } from "./services/CountryServices";
import { InversifyExpressServer, interfaces } from "inversify-express-utils";
import TYPES from "./constants/Types";
import DataAccess = require("./util/DataAccess");
import "./controllers/PlayerController";
import "./controllers/CountryController";
import cors from "cors";
import dotenv from "dotenv";
import PlayerRepository = require("./repository/PlayerRepository");
import CountryRepository = require("./repository/CountryRepository");

dotenv.config();

const port = process.env.PORT || 8000;

const container = new Container();
container.bind<DataAccess>(TYPES.DataAccess).to(DataAccess);
container.bind<PlayerService>(TYPES.PlayerService).to(PlayerService);
container.bind<PlayerRepository>(TYPES.PlayerRepository).to(PlayerRepository);
container.bind<CountryService>(TYPES.CountryService).to(CountryService);
container
  .bind<CountryRepository>(TYPES.CountryRepository)
  .to(CountryRepository);

const server = new InversifyExpressServer(container);
server.setConfig(app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cors());

  app.get("/", (req: Request, res: Response) =>
    res.send(200).send("Welcome to FWI Code Challenge API")
  );
});

const app = server.build();
app.listen(port, () => console.log(`Server listening on port ${port}`));

export default app;
