const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('SuperAdmin'),
        name: 'Super Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('LeadAnimalRescuer'),
        name: 'Lead Animal Rescuer',
        createdAt,
        updatedAt,
      },

      {
        id: getId('VeterinarySpecialist'),
        name: 'Veterinary Specialist',
        createdAt,
        updatedAt,
      },

      {
        id: getId('FieldCoordinator'),
        name: 'Field Coordinator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('AnimalWelfareOfficer'),
        name: 'Animal Welfare Officer',
        createdAt,
        updatedAt,
      },

      { id: getId('DataAnalyst'), name: 'Data Analyst', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'alerts',
      'animals',
      'health_reports',
      'ngos',
      'roles',
      'permissions',
      'ngo',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.bulkUpdate(
      'roles',
      { globalAccess: true },
      { id: getId('SuperAdmin') },
    );

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataAnalyst'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('CREATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('READ_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('UPDATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('DELETE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('CREATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('READ_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('UPDATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('DELETE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('CREATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('READ_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('UPDATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('DELETE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('CREATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('READ_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('UPDATE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('DELETE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataAnalyst'),
        permissionId: getId('READ_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('CREATE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('READ_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('UPDATE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('DELETE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('CREATE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('READ_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('UPDATE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('DELETE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('CREATE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('READ_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('UPDATE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('DELETE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('READ_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('UPDATE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataAnalyst'),
        permissionId: getId('READ_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('CREATE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('READ_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('UPDATE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('DELETE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('CREATE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('READ_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('UPDATE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('DELETE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('READ_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('UPDATE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('READ_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('UPDATE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataAnalyst'),
        permissionId: getId('READ_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('CREATE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('READ_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('UPDATE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('DELETE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('READ_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('UPDATE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('READ_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('UPDATE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('READ_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('UPDATE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataAnalyst'),
        permissionId: getId('READ_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('LeadAnimalRescuer'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VeterinarySpecialist'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('FieldCoordinator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('AnimalWelfareOfficer'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('DataAnalyst'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ALERTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ALERTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ALERTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ANIMALS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ANIMALS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ANIMALS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_HEALTH_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_HEALTH_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_HEALTH_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NGOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NGOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NGOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_NGO'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_NGO'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_NGO'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_NGO'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ALERTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ALERTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ALERTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ALERTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ANIMALS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ANIMALS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ANIMALS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ANIMALS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_HEALTH_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_HEALTH_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_HEALTH_REPORTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_HEALTH_REPORTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_NGOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_NGOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_NGOS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_NGOS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_NGO'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_NGO'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('UPDATE_NGO'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('DELETE_NGO'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SuperAdmin'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'LeadAnimalRescuer',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'VeterinarySpecialist',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
