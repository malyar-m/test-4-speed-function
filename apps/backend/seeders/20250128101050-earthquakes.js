'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../files/earthquakes1970-2014.csv');
    const results = [];
    
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    const chunkSize = 100;
    for (let i = 0; i < results.length; i += chunkSize) {
      const chunk = results.slice(i, i + chunkSize).map(row => ({
        date: row.DateTime,
        magnitude: parseFloat(row.Magnitude),
        location: row.Latitude + "," + row.Longitude 
      }));

      await queryInterface.bulkInsert('earthquakes', chunk);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('earthquakes', null, {});
  }
};
