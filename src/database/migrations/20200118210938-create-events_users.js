"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("events_users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: "events", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      created_at: {
        type: "TIMESTAMP",
        allowNull: false
      },
      updated_at: {
        type: "TIMESTAMP",
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("events_users");
  }
};
