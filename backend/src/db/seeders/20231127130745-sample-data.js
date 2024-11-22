const db = require('../models');
const Users = db.users;

const Alerts = db.alerts;

const Animals = db.animals;

const HealthReports = db.health_reports;

const Ngos = db.ngos;

const Ngo = db.ngo;

const AlertsData = [
  {
    type: 'Medical Emergency',

    triggered_at: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: 'Location Alert',

    triggered_at: new Date('2023-10-02T12:30:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: 'Health Check',

    triggered_at: new Date('2023-10-03T15:45:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    type: 'Temperature Alert',

    triggered_at: new Date('2023-10-04T09:15:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const AnimalsData = [
  {
    name: 'Bella',

    species: 'Dog',

    heart_rate: 75,

    temperature: 38.5,

    location: 'Park Avenue',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Max',

    species: 'Cat',

    heart_rate: 120,

    temperature: 39,

    location: 'Downtown Shelter',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Charlie',

    species: 'Rabbit',

    heart_rate: 180,

    temperature: 38,

    location: 'Greenfield Farm',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Lucy',

    species: 'Bird',

    heart_rate: 250,

    temperature: 40,

    location: 'City Park',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const HealthReportsData = [
  {
    report_date: new Date('2023-09-25T14:00:00Z'),

    details: 'Bella is recovering well from surgery.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    report_date: new Date('2023-09-26T10:30:00Z'),

    details: 'Max has a slight fever, monitoring required.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    report_date: new Date('2023-09-27T16:00:00Z'),

    details: 'Charlie is in good health, no issues detected.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    report_date: new Date('2023-09-28T09:00:00Z'),

    details: 'Lucy has a minor wing injury, treatment ongoing.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const NgosData = [
  {
    name: 'Animal Rescue League',

    address: '123 Animal St, Cityville',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Wildlife Protectors',

    address: '456 Wildlife Ave, Townsville',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Stray Haven',

    address: '789 Stray Rd, Villagetown',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Paws and Claws',

    address: '321 Paws Ln, Metropolis',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const NgoData = [
  {
    name: 'Charles Darwin',
  },

  {
    name: 'William Herschel',
  },

  {
    name: 'Frederick Sanger',
  },

  {
    name: 'Arthur Eddington',
  },
];

// Similar logic for "relation_many"

async function associateUserWithNgo() {
  const relatedNgo0 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setNgo) {
    await User0.setNgo(relatedNgo0);
  }

  const relatedNgo1 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setNgo) {
    await User1.setNgo(relatedNgo1);
  }

  const relatedNgo2 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setNgo) {
    await User2.setNgo(relatedNgo2);
  }

  const relatedNgo3 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setNgo) {
    await User3.setNgo(relatedNgo3);
  }
}

async function associateAlertWithAnimal() {
  const relatedAnimal0 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const Alert0 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Alert0?.setAnimal) {
    await Alert0.setAnimal(relatedAnimal0);
  }

  const relatedAnimal1 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const Alert1 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Alert1?.setAnimal) {
    await Alert1.setAnimal(relatedAnimal1);
  }

  const relatedAnimal2 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const Alert2 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Alert2?.setAnimal) {
    await Alert2.setAnimal(relatedAnimal2);
  }

  const relatedAnimal3 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const Alert3 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Alert3?.setAnimal) {
    await Alert3.setAnimal(relatedAnimal3);
  }
}

async function associateAlertWithNotified_user() {
  const relatedNotified_user0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Alert0 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Alert0?.setNotified_user) {
    await Alert0.setNotified_user(relatedNotified_user0);
  }

  const relatedNotified_user1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Alert1 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Alert1?.setNotified_user) {
    await Alert1.setNotified_user(relatedNotified_user1);
  }

  const relatedNotified_user2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Alert2 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Alert2?.setNotified_user) {
    await Alert2.setNotified_user(relatedNotified_user2);
  }

  const relatedNotified_user3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Alert3 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Alert3?.setNotified_user) {
    await Alert3.setNotified_user(relatedNotified_user3);
  }
}

async function associateAlertWithNgo() {
  const relatedNgo0 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Alert0 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Alert0?.setNgo) {
    await Alert0.setNgo(relatedNgo0);
  }

  const relatedNgo1 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Alert1 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Alert1?.setNgo) {
    await Alert1.setNgo(relatedNgo1);
  }

  const relatedNgo2 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Alert2 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Alert2?.setNgo) {
    await Alert2.setNgo(relatedNgo2);
  }

  const relatedNgo3 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Alert3 = await Alerts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Alert3?.setNgo) {
    await Alert3.setNgo(relatedNgo3);
  }
}

