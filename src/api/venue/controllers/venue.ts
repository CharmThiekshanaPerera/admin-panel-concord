import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::venue.venue', ({ strapi }) => ({
  async find(ctx) {
    try {
      const venues = await strapi.entityService.findMany('api::venue.venue', {
        populate: ['app_user', 'cleaner', 'task'],
      });
      return ctx.send(venues);
    } catch (error) {
      ctx.internalServerError('An error occurred while fetching venues.');
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    try {
      const venue = await strapi.entityService.findOne('api::venue.venue', id, {
        populate: ['app_user', 'cleaner', 'task'],
      });

      if (!venue) {
        return ctx.notFound('Venue not found.');
      }

      return ctx.send(venue);
    } catch (error) {
      ctx.internalServerError('An error occurred while fetching the venue.');
    }
  },

  async create(ctx) {
    const { app_user, cleaner, task } = ctx.request.body;

    try {
      const newVenue = await strapi.entityService.create('api::venue.venue', {
        data: { app_user, cleaner, task },
      });

      return ctx.send(newVenue);
    } catch (error) {
      ctx.internalServerError('An error occurred while creating the venue.');
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { app_user, cleaner, task } = ctx.request.body;

    try {
      const updatedVenue = await strapi.entityService.update('api::venue.venue', id, {
        data: { app_user, cleaner, task },
      });

      if (!updatedVenue) {
        return ctx.notFound('Venue not found.');
      }

      return ctx.send(updatedVenue);
    } catch (error) {
      ctx.internalServerError('An error occurred while updating the venue.');
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;

    try {
      const deletedVenue = await strapi.entityService.delete('api::venue.venue', id);

      if (!deletedVenue) {
        return ctx.notFound('Venue not found.');
      }

      return ctx.send({ message: 'Venue deleted successfully.' });
    } catch (error) {
      ctx.internalServerError('An error occurred while deleting the venue.');
    }
  },
}));
