const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const ngo = sequelize.define(
    'ngo',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  ngo.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.ngo.hasMany(db.users, {
      as: 'users_ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.ngo.hasMany(db.alerts, {
      as: 'alerts_ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.ngo.hasMany(db.animals, {
      as: 'animals_ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.ngo.hasMany(db.health_reports, {
      as: 'health_reports_ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.ngo.hasMany(db.ngos, {
      as: 'ngos_ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    //end loop

    db.ngo.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.ngo.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return ngo;
};