async function associateAnimalWithAssigned_caregiver() {
  const relatedAssigned_caregiver0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Animal0 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Animal0?.setAssigned_caregiver) {
    await Animal0.setAssigned_caregiver(relatedAssigned_caregiver0);
  }

  const relatedAssigned_caregiver1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Animal1 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Animal1?.setAssigned_caregiver) {
    await Animal1.setAssigned_caregiver(relatedAssigned_caregiver1);
  }

  const relatedAssigned_caregiver2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Animal2 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Animal2?.setAssigned_caregiver) {
    await Animal2.setAssigned_caregiver(relatedAssigned_caregiver2);
  }

  const relatedAssigned_caregiver3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Animal3 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Animal3?.setAssigned_caregiver) {
    await Animal3.setAssigned_caregiver(relatedAssigned_caregiver3);
  }
}

async function associateAnimalWithNgo() {
  const relatedNgo0 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Animal0 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Animal0?.setNgo) {
    await Animal0.setNgo(relatedNgo0);
  }

  const relatedNgo1 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Animal1 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Animal1?.setNgo) {
    await Animal1.setNgo(relatedNgo1);
  }

  const relatedNgo2 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Animal2 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Animal2?.setNgo) {
    await Animal2.setNgo(relatedNgo2);
  }

  const relatedNgo3 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Animal3 = await Animals.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Animal3?.setNgo) {
    await Animal3.setNgo(relatedNgo3);
  }
}

async function associateHealthReportWithAnimal() {
  const relatedAnimal0 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const HealthReport0 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (HealthReport0?.setAnimal) {
    await HealthReport0.setAnimal(relatedAnimal0);
  }

  const relatedAnimal1 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const HealthReport1 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (HealthReport1?.setAnimal) {
    await HealthReport1.setAnimal(relatedAnimal1);
  }

  const relatedAnimal2 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const HealthReport2 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (HealthReport2?.setAnimal) {
    await HealthReport2.setAnimal(relatedAnimal2);
  }

  const relatedAnimal3 = await Animals.findOne({
    offset: Math.floor(Math.random() * (await Animals.count())),
  });
  const HealthReport3 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (HealthReport3?.setAnimal) {
    await HealthReport3.setAnimal(relatedAnimal3);
  }
}

async function associateHealthReportWithNgo() {
  const relatedNgo0 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const HealthReport0 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (HealthReport0?.setNgo) {
    await HealthReport0.setNgo(relatedNgo0);
  }

  const relatedNgo1 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const HealthReport1 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (HealthReport1?.setNgo) {
    await HealthReport1.setNgo(relatedNgo1);
  }

  const relatedNgo2 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const HealthReport2 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (HealthReport2?.setNgo) {
    await HealthReport2.setNgo(relatedNgo2);
  }

  const relatedNgo3 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const HealthReport3 = await HealthReports.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (HealthReport3?.setNgo) {
    await HealthReport3.setNgo(relatedNgo3);
  }
}

// Similar logic for "relation_many"

async function associateNgoWithNgo() {
  const relatedNgo0 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Ngo0 = await Ngos.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Ngo0?.setNgo) {
    await Ngo0.setNgo(relatedNgo0);
  }

  const relatedNgo1 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Ngo1 = await Ngos.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Ngo1?.setNgo) {
    await Ngo1.setNgo(relatedNgo1);
  }

  const relatedNgo2 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Ngo2 = await Ngos.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Ngo2?.setNgo) {
    await Ngo2.setNgo(relatedNgo2);
  }

  const relatedNgo3 = await Ngo.findOne({
    offset: Math.floor(Math.random() * (await Ngo.count())),
  });
  const Ngo3 = await Ngos.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Ngo3?.setNgo) {
    await Ngo3.setNgo(relatedNgo3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Alerts.bulkCreate(AlertsData);

    await Animals.bulkCreate(AnimalsData);

    await HealthReports.bulkCreate(HealthReportsData);

    await Ngos.bulkCreate(NgosData);

    await Ngo.bulkCreate(NgoData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithNgo(),

      await associateAlertWithAnimal(),

      await associateAlertWithNotified_user(),

      await associateAlertWithNgo(),

      await associateAnimalWithAssigned_caregiver(),

      await associateAnimalWithNgo(),

      await associateHealthReportWithAnimal(),

      await associateHealthReportWithNgo(),

      // Similar logic for "relation_many"

      await associateNgoWithNgo(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alerts', null, {});

    await queryInterface.bulkDelete('animals', null, {});

    await queryInterface.bulkDelete('health_reports', null, {});

    await queryInterface.bulkDelete('ngos', null, {});

    await queryInterface.bulkDelete('ngo', null, {});
  },
};
