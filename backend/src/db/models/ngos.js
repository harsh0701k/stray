const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const ngos = sequelize.define(
    'ngos',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      address: {
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

  ngos.associate = (db) => {
    db.ngos.belongsToMany(db.users, {
      as: 'members',
      foreignKey: {
        name: 'ngos_membersId',
      },
      constraints: false,
      through: 'ngosMembersUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.ngos.belongsTo(db.ngo, {
      as: 'ngo',
      foreignKey: {
        name: 'ngoId',
      },
      constraints: false,
    });

    db.ngos.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.ngos.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return ngos;
};
