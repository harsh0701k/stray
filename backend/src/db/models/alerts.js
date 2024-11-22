const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const alerts = sequelize.define(
    'alerts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      type: {
        type: DataTypes.TEXT,
      },

      triggered_at: {
        type: DataTypes.DATE,
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

  alerts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.alerts.belongsTo(db.animals, {
      as: 'animal',
      foreignKey: {
        name: 'animalId',
      },
      constraints: false,
    });

    db.alerts.belongsTo(db.users, {
      as: 'notified_user',
      foreignKey: {
        name: 'notified_userId',
      },
      constraints: false,
    });

    db.alerts.belongsTo(db.ngo, {
      as: 'ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.alerts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.alerts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return alerts;
};
