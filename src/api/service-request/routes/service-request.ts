export default {
    routes: [
      {
        method: 'POST',
        path: '/service-requests',
        handler: 'service-request.create',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/service-requests',
        handler: 'service-request.find',
        config: {
          policies: [],
        },
      },
      {
        method: 'GET',
        path: '/service-requests/:id',
        handler: 'service-request.findOne',
        config: {
          policies: [],
        },
      },
    ],
  };
  