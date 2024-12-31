'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/chemicals',
      handler: 'chemical.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/chemicals/:id',
      handler: 'chemical.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/chemicals',
      handler: 'chemical.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/chemicals/:id',
      handler: 'chemical.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/chemicals/:id',
      handler: 'chemical.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
