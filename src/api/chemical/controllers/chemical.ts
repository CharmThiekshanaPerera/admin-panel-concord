'use strict';

/**
 * chemicals controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::chemical.chemical', ({ strapi }) => ({
  // Custom controller logic (if any) can go here
  async find(ctx) {
    const { query } = ctx;
    const entities = await strapi.entityService.findMany('api::chemical.chemical', {
      filters: query.filters,
      sort: query.sort,
      populate: query.populate,
    });
    return entities;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.entityService.findOne('api::chemical.chemical', id, {
      populate: ctx.query.populate,
    });
    return entity;
  },

  async create(ctx) {
    const { body } = ctx.request;
    const entity = await strapi.entityService.create('api::chemical.chemical', {
      data: body,
    });
    return entity;
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const entity = await strapi.entityService.update('api::chemical.chemical', id, {
      data: body,
    });
    return entity;
  },

  async delete(ctx) {
    const { id } = ctx.params;
    await strapi.entityService.delete('api::chemical.chemical', id);
    ctx.status = 204;
  },
}));
