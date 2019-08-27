const TYPES = {
  DataAccess: Symbol.for("DataAccess"),
  PlayerService: Symbol.for("PlayerService"),
  PlayerRepository: Symbol.for("PlayerRepository"),
  CountryService: Symbol.for("CountryService"),
  CountryRepository: Symbol.for("CountryRepository"),
  RepositoryBase: Symbol.for("RepositoryBase<IPlayer>")
};

export default TYPES;
