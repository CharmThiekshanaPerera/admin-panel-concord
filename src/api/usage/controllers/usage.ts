/**
 * usage controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::usage.usage', ({ strapi }) => ({
  async createUsage(ctx) {
    try {
      const { username, chemical_id, chemical_name, amount_added, timestamp } = ctx.request.body;

      // Validate the required fields
      if (!username || !chemical_id || !chemical_name || !amount_added || !timestamp) {
        return ctx.badRequest('All fields are required.');
      }

      // Create the usage record
      const usage = await strapi.entityService.create('api::usage.usage', {
        data: {
          username,
          chemical_id,
          chemical_name,
          amount_added,
          timestamp,
        },
      });

      ctx.send({ message: 'Usage record created successfully.', data: usage });
    } catch (error) {
      console.error('Error creating usage:', error);
      ctx.internalServerError('Failed to create usage record.');
    }
  },

  async getAllUsages(ctx) {
    try {
      // Fetch all usage records with chemical relation
      const usages = await strapi.entityService.findMany('api::usage.usage', {
        populate: ['chemical_id'],
      });

      ctx.send({ message: 'Usages fetched successfully.', data: usages });
    } catch (error) {
      console.error('Error fetching usages:', error);
      ctx.internalServerError('Failed to fetch usages.');
    }
  },
}));
