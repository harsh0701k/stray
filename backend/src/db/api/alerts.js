const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AlertsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const alerts = await db.alerts.create(
      {
        id: data.id || undefined,

        type: data.type || null,
        triggered_at: data.triggered_at || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await alerts.setAnimal(data.animal || null, {
      transaction,
    });

    await alerts.setNotified_user(data.notified_user || null, {
      transaction,
    });

    await alerts.setNgo(data.ngo || null, {
      transaction,
    });

    return alerts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const alertsData = data.map((item, index) => ({
      id: item.id || undefined,

      type: item.type || null,
      triggered_at: item.triggered_at || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const alerts = await db.alerts.bulkCreate(alertsData, { transaction });

    // For each item created, replace relation files

    return alerts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const alerts = await db.alerts.findByPk(id, {}, { transaction });

    await alerts.update(
      {
        type: data.type || null,
        triggered_at: data.triggered_at || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await alerts.setAnimal(data.animal || null, {
      transaction,
    });

    await alerts.setNotified_user(data.notified_user || null, {
      transaction,
    });

    await alerts.setNgo(data.ngo || null, {
      transaction,
    });

    return alerts;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const alerts = await db.alerts.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of alerts) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of alerts) {
        await record.destroy({ transaction });
      }
    });

    return alerts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const alerts = await db.alerts.findByPk(id, options);

    await alerts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await alerts.destroy({
      transaction,
    });

    return alerts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const alerts = await db.alerts.findOne({ where }, { transaction });

    if (!alerts) {
      return alerts;
    }

    const output = alerts.get({ plain: true });

    output.animal = await alerts.getAnimal({
      transaction,
    });

    output.notified_user = await alerts.getNotified_user({
      transaction,
    });

    output.ngo = await alerts.getNgo({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.animals,
        as: 'animal',
      },

      {
        model: db.users,
        as: 'notified_user',
      },

      {
        model: db.ngo,
        as: 'ngo',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.type) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('alerts', 'type', filter.type),
        };
      }

      if (filter.triggered_atRange) {
        const [start, end] = filter.triggered_atRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            triggered_at: {
              ...where.triggered_at,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            triggered_at: {
              ...where.triggered_at,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.animal) {
        const listItems = filter.animal.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          animalId: { [Op.or]: listItems },
        };
      }

      if (filter.notified_user) {
        const listItems = filter.notified_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          notified_userId: { [Op.or]: listItems },
        };
      }

      if (filter.ngo) {
        const listItems = filter.ngo.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          ngoId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.alerts.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.alerts.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('alerts', 'type', query),
        ],
      };
    }

    const records = await db.alerts.findAll({
      attributes: ['id', 'type'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['type', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.type,
    }));
  }
};
