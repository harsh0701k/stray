const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class NgosDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const ngos = await db.ngos.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        address: data.address || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await ngos.setNgo(data.ngo || null, {
      transaction,
    });

    await ngos.setMembers(data.members || [], {
      transaction,
    });

    return ngos;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const ngosData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      address: item.address || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const ngos = await db.ngos.bulkCreate(ngosData, { transaction });

    // For each item created, replace relation files

    return ngos;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const ngos = await db.ngos.findByPk(id, {}, { transaction });

    await ngos.update(
      {
        name: data.name || null,
        address: data.address || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await ngos.setNgo(data.ngo || null, {
      transaction,
    });

    await ngos.setMembers(data.members || [], {
      transaction,
    });

    return ngos;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const ngos = await db.ngos.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of ngos) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of ngos) {
        await record.destroy({ transaction });
      }
    });

    return ngos;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const ngos = await db.ngos.findByPk(id, options);

    await ngos.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await ngos.destroy({
      transaction,
    });

    return ngos;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const ngos = await db.ngos.findOne({ where }, { transaction });

    if (!ngos) {
      return ngos;
    }

    const output = ngos.get({ plain: true });

    output.members = await ngos.getMembers({
      transaction,
    });

    output.ngo = await ngos.getNgo({
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
        model: db.ngo,
        as: 'ngo',
      },

      {
        model: db.users,
        as: 'members',
        through: filter.members
          ? {
              where: {
                [Op.or]: filter.members.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.members ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('ngos', 'name', filter.name),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('ngos', 'address', filter.address),
        };
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
          count: await db.ngos.count({
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
      : await db.ngos.findAndCountAll({
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
          Utils.ilike('ngos', 'name', query),
        ],
      };
    }

    const records = await db.ngos.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
