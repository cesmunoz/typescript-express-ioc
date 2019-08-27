import request from "supertest";
import { createDB, destroyDB } from "./test-helper";
import Player, { IPlayerModel } from "../models/Player";
import app from "../App";
import { Response } from "express";
import DataAccess = require("../util/DataAccess");
import { RepositoryBase } from "../repository/base/RepositoryBase";
import Country from "../models/Country";

describe("Players API", () => {
  beforeAll(async () => {
    await DataAccess.connect("test");

    // eslint:disable-next-line
    const countries = require("../util/mock/countries.json");
    // eslint:disable-next-line
    const players = require("../util/mock/players.json");

    await Country.collection.insertMany(countries);

    players.forEach(element => {
      var country = countries[Math.floor(Math.random() * countries.length)];
      element.country = country._id;
    });

    await Player.collection.insertMany(players);
  });

  afterAll(async () => {
    await destroyDB();
  });

  it("Get players successfully", async done => {
    const response = await request(app).get("/players");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);

    done();
  });

  it("Post Player successfully", async done => {
    const countries: any = await request(app).get("/countries");

    const model = new Player({
      firstname: "Test FistName",
      lastname: "Test LastName",
      hometown: "Test Hometown",
      winnings: "11.11",
      country: countries.body[0]._id
    });

    const response: any = await request(app)
      .post("/players")
      .send(model);

    const player: any = await request(app).get(`/players/${response.body.id}`);

    expect(response.status).toBe(201);
    expect(response._id).toBe(player._id);
    expect(response.firstname).toBe(player.firstname);
    expect(response.lastname).toBe(player.lastname);
    expect(response.hometown).toBe(player.hometown);
    expect(response.country).toBe(player.country);

    done();
  });

  it("Put Player successfully", async done => {
    const countries: any = await request(app).get("/countries");

    const model = new Player({
      firstname: "Test FistName",
      lastname: "Test LastName",
      hometown: "Test Hometown",
      winnings: "11.11",
      country: countries.body[0]._id
    });

    const responseCreate: any = await request(app)
      .post("/players")
      .send(model);

    const updateModel = new Player({
      _id: responseCreate.body._id,
      firstname: "FistName",
      lastname: "LastName",
      hometown: "Hometown",
      winnings: "22.22",
      country: countries.body[1]._id
    });

    const response: any = await request(app)
      .put(`/players/${updateModel._id}`)
      .send(updateModel);

    const player: any = await request(app).get(`/players/${response.body._id}`);

    expect(response.status).toBe(200);
    expect(response._id).toBe(player._id);
    expect(response.firstname).toBe(player.firstname);
    expect(response.lastname).toBe(player.lastname);
    expect(response.hometown).toBe(player.hometown);
    expect(response.country).toBe(player.country);

    done();
  });

  it("Delete Player successfully", async done => {
    const players: any = await request(app).get(`/players`);

    const [player] = players.body;
    const responseDelete: any = await request(app).delete(
      `/players/${player._id}`
    );

    const responseAll: any = await request(app).get(`/players`);

    expect(responseDelete.status).toBe(204);
    expect(responseAll).not.toContain(player);

    done();
  });
});
