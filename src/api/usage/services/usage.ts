/**
 * usage service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::usage.usage', ({ strapi }) => ({
  async createUsage(data) {
    return await strapi.entityService.create('api::usage.usage', { data });
  },

  async findAllUsages() {
    return await strapi.entityService.findMany('api::usage.usage', {
      populate: ['chemical_id'],
    });
  },
}));
