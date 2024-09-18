'use strict';

function convertToCSV(data) {
  const header = Object.keys(data[0]);

  const rows = data.map(row =>
    header.map(fieldName => {
      let field = row[fieldName] ? row[fieldName].toString() : '';

      if (field.includes(',') || field.includes('"')) {
        field = `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    }).join(';')
  );

  return [header.join(';'), ...rows].join('\r\n');
}

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async find(query) {
    return await strapi.entityService.findMany('plugin::exporter.exporter', query);
  },

  async create(data) {
      if (!data || !data.name || !data.email || !data.message) {
        throw new Error('Missing required fields');
      }

      const result = await strapi.entityService.create('plugin::exporter.exporter', {
        data: {
          name: data.name,
          email: data.email,
          message: data.message,
        },
      });

      return result;
  },

  async exportData(ctx, id, format) {
    try {
      const entry = await strapi.entityService.findOne('plugin::exporter.exporter', id);

      if (!entry) {
        return { error: 'No data available to export.' };
      }

      const entries = [entry];

      if (format === 'csv') {
        const csv = convertToCSV(entries);
        return { file: csv, contentType: 'text/csv', filename: 'data.csv' };
      } else if (format === 'json') {
        return { file: JSON.stringify(entries), contentType: 'application/json', filename: 'data.json' };
      } else {
        return { error: 'Invalid format. Use "csv" or "json".' };
      }
    } catch (err) {
      return { error: 'Something went wrong' };
    }
  }

});
