'use strict';

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

      const format = ctx.request.body.format;

      const exportResult = await strapi
        .plugin('exporter')
        .service('exporter')
        .exportData(ctx, result.id, format);

      ctx.set('Content-Disposition', exportResult.filename);
      ctx.set('Content-Type', exportResult.contentType);
      ctx.send(exportResult.file);

    } catch (error) {
      strapi.log.error('Controller error:', error.message);
      ctx.throw(500, 'Something went wrong', error);
    }
  },

})

