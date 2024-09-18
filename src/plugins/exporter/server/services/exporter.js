'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async find(query) {
    return await strapi.entityService.findMany("plugin::exporter.exporter", query);
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
});
