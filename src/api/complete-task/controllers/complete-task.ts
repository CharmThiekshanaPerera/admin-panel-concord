import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::complete-task.complete-task', ({ strapi }) => ({
  async createCompleteTask(ctx) {
    try {
      const { username, task, surfaceItem, siteName, images } = ctx.request.body;

      // Validate required fields
      if (!username || !task || !siteName) {
        return ctx.badRequest('Missing required fields: username, task, or siteName');
      }

      // Save the data in the database
      const completeTask = await strapi.entityService.create('api::complete-task.complete-task', {
        data: {
          username,
          task,
          surfaceItem,
          siteName,
          images,
        },
      });

      ctx.send({
        message: 'CompleteTask created successfully',
        data: completeTask,
      });
    } catch (error) {
      strapi.log.error('Error creating CompleteTask:', error);
      ctx.internalServerError('Failed to create CompleteTask');
    }
  },
}));
