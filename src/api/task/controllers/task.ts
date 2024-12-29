/**
 * task controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::task.task', ({ strapi }) => ({
  async find(ctx) {
    try {
      const tasks = await strapi.entityService.findMany('api::task.task', {
        filters: ctx.query.filters || {},
        populate: ['app_user', 'cleaners'],
      });

      ctx.body = tasks;
    } catch (error) {
      ctx.body = {
        error: 'Unable to fetch tasks',
        details: error.message,
      };
      ctx.status = 500;
    }
  },

  async create(ctx) {
    try {
      const data = ctx.request.body;
      const task = await strapi.entityService.create('api::task.task', {
        data,
      });

      ctx.body = task;
      ctx.status = 201;
    } catch (error) {
      ctx.body = {
        error: 'Unable to create task',
        details: error.message,
      };
      ctx.status = 500;
    }
  },
}));
