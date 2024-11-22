const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const animals = sequelize.define(
    'animals',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      species: {
        type: DataTypes.TEXT,
      },

      heart_rate: {
        type: DataTypes.DECIMAL,
      },

      temperature: {
        type: DataTypes.DECIMAL,
      },

      location: {
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

  animals.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.animals.hasMany(db.alerts, {
      as: 'alerts_animal',
      foreignKey: {
        name: 'animalId',
      },
      constraints: false,
    });

    db.animals.hasMany(db.health_reports, {
      as: 'health_reports_animal',
      foreignKey: {
        name: 'animalId',
      },
      constraints: false,
    });

    //end loop

    db.animals.belongsTo(db.users, {
      as: 'assigned_caregiver',
      foreignKey: {
        name: 'assigned_caregiverId',
      },
      constraints: false,
    });

    db.animals.belongsTo(db.ngo, {
      as: 'ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.animals.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.animals.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return animals;
};
