const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AnimalsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const animals = await db.animals.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        species: data.species || null,
        heart_rate: data.heart_rate || null,
        temperature: data.temperature || null,
        location: data.location || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await animals.setAssigned_caregiver(data.assigned_caregiver || null, {
      transaction,
    });

    await animals.setNgo(data.ngo || null, {
      transaction,
    });

    return animals;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const animalsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      species: item.species || null,
      heart_rate: item.heart_rate || null,
      temperature: item.temperature || null,
      location: item.location || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const animals = await db.animals.bulkCreate(animalsData, { transaction });

    // For each item created, replace relation files

    return animals;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const animals = await db.animals.findByPk(id, {}, { transaction });

    await animals.update(
      {
        name: data.name || null,
        species: data.species || null,
        heart_rate: data.heart_rate || null,
        temperature: data.temperature || null,
        location: data.location || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await animals.setAssigned_caregiver(data.assigned_caregiver || null, {
      transaction,
    });

    await animals.setNgo(data.ngo || null, {
      transaction,
    });

    return animals;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const animals = await db.animals.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of animals) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of animals) {
        await record.destroy({ transaction });
      }
    });

    return animals;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const animals = await db.animals.findByPk(id, options);

    await animals.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await animals.destroy({
      transaction,
    });

    return animals;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const animals = await db.animals.findOne({ where }, { transaction });

    if (!animals) {
      return animals;
    }

    const output = animals.get({ plain: true });

    output.alerts_animal = await animals.getAlerts_animal({
      transaction,
    });

    output.health_reports_animal = await animals.getHealth_reports_animal({
      transaction,
    });

    output.assigned_caregiver = await animals.getAssigned_caregiver({
      transaction,
    });

    output.ngo = await animals.getNgo({
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
        model: db.users,
        as: 'assigned_caregiver',
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

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('animals', 'name', filter.name),
        };
      }

      if (filter.species) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('animals', 'species', filter.species),
        };
      }

      if (filter.location) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('animals', 'location', filter.location),
        };
      }

      if (filter.heart_rateRange) {
        const [start, end] = filter.heart_rateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            heart_rate: {
              ...where.heart_rate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            heart_rate: {
              ...where.heart_rate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.temperatureRange) {
        const [start, end] = filter.temperatureRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            temperature: {
              ...where.temperature,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            temperature: {
              ...where.temperature,
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

      if (filter.assigned_caregiver) {
        const listItems = filter.assigned_caregiver.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assigned_caregiverId: { [Op.or]: listItems },
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
          count: await db.animals.count({
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
      : await db.animals.findAndCountAll({
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
          Utils.ilike('animals', 'name', query),
        ],
      };
    }

    const records = await db.animals.findAll({
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
