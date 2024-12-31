export default {
    routes: [
      {
        method: 'POST',
        path: '/cleaners/register',
        handler: 'cleaner.register',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'POST',
        path: '/cleaners/login',
        handler: 'cleaner.login',
        config: {
          policies: [],
          middlewares: [],
        },
      }
    ]
  };
  