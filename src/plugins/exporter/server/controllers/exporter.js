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
  index(ctx) {
    ctx.body = strapi
      .plugin('exporter')
      .service('exporter')
      .getWelcomeMessage();
  },

  async find(ctx) {
    try {
      return await strapi
        .plugin("exporter")
        .service("exporter")
        .find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body.data;

      if (!data) {
        ctx.throw(404, 'No data provided');
      }

      const result = await strapi
        .plugin('exporter')
        .service('exporter')
        .create(data);

      ctx.send(result);
    } catch (error) {
      strapi.log.error('Controller error:', error.message);
      ctx.throw(404, 'some data still to be sent', error);
    }
  },

  async exportData(ctx) {
    try {
      const { format } = ctx.request.body;

      const entries = await strapi
        .plugin("exporter")
        .service("exporter")
        .find(ctx.query);

      if (!entries || entries.length === 0) {
        return ctx.notFound('No data available to export.');
      }

      if (format === 'csv') {
        const csv = convertToCSV(entries);

        // Configuramos los headers para descargar el archivo CSV
        ctx.set('Content-Disposition', 'attachment; filename=data.csv');
        ctx.set('Content-Type', 'text/csv');
        ctx.send(csv);
      }
      else if (format === 'json') {
        ctx.set('Content-Disposition', 'attachment; filename=data.json');
        ctx.set('Content-Type', 'application/json');
        ctx.send(entries);
      }
      else {
        return ctx.badRequest('Invalid format. Use "csv" or "json".');
      }
    } catch (err) {
      return ctx.throw(404, 'Something went wrong');
    }
  }
})

