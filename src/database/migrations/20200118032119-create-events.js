"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("events", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      limit_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      event_end_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
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
    return queryInterface.dropTable("events");
  }
};
