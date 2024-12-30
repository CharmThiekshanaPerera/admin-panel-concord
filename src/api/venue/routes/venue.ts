export default {
    routes: [
      {
        method: 'GET',
        path: '/venues',
        handler: 'venue.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/venues/:id',
        handler: 'venue.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/venues',
        handler: 'venue.create',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/venues/:id',
        handler: 'venue.update',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'DELETE',
        path: '/venues/:id',
        handler: 'venue.delete',
        config: {
          policies: [],
          middlewares: [],
        },
      }
    ]
  };
  