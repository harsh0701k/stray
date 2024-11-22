const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const health_reports = sequelize.define(
    'health_reports',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      report_date: {
        type: DataTypes.DATE,
      },

      details: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  health_reports.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.health_reports.belongsTo(db.animals, {
      as: 'animal',
      foreignKey: {
        name: 'animalId',
      },
      constraints: false,
    });

    db.health_reports.belongsTo(db.ngo, {
      as: 'ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.health_reports.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.health_reports.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return health_reports;
};
