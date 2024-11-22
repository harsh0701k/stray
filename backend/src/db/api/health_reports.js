const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Health_reportsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const health_reports = await db.health_reports.create(
      {
        id: data.id || undefined,

        report_date: data.report_date || null,
        details: data.details || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await health_reports.setAnimal(data.animal || null, {
      transaction,
    });

    await health_reports.setNgo(data.ngo || null, {
      transaction,
    });

    return health_reports;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const health_reportsData = data.map((item, index) => ({
      id: item.id || undefined,

      report_date: item.report_date || null,
      details: item.details || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const health_reports = await db.health_reports.bulkCreate(
      health_reportsData,
      { transaction },
    );

    // For each item created, replace relation files

    return health_reports;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const health_reports = await db.health_reports.findByPk(
      id,
      {},
      { transaction },
    );

    await health_reports.update(
      {
        report_date: data.report_date || null,
        details: data.details || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await health_reports.setAnimal(data.animal || null, {
      transaction,
    });

    await health_reports.setNgo(data.ngo || null, {
      transaction,
    });

    return health_reports;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const health_reports = await db.health_reports.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of health_reports) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of health_reports) {
        await record.destroy({ transaction });
      }
    });

    return health_reports;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const health_reports = await db.health_reports.findByPk(id, options);

    await health_reports.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await health_reports.destroy({
      transaction,
    });

    return health_reports;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const health_reports = await db.health_reports.findOne(
      { where },
      { transaction },
    );

    if (!health_reports) {
      return health_reports;
    }

    const output = health_reports.get({ plain: true });

    output.animal = await health_reports.getAnimal({
      transaction,
    });

    output.ngo = await health_reports.getNgo({
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

      if (filter.details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('health_reports', 'details', filter.details),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              report_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              report_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.report_dateRange) {
        const [start, end] = filter.report_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            report_date: {
              ...where.report_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            report_date: {
              ...where.report_date,
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
          count: await db.health_reports.count({
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
      : await db.health_reports.findAndCountAll({
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
          Utils.ilike('health_reports', 'report_date', query),
        ],
      };
    }

    const records = await db.health_reports.findAll({
      attributes: ['id', 'report_date'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['report_date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.report_date,
    }));
  }
};
