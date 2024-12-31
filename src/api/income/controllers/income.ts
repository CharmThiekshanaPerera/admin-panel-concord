import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::income.income', ({ strapi }) => ({
  // Custom GET method to fetch incomes with populated relations
  async find(ctx) {
    const { query } = ctx;
    const incomes = await strapi.entityService.findMany('api::income.income', {
      ...query,
      populate: ['cleaner', 'complete_task'], // Populate relations
    });
    ctx.body = incomes;
  },

  // Custom POST method to create a new income entry
  async create(ctx) {
    const { data } = ctx.request.body;

    if (!data) {
      return ctx.badRequest('Missing income data');
    }

    const newIncome = await strapi.entityService.create('api::income.income', {
      data: {
        cleaner: data.cleaner,
        complete_task: data.complete_task,
        dateTime: data.dateTime,
        amount: data.amount,
      },
    });

    ctx.body = newIncome;
  },
}));
