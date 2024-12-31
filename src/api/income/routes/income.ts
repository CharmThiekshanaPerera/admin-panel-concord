import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::income.income', {
  only: ['find', 'create'], // Enable only GET and POST methods
  config: {
    find: {
      policies: [],
      middlewares: [],
    },
    create: {
      policies: [],
      middlewares: [],
    },
  },
});
