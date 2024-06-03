'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('contacts', [
      // Initial contacts
      {
        phoneNumber: '123456',
        email: 'lorraine@hillvalley.edu',
        linkedId: null,
        linkPrecedence: 'primary',
        createdAt: new Date('2023-04-01T00:00:00.374Z'),
        updatedAt: new Date('2023-04-01T00:00:00.374Z'),
        deletedAt: null,
      },
      {
        phoneNumber: '123456',
        email: 'mcfly@hillvalley.edu',
        linkedId: 1,
        linkPrecedence: 'secondary',
        createdAt: new Date('2023-04-20T05:30:00.11Z'),
        updatedAt: new Date('2023-04-20T05:30:00.11Z'),
        deletedAt: null,
      },
      {
        phoneNumber: '919191',
        email: 'george@hillvalley.edu',
        linkedId: null,
        linkPrecedence: 'primary',
        createdAt: new Date('2023-04-11T00:00:00.374Z'),
        updatedAt: new Date('2023-04-11T00:00:00.374Z'),
        deletedAt: null,
      },
      {
        phoneNumber: '717171',
        email: 'biffsucks@hillvalley.edu',
        linkedId: null,
        linkPrecedence: 'primary',
        createdAt: new Date('2023-04-21T05:30:00.11Z'),
        updatedAt: new Date('2023-04-21T05:30:00.11Z'),
        deletedAt: null,
      },
      // Secondary contact for cross-linking scenario
      {
        phoneNumber: '717171',
        email: 'george@hillvalley.edu',
        linkedId: 3,
        linkPrecedence: 'secondary',
        createdAt: new Date('2023-04-28T06:40:00.23Z'),
        updatedAt: new Date('2023-04-28T06:40:00.23Z'),
        deletedAt: null,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Contacts', null, {});
  }
};
