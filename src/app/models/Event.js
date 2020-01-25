import Sequelize, { Model } from "sequelize";

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        url_image: Sequelize.STRING,
        event_date: Sequelize.DATE,
        limit_date: Sequelize.DATE,
        event_end_date: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    return this;
  }
  //    WorkingDay.belongsToMany(models.User, {through: 'UsersWorkingDays', foreignKey: 'workingDayId', as: 'employes'})
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsToMany(models.User, {
      through: "EventsUsers",
      foreignKey: "event_id",
      as: "users"
    });
  }
}

export default Event;
