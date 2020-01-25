import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        description: Sequelize.STRING,
        mandate: Sequelize.STRING,
        url_image: Sequelize.STRING,
        technologies: Sequelize.STRING,
        is_admin: Sequelize.BOOLEAN,
        token: Sequelize.STRING,
        token_created_at: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsToMany(models.Event, {
      through: "EventsUsers",
      foreignKey: "user_id",
      as: "events"
    });
  }
}

export default User;
