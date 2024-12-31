import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::complaint.complaint', ({ strapi }) => ({
  // Custom logic for the GET /complaints endpoint
  async find(ctx) {
    try {
      const complaints = await strapi.entityService.findMany('api::complaint.complaint', {
        populate: '*', // Fetches related media (attachments)
      });
      return complaints;
    } catch (err) {
      ctx.throw(400, 'Failed to fetch complaints');
    }
  },

  // Custom logic for the POST /complaints endpoint
  async create(ctx) {
    try {
      const { userName, description, date } = ctx.request.body;
      const files = ctx.request.files;

      const data = {
        userName,
        description,
        date,
      };

      // Use entityService to create the complaint
      const createdComplaint = await strapi.entityService.create('api::complaint.complaint', {
        data,
        files,
      });

      return createdComplaint;
    } catch (err) {
      ctx.throw(400, 'Failed to create complaint');
    }
  },
}));
