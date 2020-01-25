import Sequelize, { model } from "sequelize";
import User from "..//app/models/User";
import Post from "../app/models/Post";
import Event from "../app/models/Event";
import EventsUsers from "../app/models/EventsUsers";

import databaseConfig from "../config/database";

const models = [User, Post, Event, EventsUsers];

class Database {
  constructor() {
    this.init();
  }
  init() {
    if (process.env.NODE_ENV == "development") {
      this.connection = new Sequelize(databaseConfig);
    } else {
      this.connection = new Sequelize(process.env.CLEARDB_DATABASE_URL);
    }

    //verificar porque foi passado o associate
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
